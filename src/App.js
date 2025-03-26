import {FocusInput} from './ref';
import {ExpensiveComputation} from "./memoCallback";
import {useState} from "react";
import './App.css';
import {ThemeContext, ThemedComponent} from './ctx';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Post} from "./req";

function App() {
    const [theme, setTheme] = useState('lightgrey');
    const [value, setValue] = useState(1);
    const handleChange = (e) => {
        setValue(Number(e.target.value));
    }
    const queryClient = new QueryClient();
    return (
        <div className="App">
            <header className="App-header">
                <h2>Ref 示例</h2>
                <FocusInput/>
                
                <h2>Memo 示例</h2>
                <input type="number" value={value} onChange={handleChange}/>
                <ExpensiveComputation value={value}/>
            </header>

            <div className="theme-section">
                <h2>Context 示例</h2>
                <ThemeContext.Provider value={theme}>
                    <div className="theme-container">
                        <button 
                            onClick={() => setTheme(theme === 'lightgrey' ? 'darkgrey' : 'lightgrey')}
                            className="theme-button"
                        >
                            切换主题
                        </button>
                        <ThemedComponent />
                    </div>
                </ThemeContext.Provider>
            </div>
            <div>
                <QueryClientProvider client={queryClient}>
                    <Post />
                </QueryClientProvider>
            </div>
        </div>
    );
}

export default App;
