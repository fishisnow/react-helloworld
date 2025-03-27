import React, { useState, useCallback } from 'react';
import { DemoPage } from '../components/DemoPage';


const whatIs = 
  "useCallback 是一个用于性能优化的 Hook，它返回一个记忆化的回调函数。这个函数只有在依赖项发生变化时才会更新，可以避免不必要的渲染和计算。";

const whenToUse = 
  "• 当需要将回调函数传递给使用 React.memo 优化的子组件时\n" +
  "• 当回调函数作为其他 Hook 的依赖项时\n" +
  "• 当需要缓存函数以避免不必要的重新创建时\n" +
  "• 当回调函数的创建开销较大时";

const code = `const UseCallbackDemo = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 useCallback', completed: false },
    { id: 2, text: '理解性能优化', completed: false }
  ]);
  const [count, setCount] = useState(0);

  const handleToggle = useCallback((todoId) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const handleDelete = useCallback((todoId) => {
    setTodos(currentTodos =>
      currentTodos.filter(todo => todo.id !== todoId)
    );
  }, []);

  const handleCount = () => {
    setCount(c => c + 1);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* 计数器示例 */}
      <div style={{
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>计数器与重渲染示例</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          点击按钮增加计数，观察控制台输出，验证 TodoItem 不会重新渲染
        </p>
        <div style={{ marginBottom: '10px' }}>
          <p>当前计数: {count}</p>
          <button 
            onClick={handleCount}
            style={{
              padding: '8px 16px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            增加计数
          </button>
        </div>
      </div>

      {/* Todo列表示例 */}
      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>Todo 列表</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          使用 useCallback 优化的 Todo 列表，避免不必要的重渲染
        </p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map(todo => (
            <li 
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                marginBottom: '8px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px'
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                style={{ marginRight: '10px' }}
              />
              <span style={{
                flex: 1,
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}>
                {todo.text}
              </span>
              <button
                onClick={() => handleDelete(todo.id)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#ff4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                删除
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};`;

export const UseCallbackDemoPage = () => (
  <DemoPage
    title="useCallback Hook"
    whatIs={whatIs}
    whenToUse={whenToUse}
    code={code}
  />
); 