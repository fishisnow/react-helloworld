import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { CodeEditor } from '../components/CodeEditor';
import { CodePreview } from '../components/CodePreview';

const defaultCode = `// 使用已经解构的 React Hooks
const ThemeContext = createContext();

const ThemedComponent = () => {
  const theme = useContext(ThemeContext);
  
  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: theme,
      color: theme === 'lightgrey' ? 'black' : 'white'
    }}>
      这是一个主题化的组件
    </div>
  );
};

const ContextDemo = () => {
  const [theme, setTheme] = useState('lightgrey');

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <button 
          onClick={() => setTheme(theme === 'lightgrey' ? 'darkgrey' : 'lightgrey')}
        >
          切换主题
        </button>
        <ThemedComponent />
      </div>
    </ThemeContext.Provider>
  );
};`;

export const ContextDemoPage = () => {
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
        Context Hook 示例
      </Typography>
      <Typography variant="body1" paragraph>
        Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。它主要用于：
        1. 共享那些对于一个组件树而言是"全局"的数据
        2. 避免通过中间元素传递 props
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