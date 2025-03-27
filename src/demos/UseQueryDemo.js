import React, { useState, useEffect } from 'react';
import { DemoPage } from '../components/DemoPage';

const whatIs = `
  在实际项目中，我们通常使用 React Query 或 SWR 等库来处理数据请求。这个示例展示了如何使用 React 内置的 hooks 处理数据获取。
`;

const whenToUse = `
  • 当需要从服务器获取数据时
  • 当需要处理加载和错误状态时
  • 当需要处理异步操作时
  • 当需要在组件挂载时获取数据时
`;

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

  return (
    <div style={{ padding: '20px' }}>
      {/* 数据加载示例 */}
      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>数据请求示例</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          从 JSONPlaceholder API 获取待办事项数据
        </p>
        
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

        {isLoading ? (
          <div style={{
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            <p>加载中...</p>
          </div>
        ) : error ? (
          <div style={{
            padding: '20px',
            backgroundColor: '#ffebee',
            borderRadius: '4px',
            marginBottom: '10px'
          }}>
            <p style={{ color: '#d32f2f', margin: 0 }}>错误: {error}</p>
          </div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {data?.map(todo => (
              <li
                key={todo.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  marginBottom: '8px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px'
                }}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                  style={{ marginRight: '12px' }}
                />
                <span style={{
                  flex: 1,
                  textDecoration: todo.completed ? 'line-through' : 'none'
                }}>
                  {todo.title}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};`;

export const UseQueryDemoPage = () => (
  <DemoPage
    title="useQuery Hook"
    whatIs={whatIs}
    whenToUse={whenToUse}
    code={code}
  />
); 