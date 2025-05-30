
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface PageError {
  page: string;
  error: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
}

const PageErrorChecker: React.FC = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<PageError[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const checkPageErrors = async () => {
    setIsChecking(true);
    const pageErrors: PageError[] = [];

    try {
      // Check for common React errors
      const reactErrors = checkReactErrors();
      pageErrors.push(...reactErrors);

      // Check for accessibility issues
      const a11yErrors = checkAccessibilityIssues();
      pageErrors.push(...a11yErrors);

      // Check for SEO issues
      const seoErrors = checkSEOIssues();
      pageErrors.push(...seoErrors);

      // Check for performance issues
      const perfErrors = checkPerformanceIssues();
      pageErrors.push(...perfErrors);

      setErrors(pageErrors);
    } catch (error) {
      console.error('Error checking page:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const checkReactErrors = (): PageError[] => {
    const errors: PageError[] = [];
    
    try {
      // Check for missing keys in lists
      const listElements = document.querySelectorAll('ul li, ol li');
      listElements.forEach((li, index) => {
        if (!li.getAttribute('key') && li.parentElement?.children.length > 1) {
          errors.push({
            page: router.pathname,
            error: `Missing key prop on list item at index ${index}`,
            severity: 'medium',
            timestamp: new Date().toISOString()
          });
        }
      });

      // Check for deprecated attributes
      const deprecatedAttrs = ['autoplay', 'autoComplete'];
      deprecatedAttrs.forEach(attr => {
        const elements = document.querySelectorAll(`[${attr}]`);
        elements.forEach(el => {
          errors.push({
            page: router.pathname,
            error: `Deprecated attribute '${attr}' found`,
            severity: 'low',
            timestamp: new Date().toISOString()
          });
        });
      });

    } catch (error) {
      errors.push({
        page: router.pathname,
        error: `React error check failed: ${error.message}`,
        severity: 'high',
        timestamp: new Date().toISOString()
      });
    }

    return errors;
  };

  const checkAccessibilityIssues = (): PageError[] => {
    const errors: PageError[] = [];
    
    try {
      // Check for missing alt text
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        if (!img.alt) {
          errors.push({
            page: router.pathname,
            error: `Image ${index + 1} missing alt text`,
            severity: 'medium',
            timestamp: new Date().toISOString()
          });
        }
      });

      // Check for missing form labels
      const inputs = document.querySelectorAll('input, textarea, select');
      inputs.forEach((input, index) => {
        const id = input.id;
        const label = id ? document.querySelector(`label[for="${id}"]`) : null;
        if (!label && !input.getAttribute('aria-label')) {
          errors.push({
            page: router.pathname,
            error: `Form input ${index + 1} missing label or aria-label`,
            severity: 'high',
            timestamp: new Date().toISOString()
          });
        }
      });

      // Check for missing headings hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let hasH1 = false;
      headings.forEach(heading => {
        if (heading.tagName === 'H1') hasH1 = true;
      });
      if (!hasH1) {
        errors.push({
          page: router.pathname,
          error: 'Page missing H1 heading',
          severity: 'high',
          timestamp: new Date().toISOString()
        });
      }

    } catch (error) {
      errors.push({
        page: router.pathname,
        error: `Accessibility check failed: ${error.message}`,
        severity: 'medium',
        timestamp: new Date().toISOString()
      });
    }

    return errors;
  };

  const checkSEOIssues = (): PageError[] => {
    const errors: PageError[] = [];
    
    try {
      // Check for missing meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc || !metaDesc.getAttribute('content')) {
        errors.push({
          page: router.pathname,
          error: 'Missing meta description',
          severity: 'high',
          timestamp: new Date().toISOString()
        });
      }

      // Check for missing title
      const title = document.querySelector('title');
      if (!title || !title.textContent) {
        errors.push({
          page: router.pathname,
          error: 'Missing page title',
          severity: 'critical',
          timestamp: new Date().toISOString()
        });
      }

      // Check for duplicate H1s
      const h1s = document.querySelectorAll('h1');
      if (h1s.length > 1) {
        errors.push({
          page: router.pathname,
          error: `Multiple H1 tags found (${h1s.length})`,
          severity: 'medium',
          timestamp: new Date().toISOString()
        });
      }

    } catch (error) {
      errors.push({
        page: router.pathname,
        error: `SEO check failed: ${error.message}`,
        severity: 'medium',
        timestamp: new Date().toISOString()
      });
    }

    return errors;
  };

  const checkPerformanceIssues = (): PageError[] => {
    const errors: PageError[] = [];
    
    try {
      // Check for large images without optimization
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        if (img.naturalWidth > 2000 || img.naturalHeight > 2000) {
          errors.push({
            page: router.pathname,
            error: `Large unoptimized image ${index + 1} (${img.naturalWidth}x${img.naturalHeight})`,
            severity: 'medium',
            timestamp: new Date().toISOString()
          });
        }
      });

      // Check for excessive DOM nodes
      const allElements = document.querySelectorAll('*');
      if (allElements.length > 1500) {
        errors.push({
          page: router.pathname,
          error: `Excessive DOM nodes: ${allElements.length} (recommended: <1500)`,
          severity: 'low',
          timestamp: new Date().toISOString()
        });
      }

    } catch (error) {
      errors.push({
        page: router.pathname,
        error: `Performance check failed: ${error.message}`,
        severity: 'low',
        timestamp: new Date().toISOString()
      });
    }

    return errors;
  };

  useEffect(() => {
    // Check for errors when page loads or changes
    const timer = setTimeout(() => {
      checkPageErrors();
    }, 1000);

    return () => clearTimeout(timer);
  }, [router.pathname]);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: 'white',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '10px',
      maxWidth: '300px',
      maxHeight: '200px',
      overflow: 'auto',
      fontSize: '12px',
      zIndex: 9999,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
        Page Errors ({errors.length})
        {isChecking && ' (Checking...)'}
      </div>
      {errors.length === 0 ? (
        <div style={{ color: 'green' }}>✅ No errors found</div>
      ) : (
        errors.map((error, index) => (
          <div key={index} style={{
            marginBottom: '5px',
            padding: '3px',
            background: error.severity === 'critical' ? '#ffebee' : 
                       error.severity === 'high' ? '#fff3e0' :
                       error.severity === 'medium' ? '#f3e5f5' : '#e8f5e8',
            borderLeft: `3px solid ${
              error.severity === 'critical' ? '#f44336' :
              error.severity === 'high' ? '#ff9800' :
              error.severity === 'medium' ? '#9c27b0' : '#4caf50'
            }`
          }}>
            <div style={{ fontWeight: 'bold' }}>{error.severity.toUpperCase()}</div>
            <div>{error.error}</div>
          </div>
        ))
      )}
      <button 
        onClick={checkPageErrors}
        style={{
          marginTop: '5px',
          padding: '2px 5px',
          fontSize: '10px',
          cursor: 'pointer'
        }}
      >
        Recheck
      </button>
    </div>
  );
};

export default PageErrorChecker;
