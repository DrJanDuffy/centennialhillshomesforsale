interface ApiResponse {
  data: unknown;
  status: number;
  message?: string;
}

interface ComponentProps {
  pageType?: string;
  neighborhood?: string;
  propertyData?: Record<string, unknown>;
  [key: string]: unknown;
}

interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
}
