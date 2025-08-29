'use client';

import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme, isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { value: 'light', label: 'Light', icon: SunIcon, color: 'text-yellow-500' },
    { value: 'dark', label: 'Dark', icon: MoonIcon, color: 'text-blue-500' },
    { value: 'system', label: 'System', icon: ComputerDesktopIcon, color: 'text-gray-500' },
  ] as const;

  const currentTheme = themes.find((t) => t.value === theme);

  return (
    <div className="relative">
      {/* Quick Toggle Button */}
      <button
        type="button"
        onClick={toggleTheme}
        className="relative p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        aria-label="Toggle theme"
      >
        <div className="relative w-6 h-6">
          {/* Sun Icon */}
          <SunIcon
            className={`w-6 h-6 transition-all duration-500 ${
              isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
            } text-yellow-500 absolute inset-0`}
          />
          {/* Moon Icon */}
          <MoonIcon
            className={`w-6 h-6 transition-all duration-500 ${
              isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
            } text-blue-500 absolute inset-0`}
          />
        </div>

        {/* Glow Effect */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            isDark
              ? 'bg-blue-500/20 shadow-lg shadow-blue-500/25'
              : 'bg-yellow-500/20 shadow-lg shadow-yellow-500/25'
          }`}
        />
      </button>

      {/* Theme Selector Dropdown */}
      <div className="absolute right-0 top-16 w-48">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-between"
        >
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Theme: {currentTheme?.label}
          </span>
          <div
            className={`w-4 h-4 rounded-full transition-all duration-200 ${
              isDark ? 'bg-blue-500' : 'bg-yellow-500'
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-scale-in">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              return (
                <button
                  type="button"
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value);
                    setIsOpen(false);
                  }}
                  className={`w-full p-3 flex items-center space-x-3 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    theme === themeOption.value
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500'
                      : ''
                  }`}
                >
                  <Icon className={`w-5 h-5 ${themeOption.color}`} />
                  <span
                    className={`text-sm font-medium ${
                      theme === themeOption.value
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {themeOption.label}
                  </span>
                  {theme === themeOption.value && (
                    <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Backdrop for closing dropdown */}
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-10"
          onClick={() => setIsOpen(false)}
          aria-label="Close theme selector"
        />
      )}
    </div>
  );
}
