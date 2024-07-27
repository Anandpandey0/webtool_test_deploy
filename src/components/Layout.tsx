// components/Layout.tsx

import Navbar from '@/assets/home/Navbar';
import React, { ReactNode, Suspense } from 'react';

// Simple loading spinner component
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <div className="loader">Loading...</div>
  </div>
);

// ErrorBoundary component to catch any rendering errors
class ErrorBoundary extends React.Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Error occurred:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex-grow bg-gray-200">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Layout;
