import React from 'react';
import Editor from "@monaco-editor/react";
import { Box, Paper, Typography } from '@mui/material';

export const CodeEditor = ({ code, onChange, title }) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ height: '400px', border: '1px solid #ddd' }}>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue={code}
          onChange={onChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyond: false,
            automaticLayout: true,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible'
            }
          }}
          style={{ flex: 1 }}
        />
      </Box>
    </Paper>
  );
}; 