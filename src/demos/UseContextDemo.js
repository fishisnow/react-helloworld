import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { CodeEditor } from '../components/CodeEditor';
import { CodePreview } from '../components/CodePreview';
import { DemoPage } from '../components/DemoPage';

const whatIs = `
  useContext 是 React 的上下文 Hook，它允许组件订阅 React 的 Context 变化。这使得组件可以读取来自组件树上层的上下文数据，而无需通过 props 层层传递。
`;

const whenToUse = `
  • 当需要在组件树中深层传递数据时
  • 需要共享全局数据（如主题、用户信息、语言设置）时
  • 想避免 props 深层传递（props drilling）时
  • 需要在多个组件间共享状态但又不想使用复杂的状态管理库时
`;

const code = `const UseContextDemo = () => {
  const ThemeContext = createContext();

  const ThemedButton = () => {
    const theme = useContext(ThemeContext);
    return (
      <button style={{
        backgroundColor: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#333',
        padding: '10px 20px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        我是一个主题化的按钮
      </button>
    );
  };

  const ThemedText = () => {
    const theme = useContext(ThemeContext);
    return (
      <p style={{
        color: theme === 'dark' ? '#fff' : '#333',
        backgroundColor: theme === 'dark' ? '#333' : '#fff',
        padding: '10px',
        borderRadius: '4px'
      }}>
        当前主题: {theme}
      </p>
    );
  };

  const [theme, setTheme] = useState('light');

  return (
    <div style={{ padding: '20px' }}>
      <ThemeContext.Provider value={theme}>
        <div style={{
          padding: '20px',
          backgroundColor: theme === 'dark' ? '#222' : '#f0f0f0',
          borderRadius: '8px',
          transition: 'all 0.3s'
        }}>
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{
              marginBottom: '20px',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#1976d2',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            切换主题
          </button>
          <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
            <ThemedButton />
            <ThemedText />
          </div>
        </div>
      </ThemeContext.Provider>
    </div>
  );
};`;

export const UseContextDemoPage = () => (
  <DemoPage
    title="useContext Hook"
    whatIs={whatIs}
    whenToUse={whenToUse}
    code={code}
  />
); 