'use client';

import { useThemeContext, Theme } from '@/contexts/ThemeContext';

const themes = [
  { id: 'light' as Theme, name: 'Light Theme', color: '#F8F8FF', icon: '☀️' },
  { id: 'dark' as Theme, name: 'Dark Theme', color: '#0B0B0F', icon: '🌙' },
];

export default function ThemeSwitcher() {
  const { theme, setTheme, mounted } = useThemeContext();

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex gap-3 bg-bg border-2 border-border rounded-full p-3 shadow-lg">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`
              w-12 h-12 rounded-full transition-all duration-200 flex items-center justify-center text-xl
              ${theme === t.id ? 'ring-2 ring-border ring-offset-2 ring-offset-bg scale-110' : 'hover:scale-105 opacity-60'}
            `}
            style={{ backgroundColor: t.color }}
            aria-label={`Switch to ${t.name}`}
            title={t.name}
          >
            <span className={t.id === 'light' ? 'text-gray-800' : 'text-gray-100'}>{t.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
