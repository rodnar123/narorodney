'use client';

import React, { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree and displays a fallback UI
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
          <Card className="max-w-2xl w-full bg-gray-800/50 backdrop-blur-xl border-red-500/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <CardTitle className="text-2xl text-white">
                  Oops! Something went wrong
                </CardTitle>
              </div>
              <CardDescription className="text-gray-300">
                We encountered an unexpected error. Don&apos;t worry, this has been logged and we&apos;ll look into it.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-gray-900/50 p-4 rounded-lg border border-red-500/30">
                  <p className="text-red-400 font-mono text-sm mb-2">
                    <strong>Error:</strong> {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="text-gray-400 text-xs">
                      <summary className="cursor-pointer hover:text-gray-300">
                        Stack Trace
                      </summary>
                      <pre className="mt-2 overflow-auto whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              <div className="flex gap-3 flex-wrap">
                <Button
                  onClick={this.handleReset}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="border-gray-600 hover:bg-gray-700 flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Go to Homepage
                </Button>
              </div>

              <p className="text-sm text-gray-400 mt-4">
                If this problem persists, please contact{' '}
                <a
                  href="mailto:rodney.naro@gmail.com"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  rodney.naro@gmail.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
