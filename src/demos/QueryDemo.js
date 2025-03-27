import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { CodeEditor } from '../components/CodeEditor';
import { CodePreview } from '../components/CodePreview';

const defaultCode = `const Post = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const json = await response.json();
        setData(json);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  if (!data) return null;

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
    </div>
  );
};

const QueryDemo = () => {
  return (
    <div>
      <h3>数据请求示例</h3>
      <Post />
    </div>
  );
};`;

export const QueryDemoPage = () => {
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
        数据请求示例
      </Typography>
      <Typography variant="body1" paragraph>
        React Query 是一个强大的数据获取和缓存库。它主要用于：
        1. 管理服务器状态
        2. 处理数据缓存
        3. 自动重试和错误处理
        4. 乐观更新
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