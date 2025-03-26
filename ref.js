import { useRef } from 'react';

const FocusInput = () => {
    const inputRef = useRef(null);

    const focusInput = () => {
        inputRef.current.focus();  // 直接访问 DOM 元素
    };

    return (
        <div>
            <input ref={inputRef} />
            <button onClick={focusInput}>Focus the input</button>
        </div>
    );
};
