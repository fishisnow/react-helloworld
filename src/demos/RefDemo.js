import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { CodeEditor } from '../components/CodeEditor';
import { CodePreview } from '../components/CodePreview';

const defaultCode = `import React, { useRef } from 'react';

export const FocusInput = () => {
  const inputRef = useRef(null);

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={() => inputRef.current.focus()}>
        聚焦输入框
      </button>
    </div>
  );
};`;

export const RefDemo = () => {
  const [code, setCode] = useState(defaultCode);
  const [error, setError] = useState(null);

  const handleCodeChange = (value) => {
    setCode(value);
    try {
      // 这里可以添加代码编译和执行的逻辑
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        useRef Hook 示例
      </Typography>
      <Typography variant="body1" paragraph>
        useRef 是一个 Hook，它能让你引用一个不需要渲染的值。它主要用于：
        1. 存储可变值，但更新它不会触发重渲染
        2. 存储和访问 DOM 元素
      </Typography>
      
      <CodeEditor
        code={code}
        onChange={handleCodeChange}
        title="源代码"
      />

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          运行效果
        </Typography>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <CodePreview code={code} />
        )}
      </Paper>
    </Box>
  );
}; 