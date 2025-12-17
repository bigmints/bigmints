import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import ProjectDetail from './pages/ProjectDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Photography from './pages/Photography';
import { SiteConfig } from './types';
import { loadConfig } from './utils/configLoader';

// ScrollToTop component to ensure page starts at top on route change
const ScrollToTopHelper = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadConfig();
        setConfig(data);
      } catch (error) {
        console.error("Could not load configuration", error);
      }
    };

    loadData();
  }, []);

  return (
    <Router>
      <ScrollToTopHelper />
      {!config ? (
        <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-zinc-900 dark:border-white"></div>
        </div>
      ) : (
        <Layout config={config}>
          <Routes>
            <Route path="/" element={<Home config={config} />} />
            <Route path="/work" element={<Work config={config} />} />
            <Route path="/work/:id" element={<ProjectDetail config={config} />} />
            <Route path="/blog" element={<Blog config={config} />} />
            <Route path="/blog/:slug" element={<BlogPost config={config} />} />
            <Route path="/photography" element={<Photography config={config} />} />
            <Route path="/about" element={<About config={config} />} />
          </Routes>
        </Layout>
      )}
    </Router>
  );
};

export default App;