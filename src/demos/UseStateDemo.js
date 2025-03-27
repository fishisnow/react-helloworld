import React from 'react';
import { DemoPage } from '../components/DemoPage';

const whatIs = `
  useState 是 React 的一个基础 Hook，它允许你在函数组件中添加状态管理功能。它返回一个状态值和一个用于更新该状态的函数。
`;

const whenToUse = `
  • 当需要组件记住某些信息，且这些信息会随用户交互而变化时
  • 处理表单输入数据时
  • 实现切换功能（如显示/隐藏元素）时
  • 存储和更新用户交互的状态时
`;

const code = `const UseStateDemo = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    if (text.trim()) {
      setItems([...items, text]);
      setText('');
    }
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
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
        <h3>计数器示例</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          使用 useState 管理数字状态
        </p>
        <div>
          <p>当前计数: {count}</p>
          <button 
            onClick={() => setCount(count + 1)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            增加
          </button>
          <button
            onClick={() => setCount(count - 1)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            减少
          </button>
        </div>
      </div>

      {/* 待办事项示例 */}
      <div style={{
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>待办事项示例</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          使用 useState 管理数组和文本状态
        </p>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="输入待办事项"
            style={{
              padding: '8px',
              marginRight: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
          <button 
            onClick={handleAddItem}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            添加
          </button>
        </div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item, index) => (
            <li 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                marginBottom: '8px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px'
              }}
            >
              <span style={{ flex: 1 }}>{item}</span>
              <button
                onClick={() => handleRemoveItem(index)}
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

export const UseStateDemoPage = () => (
  <DemoPage
    title="useState Hook"
    whatIs={whatIs}
    whenToUse={whenToUse}
    code={code}
  />
); 