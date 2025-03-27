import React, { useState } from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { CodeEditor } from '../components/CodeEditor';
import { CodePreview } from '../components/CodePreview';
import { DemoPage } from '../components/DemoPage';

const whatIs = `
  useEffect 是 React 的副作用处理 Hook，用于执行那些不能直接在渲染过程中执行的操作，比如数据获取、订阅事件、手动修改 DOM 等。它在组件渲染后运行。
`;

const whenToUse = `
  • 当需要与外部系统交互时（如 API 调用、浏览器 API）
  • 需要订阅和取消订阅事件时
  • 需要在组件挂载/卸载时执行某些操作
  • 当某些数据变化时需要执行副作用操作
`;

const code = `const UseEffectDemo = () => {
  const [count, setCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 示例1: 基本的 useEffect - 更新文档标题
  useEffect(() => {
    document.title = \`点击了 \${count} 次\`;
  }, [count]);

  // 示例2: 带清理的 useEffect - 窗口大小监听
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 示例3: 数据获取
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('获取数据失败:', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div style={{ 
      padding: '20px',
      overflow: 'visible'
    }}>
      <div style={{
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>更新文档标题</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          每次计数更新时，都会更新文档标题
        </p>
        <div>
          <p>计数: {count}</p>
          <button onClick={() => setCount(count + 1)}>增加</button>
        </div>
      </div>

      <div style={{
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>窗口大小监听</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          监听并显示窗口宽度，组件卸载时会清理监听器
        </p>
        <div>
          <p>当前窗口宽度: {windowWidth}px</p>
          <p>调整浏览器窗口大小来查看效果</p>
        </div>
      </div>

      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>数据获取</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          组件加载时从 API 获取用户数据
        </p>
        <div>
          {isLoading ? (
            <p>加载中...</p>
          ) : userData ? (
            <div>
              <p>用户名: {userData.name}</p>
              <p>邮箱: {userData.email}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};`;

export const UseEffectDemoPage = () => (
  <DemoPage
    title="useEffect Hook"
    whatIs={whatIs}
    whenToUse={whenToUse}
    code={code}
  />
); 