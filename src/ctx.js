import { createContext, useContext, useState } from 'react';

// 创建 Context
export const ThemeContext = createContext();

export const ThemedComponent = () => {
    const theme = useContext(ThemeContext);  // 使用 useContext 获取全局状态
    return <div style={{ background: theme }}>Themed Component</div>;
};