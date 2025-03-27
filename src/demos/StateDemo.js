import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { CodeEditor } from '../components/CodeEditor';
import { CodePreview } from '../components/CodePreview';

const defaultCode = `import React, { useState } from 'react';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('提交的数据:', { title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>标题：</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>内容：</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit">提交</button>
    </form>
  );
};

export const StateDemo = () => {
  return (
    <div>
      <h2>状态管理示例</h2>
      <PostForm />
    </div>
  );
};`;

export const StateDemoPage = () => {
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
        状态管理示例
      </Typography>
      <Typography variant="body1" paragraph>
        React 的状态管理是构建用户界面的核心概念。它主要用于：
        1. 管理组件的内部状态
        2. 处理用户交互
        3. 控制组件的渲染
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