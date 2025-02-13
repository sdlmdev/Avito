import {Component, ErrorInfo, ReactNode, Suspense} from 'react';
import {PageLoader} from 'widgets/PageLoader';

import {ErrorPage} from 'pages/ErrorPage';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line
    console.log(error, errorInfo);
  }

  // eslint-disable-next-line
  render() {
    const {hasError} = this.state;
    const {children} = this.props;

    if (hasError) {
      return (
        <Suspense fallback={<PageLoader />}>
          <ErrorPage />
        </Suspense>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
