import QueryProvider from './_providers/QueryProvider';
import AuthProvider from './_providers/AuthProvider';

function ProvidersLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </AuthProvider>
  );
}

export default ProvidersLayout;
