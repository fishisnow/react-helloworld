import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { CodeEditor } from '../components/CodeEditor';
import { CodePreview } from '../components/CodePreview';

const defaultCode = `import React, { useState, useMemo } from 'react';

const ExpensiveComputation = ({ value }) => {
  const result = useMemo(() => {
    console.log('执行昂贵计算...');
    return value * value * value;
  }, [value]);

  return <div>计算结果: {result}</div>;
};

export const MemoDemo = () => {
  const [value, setValue] = useState(1);

  return (
    <div>
      <input 
        type="number" 
        value={value} 
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <ExpensiveComputation value={value} />
    </div>
  );
};`;

export const MemoDemoPage = () => {
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
    <Box>
      <Typography variant="h4" gutterBottom>
        useMemo Hook 示例
      </Typography>
      <Typography variant="body1" paragraph>
        useMemo 是一个 Hook，它能让你缓存计算结果。它主要用于：
        1. 避免在每次渲染时都进行昂贵的计算
        2. 确保引用相等性，避免不必要的重渲染
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