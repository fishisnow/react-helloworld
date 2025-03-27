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
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3>计数器示例</h3>
        <p>当前计数: {count}</p>
        <button onClick={() => setCount(count + 1)}>增加</button>
        <button onClick={() => setCount(count - 1)}>减少</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>待办事项示例</h3>
        <div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="输入待办事项"
          />
          <button onClick={handleAddItem}>添加</button>
        </div>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => handleRemoveItem(index)}>删除</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};`;

export const UseStateDemoPage = () => (
  <DemoPage
    whatIs={whatIs}
    whenToUse={whenToUse}
    code={code}
  />
); 