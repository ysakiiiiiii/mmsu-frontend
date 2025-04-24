import * as React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Optional: Replace this with your logging service
    console.error("Caught by ErrorBoundary:", error, info.componentStack);

    if (typeof logErrorToMyService === 'function') {
      logErrorToMyService(
        error,
        info.componentStack,
        React.captureOwnerStack?.() 
      );
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null; 
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
