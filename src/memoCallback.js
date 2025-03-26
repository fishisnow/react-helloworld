import { useMemo, useCallback } from 'react';

export const ExpensiveComputation = ({ value }) => {
    const computeExpensiveValue = useMemo(() => {
        return value * 2; // 假设这是一个昂贵的计算
    }, [value]); // 只有 value 变化时重新计算

    const handleClick = useCallback(() => {
        console.log('Button clicked');
    }, []);  // 保持 handleClick 函数不变

    return (
        <div>
            <p>{computeExpensiveValue}</p>
            <button onClick={handleClick}>Click Me</button>
        </div>
    );
};
