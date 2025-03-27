import React, { useState, useCallback } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { CodeEditor } from '../components/CodeEditor';
import { CodePreview } from '../components/CodePreview';
import { DemoPage } from '../components/DemoPage';

// 定义 TodoItem 组件
const TodoItem = React.memo(({ todo, onToggle, onDelete }) => {
  console.log('TodoItem 渲染:', todo.text);
  return (
    <li style={{ margin: '10px 0' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{
        marginLeft: '10px',
        textDecoration: todo.completed ? 'line-through' : 'none'
      }}>
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        style={{ marginLeft: '10px' }}
      >
        删除
      </button>
    </li>
  );
});

const defaultCode = `// 子组件，使用 React.memo 来避免不必要的重渲染
const TodoItem = React.memo(({ todo, onToggle, onDelete }) => {
  console.log('TodoItem 渲染:', todo.text);
  return (
    <li style={{ margin: '10px 0' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{
        marginLeft: '10px',
        textDecoration: todo.completed ? 'line-through' : 'none'
      }}>
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        style={{ marginLeft: '10px' }}
      >
        删除
      </button>
    </li>
  );
});`;

const UseCallbackDemo = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 useCallback', completed: false },
    { id: 2, text: '理解性能优化', completed: false }
  ]);
  const [count, setCount] = useState(0);

  // 使用 useCallback 记忆回调函数
  const handleToggle = useCallback((todoId) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []); // 空依赖数组，因为使用了函数式更新

  const handleDelete = useCallback((todoId) => {
    setTodos(currentTodos =>
      currentTodos.filter(todo => todo.id !== todoId)
    );
  }, []);

  // 这个函数不需要被记忆，因为它只在当前组件中使用
  const handleCount = () => {
    setCount(c => c + 1);
  };

  return (
    <div>
      <h3>useCallback 示例</h3>
      <div style={{ marginBottom: '20px' }}>
        <p>计数器: {count}</p>
        <button onClick={handleCount}>增加计数</button>
        <p style={{ fontSize: '14px', color: '#666' }}>
          增加计数不会导致 TodoItem 重新渲染
        </p>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

const whatIs = 
  "useCallback 是一个用于性能优化的 Hook，它返回一个记忆化的回调函数。这个函数只有在依赖项发生变化时才会更新，可以避免不必要的渲染和计算。";

const whenToUse = 
  "• 当需要将回调函数传递给使用 React.memo 优化的子组件时\n" +
  "• 当回调函数作为其他 Hook 的依赖项时\n" +
  "• 当需要缓存函数以避免不必要的重新创建时\n" +
  "• 当回调函数的创建开销较大时";

const code = `// 完整的示例代码
import React, { useState, useCallback } from 'react';

// TodoItem 组件定义
const TodoItem = React.memo(({ todo, onToggle, onDelete }) => {
  console.log('TodoItem 渲染:', todo.text);
  return (
    <li style={{ margin: '10px 0' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{
        marginLeft: '10px',
        textDecoration: todo.completed ? 'line-through' : 'none'
      }}>
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        style={{ marginLeft: '10px' }}
      >
        删除
      </button>
    </li>
  );
});

// 主组件
const UseCallbackDemo = () => {
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
    <div>
      <h3>useCallback 示例</h3>
      <div style={{ marginBottom: '20px' }}>
        <p>计数器: {count}</p>
        <button onClick={handleCount}>增加计数</button>
        <p style={{ fontSize: '14px', color: '#666' }}>
          增加计数不会导致 TodoItem 重新渲染
        </p>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};`;

export const UseCallbackDemoPage = () => (
  <DemoPage
    whatIs={whatIs}
    whenToUse={whenToUse}
    code={code}
  />
); 