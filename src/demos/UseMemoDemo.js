import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { CodeEditor } from '../components/CodeEditor';
import { CodePreview } from '../components/CodePreview';
import { DemoPage } from '../components/DemoPage';

const defaultCode = `import React, { useState, useMemo } from 'react';

const ExpensiveComputation = ({ value }) => {
  const result = useMemo(() => {
    console.log('执行昂贵计算...');
    return value * value * value;
  }, [value]);

  return <div>计算结果: {result}</div>;
};

export const MemoDemo = () => {
  const [value, setValue] = useState(1);

  return (
    <div>
      <input 
        type="number" 
        value={value} 
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <ExpensiveComputation value={value} />
    </div>
  );
};`;

const whatIs = `
  useMemo 是一个用于性能优化的 Hook，它可以记忆计算结果。只有当依赖项发生变化时，才会重新计算值，这可以避免在每次渲染时都进行昂贵的计算。
`;

const whenToUse = `
  • 当需要进行昂贵的计算操作时
  • 当需要避免重复创建对象或数组时
  • 当计算结果被用作其他 Hook 的依赖项时
  • 当需要保持引用相等性以避免不必要的重渲染时
`;

const code = `const UseMemoDemo = () => {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [multiplier, setMultiplier] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  // 使用 useMemo 缓存计算结果
  const expensiveCalculation = useMemo(() => {
    console.log('执行昂贵的计算...');
    return numbers.map(num => {
      // 模拟耗时计算
      let result = num;
      for(let i = 0; i < 1000000; i++) {
        result = result * multiplier;
      }
      return result;
    });
  }, [numbers, multiplier]);

  return (
    <div style={{ padding: '20px' }}>
      {/* 主题切换示例 */}
      <div style={{
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: darkMode ? '#333' : 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        color: darkMode ? 'white' : '#333',
        transition: 'all 0.3s'
      }}>
        <h3>主题切换示例</h3>
        <p style={{ 
          color: darkMode ? '#aaa' : '#666', 
          fontSize: '14px' 
        }}>
          使用 useMemo 缓存样式对象，避免主题切换时的重复计算
        </p>
        <button
          onClick={() => setDarkMode(!darkMode)}
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
          切换主题
        </button>
      </div>

      {/* 计算示例 */}
      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>计算缓存示例</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          使用 useMemo 缓存计算结果，避免不必要的重复计算
        </p>
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => setNumbers([...numbers, numbers.length + 1])}
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
            添加数字
          </button>
          <input
            type="number"
            value={multiplier}
            onChange={(e) => setMultiplier(Number(e.target.value))}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              marginRight: '10px'
            }}
          />
        </div>

        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '15px',
          borderRadius: '4px'
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>原始数组:</h4>
          <p>{numbers.join(', ')}</p>
          
          <h4 style={{ margin: '10px 0' }}>计算结果:</h4>
          <p>{expensiveCalculation.join(', ')}</p>
          
          <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
            查看控制台以观察计算何时执行
          </p>
        </div>
      </div>
    </div>
  );
};`;

export const UseMemoDemoPage = () => (
  <DemoPage
    title="useMemo Hook"
    whatIs={whatIs}
    whenToUse={whenToUse}
    code={code}
  />
); 