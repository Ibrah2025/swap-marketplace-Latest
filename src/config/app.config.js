export const config = {
  appName: 'SWAP',
  tagline: 'Tauschen statt kaufen',
  version: '2.0.0',
  language: 'de-DE',
  theme: {
    primary: '#007185',
    secondary: '#ff9900',
    accent: '#ffa41c',
    text: '#232f3e',
    textSecondary: '#666',
    border: '#e3e6e8',
    background: '#f8f9fa',
    cardBorder: '#f39c12'
  },
  api: {
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://api.swap.de' : 'http://localhost:3000',
    timeout: 10000
  }
};