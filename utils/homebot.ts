interface HomebotWidgetConfig {
  containerId: string;
  address?: string;
  zip?: string;
  propertyType?: 'single_family' | 'condo' | 'townhouse';
}

export const initHomebotWidget = ({
  containerId,
  address,
  zip,
  propertyType = 'single_family',
}: HomebotWidgetConfig): void => {
  // Create a Shadow DOM container for the Homebot widget
  const container = document.getElementById(containerId);
  if (!container) return;

  const shadow = container.attachShadow({ mode: 'open' });
  
  // Create widget container with explicit z-index and minimum height
  const widgetContainer = document.createElement('div');
  widgetContainer.style.cssText = `
    z-index: 1000;
    min-height: 480px;
    position: relative;
    width: 100%;
  `;

  // Create and append widget script
  const script = document.createElement('script');
  script.src = `${process.env.NEXT_PUBLIC_HOMEBOT_WIDGET_URL}/embed.js`;
  script.crossOrigin = 'anonymous';
  script.integrity = 'sha384-...'; // Add actual integrity hash
  script.async = true;

  // Configure widget
  const config = {
    apiKey: process.env.HOMEBOT_API_KEY,
    address,
    zip,
    propertyType,
    theme: {
      primary: '#0A2540',
      secondary: '#3A8DDE',
      accent: '#16B286',
      background: '#F7F9FC',
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
    },
  };

  // Initialize widget when script loads
  script.onload = () => {
    if (window.Homebot) {
      window.Homebot.initialize(widgetContainer, config);
    }
  };

  // Append elements to Shadow DOM
  shadow.appendChild(widgetContainer);
  shadow.appendChild(script);
};

export const createValuationReport = async (params: {
  address: string;
  zip: string;
  email: string;
  propertyType?: string;
}): Promise<{
  reportId: string;
  estimatedValue: number;
  reportUrl: string;
}> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOMEBOT_WIDGET_URL}/api/valuations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HOMEBOT_API_KEY}`,
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to create valuation report');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating valuation report:', error);
    throw error;
  }
};

// Add TypeScript declarations for Homebot
declare global {
  interface Window {
    Homebot?: {
      initialize: (
        container: HTMLElement,
        config: {
          apiKey: string;
          address?: string;
          zip?: string;
          propertyType?: string;
          theme?: {
            primary: string;
            secondary: string;
            accent: string;
            background: string;
          };
          fonts?: {
            heading: string;
            body: string;
          };
        }
      ) => void;
    };
  }
} 