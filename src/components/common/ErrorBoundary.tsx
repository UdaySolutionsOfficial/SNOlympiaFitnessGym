import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in SN Olympia Fitness app:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#060708] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-brand-volt/10 border border-brand-volt/40 flex items-center justify-center mb-6">
            <span className="text-2xl font-black text-brand-volt">!</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase mb-3">
            SN Olympia Fitness
          </h1>
          <p className="text-brand-text-secondary max-w-md mb-6 text-sm">
            Something unexpected occurred while loading the application.
          </p>
          <button
            onClick={this.handleReload}
            className="px-6 py-3 rounded-full bg-brand-volt text-black font-bold uppercase text-xs tracking-wider hover:bg-white transition-all shadow-lg"
          >
            Reload Arena
          </button>
          {this.state.error && (
            <pre className="mt-8 p-4 bg-white/5 rounded border border-white/10 text-xs text-brand-text-muted max-w-xl text-left overflow-auto">
              {this.state.error.message}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
