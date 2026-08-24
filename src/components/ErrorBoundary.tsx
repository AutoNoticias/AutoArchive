import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('AutoArchive Uncaught Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    try {
      window.location.hash = '';
      window.location.reload();
    } catch {
      window.location.href = './';
    }
  };

  private handleClearCache = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    } catch {
      window.location.href = './';
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080808] text-[#f1f1f1] flex flex-col items-center justify-center p-6 text-center font-mono">
          <div className="max-w-md w-full p-8 bg-[#111622] border border-[#e62628]/40 rounded-2xl shadow-2xl space-y-6">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#e62628]/20 border border-[#e62628] flex items-center justify-center text-[#ff8082] text-xl font-black">
              !
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight uppercase">
                AutoArchive
              </h1>
              <p className="text-xs text-[#ffd451] mt-1 font-bold">
                Ocurrió un error al cargar la aplicación
              </p>
              <p className="text-xs text-[#8bb4d9] mt-2 leading-relaxed">
                {this.state.error?.message || 'Se interrumpió la inicialización del visor.'}
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={this.handleReset}
                className="w-full py-3 bg-[#e62628] hover:bg-[#ff3b3e] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-[#e62628]/20"
              >
                Recargar AutoArchive
              </button>
              <button
                onClick={this.handleClearCache}
                className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-[#cfd3db] font-bold text-xs uppercase tracking-wider rounded-xl border border-white/10 transition-all cursor-pointer"
              >
                Restablecer y Limpiar Caché
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
