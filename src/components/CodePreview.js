import React, { useEffect, useRef } from 'react';

export const CodePreview = ({ code }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const updatePreview = () => {
      if (!iframeRef.current) return;

      const processedCode = code
        .replace(/import.*from.*['"].*['"];?\n?/g, '')
        .replace(/export\s+/, '');

      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Preview</title>
            <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script crossorigin src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
            <style>
              body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
              button { margin: 5px; padding: 8px 16px; }
              input, textarea { margin: 5px; padding: 8px; }
            </style>
          </head>
          <body>
            <div id="root"></div>
            <script type="text/babel">
              const { useState, useRef, useEffect, useMemo, useContext, createContext } = React;
              
              ${processedCode}

              const root = ReactDOM.createRoot(document.getElementById('root'));
              const components = Object.keys(window).filter(key => 
                typeof window[key] === 'function' && 
                /^[A-Z]/.test(key)
              );
              const LastComponent = window[components[components.length - 1]];
              root.render(<LastComponent />);
            </script>
          </body>
        </html>
      `);
      doc.close();

      setTimeout(() => {
        if (doc.body) {
          iframe.style.height = `${doc.body.scrollHeight + 40}px`;
        }
      }, 100);
    };

    updatePreview();
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      style={{
        width: '100%',
        border: 'none',
        backgroundColor: 'white',
        minHeight: '200px',
        transition: 'height 0.3s'
      }}
      title="preview"
    />
  );
}; 