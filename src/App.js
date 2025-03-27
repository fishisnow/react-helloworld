import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { UseStateDemoPage } from './demos/UseStateDemo';
import { UseEffectDemoPage } from './demos/UseEffectDemo';
import { UseReducerDemoPage } from './demos/UseReducerDemo';
import { UseCallbackDemoPage } from './demos/UseCallbackDemo';
import { UseRefDemoPage } from './demos/UseRefDemo';
import { UseMemoDemoPage } from './demos/UseMemoDemo';
import { UseContextDemoPage } from './demos/UseContextDemo';
import { UseQueryDemoPage } from './demos/UseQueryDemo';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<UseStateDemoPage />} />
          <Route path="/usestate" element={<UseStateDemoPage />} />
          <Route path="/useeffect" element={<UseEffectDemoPage />} />
          <Route path="/usereducer" element={<UseReducerDemoPage />} />
          <Route path="/usecallback" element={<UseCallbackDemoPage />} />
          <Route path="/useref" element={<UseRefDemoPage />} />
          <Route path="/usememo" element={<UseMemoDemoPage />} />
          <Route path="/usecontext" element={<UseContextDemoPage />} />
          <Route path="/usequery" element={<UseQueryDemoPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;