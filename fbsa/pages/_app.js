import React from 'react';
import App from 'next/app';

// Estilos globales
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  // Cualquier contexto global que desees proporcionar a todos los componentes
  const globalContext = {};

  return (
    <Component {...pageProps} globalContext={globalContext} />
  );
}

MyApp.getInitialProps = async (appContext) => {
  // Ejemplo: cargar datos globales desde el servidor antes de renderizar la página
  const globalData = {};

  // Llamar a la función getInitialProps del componente de la página
  const appProps = await App.getInitialProps(appContext);

  // Retornar las props de la aplicación junto con los datos globales
  return { ...appProps, ...globalData };
};

export default MyApp;
