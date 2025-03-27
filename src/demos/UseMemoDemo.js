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

const whatIs = 
  "useMemo 是一个用于性能优化的 Hook，它可以记忆计算结果。只有当依赖项发生变化时，才会重新计算值，这可以避免在每次渲染时都进行昂贵的计算。";

const whenToUse = 
  "• 当需要进行昂贵的计算操作时\n" +
  "• 当需要避免重复创建对象或数组时\n" +
  "• 当计算结果被用作其他 Hook 的依赖项时\n" +
  "• 当需要保持引用相等性以避免不必要的重渲染时";

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
  }, [numbers, multiplier]); // 只在 numbers 或 multiplier 改变时重新计算

  // 使用 useMemo 缓存样式对象
  const styles = useMemo(() => ({
    container: {
      backgroundColor: darkMode ? '#333' : 'white',
      color: darkMode ? 'white' : '#333',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.3s'
    },
    button: {
      padding: '8px 16px',
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginRight: '10px'
    },
    input: {
      padding: '8px',
      marginRight: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd'
    }
  }), [darkMode]);

  const addNumber = () => {
    setNumbers([...numbers, numbers.length + 1]);
  };

  return (
    <div style={styles.container}>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          style={styles.button}
        >
          切换主题
        </button>
        <button 
          onClick={addNumber}
          style={styles.button}
        >
          添加数字
        </button>
        <input
          type="number"
          value={multiplier}
          onChange={(e) => setMultiplier(Number(e.target.value))}
          style={styles.input}
        />
      </div>

      <div>
        <h4>原始数组:</h4>
        <p>{numbers.join(', ')}</p>
        
        <h4>计算结果:</h4>
        <p>{expensiveCalculation.join(', ')}</p>
        
        <p style={{ fontSize: '14px', color: darkMode ? '#aaa' : '#666' }}>
          查看控制台以观察计算何时执行
        </p>
      </div>
    </div>
  );
};`;

export const UseMemoDemoPage = () => (
  <DemoPage
    whatIs={whatIs}
    whenToUse={whenToUse}
    code={code}
  />
); 