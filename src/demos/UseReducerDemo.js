import React, { useState, useReducer } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { CodeEditor } from '../components/CodeEditor';
import { CodePreview } from '../components/CodePreview';
import { DemoPage } from '../components/DemoPage';

const whatIs = `
  useReducer 是一个用于状态管理的 Hook，它是 useState 的替代方案。当组件中需要处理复杂的状态逻辑时，useReducer 可以帮助我们将状态更新逻辑从组件中抽离出来。
`;

const whenToUse = `
  • 当组件的状态逻辑较为复杂，包含多个子值时
  • 当下一个状态依赖于之前的状态时
  • 当需要更好地组织和管理状态更新逻辑时
  • 当需要在深层组件树中触发状态更新时（结合 Context 使用）
`;

const code = `import React, { useState, useReducer } from 'react';

const UseReducerDemo = () => {
  // 定义 reducer 函数
  const todoReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return [...state, { 
          id: Date.now(), 
          text: action.text, 
          completed: false 
        }];
      case 'TOGGLE_TODO':
        return state.map(todo =>
          todo.id === action.id 
            ? { ...todo, completed: !todo.completed } 
            : todo
        );
      case 'DELETE_TODO':
        return state.filter(todo => todo.id !== action.id);
      case 'CLEAR_COMPLETED':
        return state.filter(todo => !todo.completed);
      default:
        return state;
    }
  };

  // 使用 useReducer
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({ type: 'ADD_TODO', text });
    setText('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="添加新任务..."
            style={{
              padding: '8px',
              marginRight: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
          <button 
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            添加
          </button>
        </form>

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
                onChange={() => dispatch({ 
                  type: 'TOGGLE_TODO', 
                  id: todo.id 
                })}
              />
              <span style={{
                marginLeft: '10px',
                textDecoration: todo.completed ? 'line-through' : 'none',
                flex: 1
              }}>
                {todo.text}
              </span>
              <button
                onClick={() => dispatch({ 
                  type: 'DELETE_TODO', 
                  id: todo.id 
                })}
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

        {todos.some(todo => todo.completed) && (
          <button
            onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
            style={{
              padding: '8px 16px',
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            清除已完成
          </button>
        )}
      </div>
    </div>
  );
};`;

export const UseReducerDemoPage = () => (
  <DemoPage
    title="useReducer Hook"
    whatIs={whatIs}
    whenToUse={whenToUse}
    code={code}
  />
); 