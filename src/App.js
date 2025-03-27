import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RefDemo } from './demos/RefDemo';
import { MemoDemoPage } from './demos/MemoDemo';
import { ContextDemoPage } from './demos/ContextDemo';
import { StateDemoPage } from './demos/StateDemo';
import { QueryDemoPage } from './demos/QueryDemo';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/ref" element={<RefDemo />} />
          <Route path="/memo" element={<MemoDemoPage />} />
          <Route path="/context" element={<ContextDemoPage />} />
          <Route path="/state" element={<StateDemoPage />} />
          <Route path="/query" element={<QueryDemoPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;