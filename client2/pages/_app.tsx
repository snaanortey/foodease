import type { AppProps } from 'next/app';
import './global.css';
import { ThemeProvider } from '@material-tailwind/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
