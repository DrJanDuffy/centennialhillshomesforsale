
// hooks/useVoiceSearch.ts
import { useState, useEffect, useCallback, useRef } from 'react';

interface UseVoiceSearchOptions {
  onResult?: (transcript: string) => void;
  onError?: (error: string) => void;
  continuous?: boolean;
  interimResults?: boolean;
}

export interface UseVoiceSearchReturn {
  isListening: boolean;
  isSupported: boolean;
  hasPermission: boolean;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  transcript: string;
}

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export const useVoiceSearch = (
  onTranscript?: (transcript: string) => void,
  options: UseVoiceSearchOptions = {}
): UseVoiceSearchReturn => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState('');
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const {
    onResult,
    onError,
    continuous = false,
    interimResults = true
  } = options;

  // Check for browser support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      
      // Create recognition instance
      const recognition = new SpeechRecognition();
      recognition.continuous = continuous;
      recognition.interimResults = interimResults;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcriptPart = result[0].transcript;

          if (result.isFinal) {
            finalTranscript += transcriptPart;
          } else {
            interimTranscript += transcriptPart;
          }
        }

        const fullTranscript = finalTranscript || interimTranscript;
        setTranscript(fullTranscript);

        if (finalTranscript) {
          onResult?.(finalTranscript);
          onTranscript?.(finalTranscript);
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        const errorMessage = `Speech recognition error: ${event.error}`;
        setError(errorMessage);
        onError?.(errorMessage);
        setIsListening(false);
        
        if (event.error === 'not-allowed') {
          setHasPermission(false);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;

      // Check for microphone permission
      if (navigator.permissions) {
        navigator.permissions.query({ name: 'microphone' as PermissionName })
          .then((result) => {
            setHasPermission(result.state === 'granted');
            
            result.onchange = () => {
              setHasPermission(result.state === 'granted');
            };
          })
          .catch(() => {
            // Fallback: assume permission is needed and will be requested
            setHasPermission(true);
          });
      } else {
        // Fallback for browsers without permissions API
        setHasPermission(true);
      }
    } else {
      setIsSupported(false);
      setError('Speech recognition is not supported in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [continuous, interimResults, onResult, onError, onTranscript]);

  const startListening = useCallback(() => {
    if (!isSupported) {
      const errorMsg = 'Speech recognition is not supported';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    if (!recognitionRef.current) {
      const errorMsg = 'Speech recognition not initialized';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    if (isListening) {
      return; // Already listening
    }

    try {
      setError(null);
      setTranscript('');
      recognitionRef.current.start();
    } catch (err) {
      const errorMsg = `Failed to start speech recognition: ${err}`;
      setError(errorMsg);
      onError?.(errorMsg);
    }
  }, [isSupported, isListening, onError]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  return {
    isListening,
    isSupported,
    hasPermission,
    error,
    startListening,
    stopListening,
    transcript
  };
};
