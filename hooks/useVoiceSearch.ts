
import { useState, useEffect, useCallback } from 'react';

interface UseVoiceSearchOptions {
  onResult?: (transcript: string) => void;
  onError?: (error: string) => void;
  continuous?: boolean;
  interimResults?: boolean;
}

export const useVoiceSearch = (
  setInputValue?: (value: string) => void,
  options: UseVoiceSearchOptions = {}
) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    // Check microphone permissions first
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => setHasPermission(true))
        .catch(() => setHasPermission(false));
    }

    // Check for native browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = options.continuous || false;
      recognitionInstance.interimResults = options.interimResults || true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        if (setInputValue) {
          setInputValue(transcript);
        }
        options.onResult?.(transcript);
      };

      recognitionInstance.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        options.onError?.(event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      setIsSupported(false);
      options.onError?.('Speech recognition not supported in this browser');
    }
  }, [options.continuous, options.interimResults, options.onResult, options.onError, setInputValue]);

  const startListening = useCallback(() => {
    if (recognition && !isListening && isSupported) {
      try {
        recognition.start();
        setIsListening(true);
      } catch (error) {
        console.warn('Failed to start speech recognition:', error);
        setIsListening(false);
      }
    }
  }, [recognition, isListening, isSupported]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition, isListening]);

  return {
    isListening,
    isSupported,
    hasPermission,
    startListening,
    stopListening,
    error: !isSupported ? 'Speech recognition not supported' : 
           !hasPermission ? 'Microphone permission required' : null
  };
};
