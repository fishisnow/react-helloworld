import React, { useState, useEffect } from 'react';
import { DemoPage } from '../components/DemoPage';

const whatIs = 
  "在实际项目中，我们通常使用 React Query 或 SWR 等库来处理数据请求。这个示例展示了如何使用 React 内置的 hooks 处理数据获取。";

const whenToUse = 
  "• 当需要从服务器获取数据时\n" +
  "• 当需要处理加载和错误状态时\n" +
  "• 当需要处理异步操作时\n" +
  "• 当需要在组件挂载时获取数据时";

const code = `const TodoList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=5'
      );
      if (!response.ok) {
        throw new Error('网络请求失败');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div style={{ padding: '20px' }}>
        <p>加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <p style={{ color: 'red' }}>错误: {error}</p>
        <button
          onClick={fetchData}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          重试
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h3>Todo 列表</h3>
      <button
        onClick={fetchData}
        style={{
          padding: '8px 16px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        刷新数据
      </button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data.map(todo => (
          <li
            key={todo.id}
            style={{
              padding: '10px',
              backgroundColor: '#f5f5f5',
              marginBottom: '8px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
            />
            <span style={{
              marginLeft: '10px',
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};`;

export const UseQueryDemoPage = () => (
  <DemoPage
    whatIs={whatIs}
    whenToUse={whenToUse}
    code={code}
  />
); 