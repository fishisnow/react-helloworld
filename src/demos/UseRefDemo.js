import React, { useRef, useState } from 'react';
import { DemoPage } from '../components/DemoPage';

const whatIs = 
  "useRef 是一个 React Hook，它返回一个可变的 ref 对象，该对象在组件的整个生命周期内保持不变。它可以用来存储任何可变值，最常用的场景是引用 DOM 元素。";

const whenToUse = 
  "• 当需要直接访问 DOM 元素时\n" +
  "• 当需要保存一个值，但这个值的改变不需要触发重新渲染时\n" +
  "• 当需要在多次渲染之间保持数据时\n" +
  "• 当需要保存前一个状态的值时";

const code = `const UseRefDemo = () => {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const countRef = useRef(0);
  const [renderCount, setRenderCount] = useState(0);

  // 聚焦输入框
  const handleFocus = () => {
    inputRef.current.focus();
  };

  // 记录点击次数（不触发重新渲染）
  const handleClick = () => {
    countRef.current += 1;
    console.log('点击次数:', countRef.current);
  };

  // 更新状态（触发重新渲染）
  const handleUpdate = () => {
    setRenderCount(prev => prev + 1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            padding: '8px',
            marginRight: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}
        />
        <button
          onClick={handleFocus}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          聚焦输入框
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={handleClick}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          增加点击次数（不重新渲染）
        </button>
        <button
          onClick={handleUpdate}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          触发重新渲染
        </button>
      </div>

      <div>
        <p>当前输入: {text}</p>
        <p>渲染次数: {renderCount}</p>
        <p>查看控制台以了解点击次数</p>
      </div>
    </div>
  );
};`;

export const UseRefDemoPage = () => (
  <DemoPage
    whatIs={whatIs}
    whenToUse={whenToUse}
    code={code}
  />
); 