interface PercyConfig {
  containerId: string;
  onSelect?: (address: PercyAddress) => void;
  placeholder?: string;
}

interface PercyAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  type: 'residential' | 'commercial';
  coordinates: {
    lat: number;
    lng: number;
  };
}

let debounceTimer: NodeJS.Timeout;

export const initPercyAutocomplete = ({
  containerId,
  onSelect,
  placeholder = 'Enter an address...',
}: PercyConfig): void => {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Create Shadow DOM for Percy widget
  const shadow = container.attachShadow({ mode: 'open' });

  // Create widget container with z-index
  const widgetContainer = document.createElement('div');
  widgetContainer.className = 'hvs-autocomplete';
  widgetContainer.style.cssText = `
    z-index: 1000;
    position: relative;
    width: 100%;
  `;

  // Create input element
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = placeholder;
  input.className = 'input';
  input.style.cssText = `
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #1F2937;
    background-color: #FFFFFF;
    transition: border-color 0.15s ease-in-out;
  `;

  // Create suggestions container
  const suggestionsContainer = document.createElement('div');
  suggestionsContainer.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 300px;
    overflow-y: auto;
    background-color: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    margin-top: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    display: none;
  `;

  // Add elements to Shadow DOM
  widgetContainer.appendChild(input);
  widgetContainer.appendChild(suggestionsContainer);
  shadow.appendChild(widgetContainer);

  // Load Percy script
  const script = document.createElement('script');
  script.src = `${process.env.NEXT_PUBLIC_PERCY_API_URL}/autocomplete.js`;
  script.crossOrigin = 'anonymous';
  script.integrity = 'sha384-...'; // Add actual integrity hash
  script.async = true;

  // Initialize Percy when script loads
  script.onload = () => {
    if (window.Percy) {
      window.Percy.init({
        apiKey: process.env.PERCY_API_KEY,
        element: input,
        debounceMs: 1500, // 1.5 second debounce
        onSuggest: (suggestions: PercyAddress[]) => {
          suggestionsContainer.innerHTML = '';
          suggestionsContainer.style.display = suggestions.length ? 'block' : 'none';

          suggestions.forEach((suggestion) => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.style.cssText = `
              padding: 0.75rem 1rem;
              cursor: pointer;
              transition: background-color 0.15s ease-in-out;
            `;
            div.innerHTML = `
              <div style="font-weight: 500;">${suggestion.street}</div>
              <div style="color: #6B7280; font-size: 0.875rem;">
                ${suggestion.city}, ${suggestion.state} ${suggestion.zip}
              </div>
            `;

            div.addEventListener('mouseenter', () => {
              div.style.backgroundColor = '#F3F4F6';
            });

            div.addEventListener('mouseleave', () => {
              div.style.backgroundColor = 'transparent';
            });

            div.addEventListener('click', () => {
              input.value = `${suggestion.street}, ${suggestion.city}, ${suggestion.state} ${suggestion.zip}`;
              suggestionsContainer.style.display = 'none';
              onSelect?.(suggestion);
            });

            suggestionsContainer.appendChild(div);
          });
        },
      });
    }
  };

  // Add script to Shadow DOM
  shadow.appendChild(script);

  // Close suggestions when clicking outside
  document.addEventListener('click', (event) => {
    if (!container.contains(event.target as Node)) {
      suggestionsContainer.style.display = 'none';
    }
  });
};

export const searchAddress = async (query: string): Promise<PercyAddress[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PERCY_API_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PERCY_API_KEY}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Failed to search address');
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching address:', error);
    throw error;
  }
};

// Add TypeScript declarations for Percy
declare global {
  interface Window {
    Percy?: {
      init: (config: {
        apiKey: string;
        element: HTMLInputElement;
        debounceMs?: number;
        onSuggest: (suggestions: PercyAddress[]) => void;
      }) => void;
    };
  }
} 