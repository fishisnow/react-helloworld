import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { CodeEditor } from './CodeEditor';
import { CodePreview } from './CodePreview';

export const DemoPage = ({ whatIs, whenToUse, code: defaultCode }) => {
  const [code, setCode] = useState(defaultCode);
  const [error, setError] = useState(null);

  const handleCodeChange = (value) => {
    setCode(value);
    try {
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: 'calc(100vh - 100px)',
      gap: '20px'
    }}>
      <div style={{ 
        fontSize: '16px', 
        color: '#333',
        borderLeft: '4px solid #1976d2',
        paddingLeft: '12px'
      }}>
        <div style={{ marginBottom: '12px' }}>
          <strong style={{ color: '#1976d2' }}>What is: </strong>
          {whatIs}
        </div>
        <div>
          <strong style={{ color: '#1976d2' }}>When to use: </strong>
          {whenToUse}
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px',
        flex: 1,
        minHeight: 0
      }}>
        <div style={{ height: '100%', position: 'relative' }}>
          <CodeEditor code={code} onChange={handleCodeChange} />
        </div>
        <div style={{ height: '100%', overflow: 'auto' }}>
          {error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : (
            <CodePreview code={code} />
          )}
        </div>
      </div>
    </div>
  );
}; 