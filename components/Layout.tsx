
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin, Twitter, Mail, Moon, Sun, Camera, BookOpen } from 'lucide-react';
import { SiteConfig } from '../types';
import SEO from './SEO';

interface LayoutProps {
  children: React.ReactNode;
  config: SiteConfig | null;
}

const Layout: React.FC<LayoutProps> = ({ children, config }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Theme Logic: Follows System by default, respects LocalStorage override
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (isDark: boolean) => {
      setTheme(isDark ? 'dark' : 'light');
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches);
      }
    };

    // Initial Load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      applyTheme(savedTheme === 'dark');
    } else {
      applyTheme(mediaQuery.matches);
    }

    // Listen for system changes
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { name: 'Work', path: '/work' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
  ];

  const SocialIcon = ({ name }: { name: string }) => {
    switch (name.toLowerCase()) {
      case 'github': return <Github size={18} />;
      case 'linkedin': return <Linkedin size={18} />;
      case 'twitter': return <Twitter size={18} />;
      default: return <Mail size={18} />;
    }
  };

  return (
    <div className="min-h-screen flex-col bg-white dark:bg-zinc-950 transition-colors duration-300">
      <SEO />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo with Typewriter Animation */}
            <NavLink to="/" className="group flex items-center text-2xl font-bold tracking-tighter text-zinc-900 dark:text-white">
              <span>/p</span>
              <span className="max-w-0 overflow-hidden group-hover:max-w-[200px] transition-[max-width] duration-700 ease-in-out whitespace-nowrap text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white">
                retheesh
              </span>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium tracking-wide transition-colors duration-200 ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {/* LinkedIn Link in Header */}
              {config?.profile?.socials?.find(s => s.platform === 'LinkedIn') && (
                <>
                  <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-2"></div>
                  <a
                    href={config.profile.socials.find(s => s.platform === 'LinkedIn')?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-zinc-900 dark:text-white hover:opacity-70 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 p-6 shadow-xl animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-2xl font-bold tracking-tight ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-100 dark:border-zinc-800 py-12 bg-zinc-50/50 dark:bg-zinc-900/20 transition-colors">
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
            <span className="font-bold tracking-tight text-zinc-900 dark:text-white">/p</span>
            <span className="text-zinc-400 dark:text-zinc-500 text-sm">
              © {new Date().getFullYear()} {config?.profile?.name || 'Pretheesh Thomas'}.
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex space-x-6">
              {config?.profile?.socials?.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors transform hover:-translate-y-0.5 duration-200"
                  aria-label={social.platform}
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>

            <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block"></div>

            <a
              href="https://pshmt.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors transform hover:-translate-y-0.5 duration-200"
              aria-label="Substack Newsletter"
            >
              <BookOpen size={18} />
            </a>

            <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block"></div>

            <button
              onClick={toggleTheme}
              className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block"></div>

            <NavLink
              to="/photography"
              className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors transform hover:-translate-y-0.5 duration-200"
              aria-label="Photography"
            >
              <Camera size={18} />
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
