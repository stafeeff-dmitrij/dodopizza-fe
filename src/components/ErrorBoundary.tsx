import React, { Component } from 'react';

import { ErrorPage } from '../pages/errors';


interface ErrorBoundaryState {
  hasError: boolean;
}

interface MyComponentProps {
  children?: React.ReactNode;
}

/**
 * @component
 * @description Перехват и вывод запасного компонента в случае ошибки при отрисовки DOM
 */
class ErrorBoundary extends Component<MyComponentProps, ErrorBoundaryState> {

  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  // @ts-ignore
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage/>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;