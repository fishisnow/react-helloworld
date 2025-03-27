import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

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
              body { 
                margin: 0; 
                padding: 0; 
                font-family: Arial, sans-serif;
              }
              button { 
                margin: 5px; 
                padding: 8px 16px;
                background-color: #1976d2;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
              }
              button:hover {
                background-color: #1565c0;
              }
              input, textarea { 
                margin: 5px; 
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
              }
              .paper {
                background: white;
                padding: 20px;
                margin: 10px 0;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
            </style>
          </head>
          <body>
            <div id="root"></div>
            <script type="text/babel">
              const { 
                useState, useRef, useEffect, useMemo, 
                useContext, createContext, useReducer, useCallback 
              } = React;
              ${processedCode}
              const root = ReactDOM.createRoot(document.getElementById('root'));
              const LastComponent = window[Object.keys(window).find(key => 
                typeof window[key] === 'function' && /^[A-Z]/.test(key)
              )];
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
    <div style={{
      width: '100%',
      height: '100%',
      padding: '16px'
    }}>
      <iframe
        ref={iframeRef}
        style={{
          width: '100%',
          border: 'none',
          backgroundColor: 'white',
          height: '100%',
          minHeight: '500px'
        }}
        title="preview"
      />
    </div>
  );
}; 