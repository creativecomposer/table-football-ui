import React, { ErrorInfo, ReactElement } from 'react';

interface State {
  hasError: boolean;
}

interface Props {
  children: ReactElement[];
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo.componentStack);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <h2>Something went wrong. Contact the developer!</h2>;
    }

    return children;
  }
}
