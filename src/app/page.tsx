'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FileItem } from '../types/electron';
import { FaInbox } from "react-icons/fa6";

// Icon components
const Icon = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-5 h-5 flex items-center justify-center ${className}`}>
    {children}
  </div>
);

const PlusIcon = () => (
  <Icon>
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 4v16m8-8H4"/>
    </svg>
  </Icon>
);

const SearchIcon = () => (
  <Icon>
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="m21 21-4.35-4.35M11 6a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5z"/>
    </svg>
  </Icon>
);

const BookIcon = () => (
  <Icon>
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V5a2.5 2.5 0 0 1 2.5-2.5H20"/>
    </svg>
  </Icon>
);

const PlayIcon = () => (
  <Icon>
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="m5 3 14 9-14 9z"/>
    </svg>
  </Icon>
);

const GridIcon = () => (
  <Icon>
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>
    </svg>
  </Icon>
);

const CanvaIcon = () => (
  <Icon className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg">
    <span className="text-xs font-bold">C</span>
  </Icon>
);

const DalleIcon = () => (
  <Icon className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-xl shadow-lg">
    <div className="w-3 h-3 bg-white rounded-full shadow-inner"></div>
  </Icon>
);

const ChevronDownIcon = () => (
  <Icon>
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  </Icon>
);

const GearIcon = () => (
  <Icon>
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  </Icon>
);

const MicrophoneIcon = () => (
  <Icon>
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  </Icon>
);

const WaveformIcon = () => (
  <Icon>
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M2 12h2l2-8 4 16 2-8h2"/>
    </svg>
  </Icon>
);

const DiamondIcon = () => (
  <Icon>
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  </Icon>
);

const CollapseIcon = () => (
  <Icon>
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
    </svg>
  </Icon>
);

const RefreshIcon = () => (
  <Icon>
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
      <path d="M21 3v5h-5"/>
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
      <path d="M3 21v-5h5"/>
    </svg>
  </Icon>
);

const EmptyBoxIcon = () => (
  <Icon className="w-16 h-16 text-slate-400">
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  </Icon>
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
  </div>
);

const ProcessingProgress = ({ current, total }: { current: number; total: number }) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
        <span>Processing files...</span>
        <span>{current} / {total}</span>
      </div>
      <div className="w-full bg-slate-700/50 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-xs text-slate-500 mt-1 text-center">{percentage}%</div>
    </div>
  );
};

const FileTypeIcon = ({ fileName }: { fileName: string }) => {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  
  // Programming Languages
  if (['js', 'jsx'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
  }
  
  if (['ts', 'tsx'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
  }
  
  if (['py', 'pyc', 'pyo'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-500">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
  }
  
  if (['java', 'class'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-orange-500">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
  }
  
  if (['cpp', 'cc', 'cxx', 'c++', 'h', 'hpp', 'hxx'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
  }
  
  if (['c'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-600">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
  }
  
  if (['rs'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-orange-600">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
  }
  
  if (['go'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-cyan-500">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
  }
  
  if (['php'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-purple-500">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
  }
  
  if (['rb'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-500">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
  }
  
  if (['swift'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-orange-400">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
  }
  
  if (['kt', 'kts'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-purple-600">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
  }
  
  // Web Technologies
  if (['html', 'htm'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-orange-500">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
  }
  
  if (['css', 'scss', 'sass', 'less'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-500">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
  }
  
  if (['json', 'xml', 'yaml', 'yml', 'toml'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-500">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
  }
  
  // Configuration Files
  if (['env', 'config', 'ini', 'conf'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
  }
  
  if (['md', 'markdown', 'txt', 'rst'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-400">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
      </svg>
    );
  }
  
  // Build and Package Files
  if (['lock', 'package-lock', 'yarn-lock'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-400">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
  }
  
  if (['gitignore', 'dockerignore'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    );
  }
  
  // Image Files
  if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico', 'bmp'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-400">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    );
  }
  
  // Video Files
  if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-400">
        <polygon points="23,7 16,12 23,17"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    );
  }
  
  // Audio Files
  if (['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-purple-400">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
      </svg>
    );
  }
  
  // Archive Files
  if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-600">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    );
  }
  
  // Database Files
  if (['sql', 'db', 'sqlite', 'sqlite3'].includes(extension)) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    );
  }
  
  // Default file icon
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-slate-400">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10,9 9,9 8,9"/>
    </svg>
  );
};

const FileTreeItem = ({ item, level = 0, onDelete, onGetInfo }: { 
  item: { name: string; type: 'file' | 'folder'; path: string; children?: Array<{ name: string; type: 'file' | 'folder'; path: string }> }; 
  level?: number;
  onDelete?: (path: string) => void;
  onGetInfo?: (path: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(item.type === 'folder');
  const [showContextMenu, setShowContextMenu] = useState(false);
  
  // Ensure folders are expanded by default
  useEffect(() => {
    if (item.type === 'folder') {
      setIsExpanded(true);
    }
  }, [item.type]);
  
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowContextMenu(true);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(item.path);
    }
    setShowContextMenu(false);
  };

  const handleGetInfo = () => {
    if (onGetInfo) {
      onGetInfo(item.path);
    }
    setShowContextMenu(false);
  };

  // Close context menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setShowContextMenu(false);
    };

    if (showContextMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [showContextMenu]);
  
  return (
    <div className="select-none relative">
      <div 
        className={`flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200 cursor-pointer group ${
          level > 0 ? 'ml-' + (level * 4) : ''
        }`}
        style={{ marginLeft: `${level * 16}px` }}
        onContextMenu={handleContextMenu}
        onClick={() => {
          if (item.type === 'folder') {
            setIsExpanded(!isExpanded);
          } else if (onGetInfo) {
            onGetInfo(item.path);
          }
        }}
      >
        {item.type === 'folder' ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="w-4 h-4 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
            >
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        ) : (
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
          </div>
        )}
        
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {item.type === 'folder' ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-400">
              <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/>
            </svg>
          ) : (
            <FileTypeIcon fileName={item.name} />
          )}
          <span className="text-slate-300 text-sm truncate group-hover:text-white transition-colors">
            {item.name}
          </span>
          {item.type === 'folder' && item.children && (
            <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded-full">
              {item.children.length}
            </span>
          )}
        </div>
      </div>
      
      {/* Context Menu */}
      {showContextMenu && (
        <div className="absolute left-0 top-full z-50 bg-slate-800 border border-slate-600 rounded-lg shadow-lg py-1 min-w-32">
          <button
            onClick={handleGetInfo}
            className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            Get Info
          </button>
          <button
            onClick={handleDelete}
            className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-white transition-colors"
          >
            Delete
          </button>
        </div>
      )}
      
      {item.type === 'folder' && isExpanded && item.children && (
        <div className="ml-4 border-l border-slate-700/30">
          {item.children.map((child, index) => (
            <FileTreeItem 
              key={index} 
              item={child} 
              level={level + 1} 
              onDelete={onDelete}
              onGetInfo={onGetInfo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(320);
  const [rightSidebarWidth, setRightSidebarWidth] = useState(320);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string; text: string; isUser: boolean; timestamp: Date}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [folderFiles, setFolderFiles] = useState<Array<{name: string; type: 'file' | 'folder'; path: string; children?: Array<{name: string; type: 'file' | 'folder'; path: string}>}>>([]);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  const [processingProgress, setProcessingProgress] = useState({ current: 0, total: 0 });
  
  const leftResizeRef = useRef<HTMLDivElement>(null);
  const rightResizeRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const recentChats = [''];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: `I understand you said: "${inputValue}". This is a simulated response from Gemini. In a real implementation, this would be an actual AI response.`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFolderSelect = async () => {
    try {
      console.log('handleFolderSelect called');
      console.log('window.electronAPI available:', typeof window !== 'undefined' && window.electronAPI);
      
      // Check if we're running in Electron
      if (typeof window !== 'undefined' && window.electronAPI) {
        console.log('Using Electron API to open folder');
        const folderPath = await window.electronAPI.openFolder();
        console.log('Selected folder path:', folderPath);
        if (folderPath) {
          setSelectedFolder(folderPath);
          await processFolderWithElectron(folderPath);
        }
      } else {
        console.warn('Electron API not available, falling back to web file input');
        // Fallback to web file input if needed
        const input = document.createElement('input');
        input.type = 'file';
        input.webkitdirectory = true;
        input.multiple = true;
        input.onchange = (e) => {
          const files = (e.target as HTMLInputElement).files;
          if (files && files.length > 0) {
            const folderPath = files[0].webkitRelativePath.split('/')[0];
            setSelectedFolder(folderPath);
            
            // Create a simple file tree for web fallback
            const fileTree: Array<{name: string; type: 'file' | 'folder'; path: string; children?: Array<{name: string; type: 'file' | 'folder'; path: string}>}> = [];
            
            Array.from(files).forEach(file => {
              if (file.name !== '.gitignore') {
                const pathParts = file.webkitRelativePath.split('/');
                const fileName = pathParts[pathParts.length - 1];
                const folderPath = pathParts.slice(0, -1).join('/');
                
                if (folderPath === '') {
                  fileTree.push({
                    name: fileName,
                    type: 'file',
                    path: fileName
                  });
                } else {
                  // Handle nested folders (simplified for web fallback)
                  const folderParts = folderPath.split('/');
                  let currentLevel = fileTree;
                  
                  folderParts.forEach((part, index) => {
                    let existingFolder = currentLevel.find(item => item.name === part && item.type === 'folder');
                    if (!existingFolder) {
                      existingFolder = {
                        name: part,
                        type: 'folder',
                        path: folderParts.slice(0, index + 1).join('/'),
                        children: []
                      };
                      currentLevel.push(existingFolder);
                    }
                    currentLevel = existingFolder.children!;
                  });
                  
                  currentLevel.push({
                    name: fileName,
                    type: 'file',
                    path: file.webkitRelativePath
                  });
                }
              }
            });
            
            setFolderFiles(fileTree);
          }
        };
        input.click();
      }
    } catch (error) {
      console.error('Error opening folder:', error);
    }
  };

  const processFolderWithElectron = async (folderPath: string) => {
    try {
      console.log('processFolderWithElectron called with path:', folderPath);
      setIsProcessingFiles(true);
      setProcessingProgress({ current: 0, total: 1 });
      
      // Read the directory contents
      console.log('Reading directory contents...');
      const items = await window.electronAPI.readDirectory(folderPath);
      console.log('Directory items:', items);
      
      // Check for .gitignore file
      let gitignorePatterns: string[] = [];
      const gitignoreItem = items.find(item => item.name === '.gitignore');
      
      if (gitignoreItem) {
        try {
          console.log('Found .gitignore file, reading contents...');
          const gitignoreContent = await window.electronAPI.readFile(gitignoreItem.path);
          gitignorePatterns = parseGitignore(gitignoreContent);
          console.log('Gitignore patterns:', gitignorePatterns);
        } catch (error) {
          console.warn('Could not read .gitignore file:', error);
        }
      }
      
      // Filter out ignored files and build tree
      const filteredItems = items.filter(item => 
        item.name !== '.gitignore' && 
        !shouldIgnoreFile(item.path, gitignorePatterns)
      );
      console.log('Filtered items:', filteredItems);
      
      setProcessingProgress({ current: 1, total: 1 });
      
      // Convert to tree structure
      const fileTree = buildFileTreeFromItems(filteredItems, folderPath);
      console.log('Built file tree:', fileTree);
      console.log('Setting folder files with:', fileTree.length, 'items');
      setFolderFiles(fileTree);
      
    } catch (error) {
      console.error('Error processing folder:', error);
    } finally {
      setIsProcessingFiles(false);
      setProcessingProgress({ current: 0, total: 0 });
    }
  };

  const buildFileTreeFromItems = (items: FileItem[], rootPath: string) => {
    const fileTree: Array<{name: string; type: 'file' | 'folder'; path: string; children?: Array<{name: string; type: 'file' | 'folder'; path: string}>}> = [];
    const folderMap = new Map<string, Array<{name: string; type: 'file' | 'folder'; path: string}>>();
    
    items.forEach(item => {
      const relativePath = item.path.replace(rootPath, '').replace(/^[\\/]/, '');
      const pathParts = relativePath.split(/[\\/]/);
      const fileName = pathParts[pathParts.length - 1];
      const folderPath = pathParts.slice(0, -1).join('/');
      
      if (!folderMap.has(folderPath)) {
        folderMap.set(folderPath, []);
      }
      
      folderMap.get(folderPath)!.push({
        name: fileName,
        type: item.type,
        path: relativePath
      });
    });
    
    // Convert to tree structure
    folderMap.forEach((files, folderPath) => {
      if (folderPath === '') {
        // Root level files
        files.forEach(file => {
          fileTree.push(file);
        });
      } else {
        // Files in subfolders
        const folderParts = folderPath.split('/');
        let currentLevel = fileTree;
        
        folderParts.forEach((part, index) => {
          let existingFolder = currentLevel.find(item => item.name === part && item.type === 'folder');
          if (!existingFolder) {
            existingFolder = {
              name: part,
              type: 'folder',
              path: folderParts.slice(0, index + 1).join('/'),
              children: []
            };
            currentLevel.push(existingFolder);
          }
          currentLevel = existingFolder.children!;
        });
        
        files.forEach(file => {
          currentLevel.push(file);
        });
      }
    });
    
    return fileTree;
  };

  const triggerFolderSelect = () => {
    handleFolderSelect();
  };

  const changeSelectedFolder = async () => {
    try {
      setSelectedFolder(null);
      setFolderFiles([]);
      await handleFolderSelect();
    } catch (error) {
      console.error('Error changing folder:', error);
    }
  };

  const parseGitignore = (gitignoreContent: string): string[] => {
    return gitignoreContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
      .map(pattern => {
        // Convert gitignore patterns to regex patterns
        if (pattern.startsWith('/')) {
          // Absolute path from root
          return pattern.substring(1);
        } else if (pattern.endsWith('/')) {
          // Directory
          return pattern + '**';
        } else if (pattern.includes('*')) {
          // Wildcard pattern
          return pattern.replace(/\*/g, '.*');
        } else {
          // Simple file/directory name
          return pattern;
        }
      });
  };

  const shouldIgnoreFile = (filePath: string, gitignorePatterns: string[]): boolean => {
    return gitignorePatterns.some(pattern => {
      try {
        // Convert gitignore pattern to regex and test against the file path
        if (pattern.startsWith('/')) {
          // Absolute path from root
          const regexPattern = pattern.substring(1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(regexPattern);
          return regex.test(filePath);
        } else if (pattern.endsWith('/')) {
          // Directory
          const regexPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '.*';
          const regex = new RegExp(regexPattern);
          return regex.test(filePath);
        } else if (pattern.includes('*')) {
          // Wildcard pattern
          const regexPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
          const regex = new RegExp(regexPattern);
          return regex.test(filePath);
        } else {
          // Simple file/directory name
          return filePath.includes(pattern);
        }
      } catch {
        // If regex is invalid, do simple string matching
        return filePath.includes(pattern);
      }
    });
  };

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check Electron API availability on mount
  React.useEffect(() => {
    console.log('Component mounted, checking Electron API...');
    console.log('window object available:', typeof window !== 'undefined');
    if (typeof window !== 'undefined') {
      console.log('window.electronAPI:', window.electronAPI);
      console.log('Available methods:', window.electronAPI ? Object.keys(window.electronAPI) : 'None');
    }
  }, []);

  // Debug effect for folderFiles
  React.useEffect(() => {
    console.log('folderFiles changed:', folderFiles);
    console.log('folderFiles length:', folderFiles.length);
    if (folderFiles.length > 0) {
      console.log('First few items:', folderFiles.slice(0, 3));
    }
  }, [folderFiles]);

  // Utility functions for file operations
  const createNewFile = async (fileName: string, content: string = '') => {
    if (typeof window !== 'undefined' && window.electronAPI && selectedFolder) {
      try {
        const filePath = await window.electronAPI.joinPaths(selectedFolder, fileName);
        await window.electronAPI.writeFile(filePath, content);
        console.log(`Created file: ${filePath}`);
        // Refresh the file list
        await processFolderWithElectron(selectedFolder);
      } catch (error) {
        console.error('Error creating file:', error);
      }
    }
  };

  const createNewFolder = async (folderName: string) => {
    if (typeof window !== 'undefined' && window.electronAPI && selectedFolder) {
      try {
        const folderPath = await window.electronAPI.joinPaths(selectedFolder, folderName);
        await window.electronAPI.createDirectory(folderPath);
        console.log(`Created folder: ${folderPath}`);
        // Refresh the file list
        await processFolderWithElectron(selectedFolder);
      } catch (error) {
        console.error('Error creating folder:', error);
      }
    }
  };

  const deleteSelectedFile = async (filePath: string) => {
    if (typeof window !== 'undefined' && window.electronAPI) {
      try {
        // Ensure absolute path for Electron FS calls
        const isAbsolutePath = filePath.startsWith('/') || /^[A-Za-z]:\\/.test(filePath);
        const absolutePath = isAbsolutePath || !selectedFolder
          ? filePath
          : await window.electronAPI.joinPaths(selectedFolder, filePath);

        const stats = await window.electronAPI.getFileStats(absolutePath);
        if (stats.isDirectory) {
          await window.electronAPI.deleteDirectory(absolutePath);
        } else {
          await window.electronAPI.deleteFile(absolutePath);
        }
        console.log(`Deleted: ${absolutePath}`);
        // Refresh the file list
        if (selectedFolder) {
          await processFolderWithElectron(selectedFolder);
        }
      } catch (error) {
        console.error('Error deleting file/folder:', error);
      }
    }
  };

  const getFileInfo = async (filePath: string) => {
    if (typeof window !== 'undefined' && window.electronAPI) {
      try {
        // Ensure absolute path for Electron FS calls
        const isAbsolutePath = filePath.startsWith('/') || /^[A-Za-z]:\\/.test(filePath);
        const absolutePath = isAbsolutePath || !selectedFolder
          ? filePath
          : await window.electronAPI.joinPaths(selectedFolder, filePath);

        const stats = await window.electronAPI.getFileStats(absolutePath);
        const extension = await window.electronAPI.getFileExtension(absolutePath);
        const fileName = await window.electronAPI.getFileName(absolutePath);
        const dirName = await window.electronAPI.getDirectoryName(absolutePath);
        
        console.log('File Info:', {
          name: fileName,
          extension,
          directory: dirName,
          size: stats.size,
          modified: stats.modified,
          isDirectory: stats.isDirectory
        });
        
        return { stats, extension, fileName, dirName };
      } catch (error) {
        console.error('Error getting file info:', error);
        return null;
      }
    }
    return null;
  };

  const handleLeftResize = useCallback((e: MouseEvent) => {
    if (isDraggingLeft) {
      const newWidth = e.clientX;
      if (newWidth >= 200 && newWidth <= 600) {
        setLeftSidebarWidth(newWidth);
      }
    }
  }, [isDraggingLeft]);

  const handleRightResize = useCallback((e: MouseEvent) => {
    if (isDraggingRight) {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 200 && newWidth <= 600) {
        setRightSidebarWidth(newWidth);
      }
    }
  }, [isDraggingRight]);

  const startLeftResize = useCallback(() => {
    setIsDraggingLeft(true);
    document.addEventListener('mousemove', handleLeftResize);
    document.addEventListener('mouseup', () => {
      setIsDraggingLeft(false);
      document.removeEventListener('mousemove', handleLeftResize);
    });
  }, [handleLeftResize]);

  const startRightResize = useCallback(() => {
    setIsDraggingRight(true);
    document.addEventListener('mousemove', handleRightResize);
    document.addEventListener('mouseup', () => {
      setIsDraggingRight(false);
      document.removeEventListener('mousemove', handleRightResize);
    });
  }, [handleRightResize]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Left Sidebar */}
      <div 
        className="bg-slate-800/50 backdrop-blur-xl border-r border-slate-700/50 flex flex-col shadow-2xl relative"
        style={{ width: `${leftSidebarWidth}px` }}
      >
        {/* Top Section */}
        <div className="p-6 border-b border-slate-700/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <GearIcon />
            </div>
            <span className="text-white font-bold text-lg bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Gemini GUI
            </span>
          </div>
          
          <button className="w-full flex items-center gap-3 text-slate-200 hover:text-white hover:bg-slate-700/50 rounded-xl p-3 mb-3 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group">
            <div className="p-1.5 w-4 h-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <PlusIcon />
            </div>
            <span className="font-medium">New chat</span>
          </button>
          
          
        </div>

        {/* Chat History */}
        <div className="flex-1 p-6 overflow-hidden flex flex-col">
          <h3 className="text-white font-semibold mb-4 text-lg flex-shrink-0">Chats</h3>
          <div className="space-y-2 overflow-y-auto flex-1 min-h-0">
            {/* {recentChats.map((chat, index) => (
              <button
                key={index}
                className="w-full text-left text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-xl p-3 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] text-sm group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <span className="truncate">{chat}</span>
                </div>
              </button>
            ))} */}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-6 border-t border-slate-700/30">
          <div className="flex items-center gap-3 text-white p-3 rounded-xl hover:bg-slate-700/50 transition-all duration-200 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-200"></div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">User</span>
                <ChevronDownIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Resize Handle */}
        <div
          ref={leftResizeRef}
          className="absolute right-0 top-0 bottom-0 w-1 bg-slate-600/50 hover:bg-slate-500 cursor-col-resize group"
          onMouseDown={startLeftResize}
        >
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-slate-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-indigo-900/20 backdrop-blur-sm flex flex-col relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Top Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/30 relative z-10">
          <div className="flex items-center gap-3 text-white">
            <span className="font-bold text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Gemini 2.5 Pro
            </span>
            <div className="p-1.5 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors duration-200 cursor-pointer">
              <ChevronDownIcon />
            </div>
          </div>
                    
          <button className="text-slate-300 hover:text-white hover:bg-slate-700/50 p-3 rounded-xl transition-all duration-200 hover:shadow-lg">
            <GearIcon />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col p-8 relative z-10 overflow-hidden">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-center max-w-3xl">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-pulse"></div>
                    <span className="text-purple-300 text-sm font-medium">New</span>
                  </div>
                </div>
                
                <h1 className="text-6xl font-bold text-white mb-6 leading-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  Introducing Gemini Pro
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                  Gemini now has our smartest, fastest, most useful model yet, with thinking built in — so you get the best answer, every time.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-6 pr-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-6 py-4 shadow-lg ${
                      message.isUser
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                        : 'bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 text-slate-200'
                    }`}
                  >
                    <p className="text-lg leading-relaxed">{message.text}</p>
                    <div className={`text-xs mt-2 opacity-70 ${message.isUser ? 'text-purple-100' : 'text-slate-400'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                  <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl px-6 py-4 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-slate-400 text-sm">Gemini is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              {/* <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <button className="text-slate-400 hover:text-white p-2 hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-110">
                  <PlusIcon />
                </button>
              </div> */}
              
              <input
                type="text"
                placeholder="Ask anything"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full bg-slate-800/80 backdrop-blur-xl border border-slate-600/50 rounded-2xl py-4 pl-16 pr-32 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-lg shadow-xl"
              />
              
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-slate-600 disabled:to-slate-700 text-white px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Send
                </button>
                {/* <button className="text-slate-400 hover:text-white p-2 hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-110">
                  <MicrophoneIcon />
                </button>
                <button className="text-slate-400 hover:text-white p-2 hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-110">
                  <WaveformIcon />
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Workspace */}
      <div 
        className="bg-slate-800/50 backdrop-blur-xl border-l border-slate-700/50 flex flex-col shadow-2xl relative"
        style={{ width: `${rightSidebarWidth}px` }}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700/30">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Workspace</h2>
            <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-300 hover:text-white">
              <CollapseIcon />
            </button>
          </div>
        </div>

        {/* File Section */}
        <div className="p-6 border-b border-slate-700/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wide">File</h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => createNewFile('new-file.txt', 'Hello World!')}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white"
                title="Create new file"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </button>
              <button 
                onClick={() => createNewFolder('new-folder')}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white"
                title="Create new folder"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/>
                </svg>
              </button>
              <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white">
                <RefreshIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-hidden">
          {isProcessingFiles ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center max-w-md">
                <LoadingSpinner />
                <h3 className="text-lg font-medium text-slate-300 mt-4 mb-4">Processing Files</h3>
                <p className="text-sm text-slate-400 mb-6">
                  Please wait while we process your project files...
                </p>
                <ProcessingProgress current={processingProgress.current} total={processingProgress.total} />
              </div>
            </div>
          ) : selectedFolder ? (
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700/30">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-400">
                  <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/>
                </svg>
                <span className="text-white font-medium truncate">{selectedFolder}</span>
                <button 
                  onClick={changeSelectedFolder}
                  className="ml-auto p-1.5 px-2 text-xs bg-slate-700/50 hover:bg-slate-600/70 rounded text-slate-200 hover:text-white transition-colors"
                >
                  Change Folder
                </button>
                <button 
                  onClick={() => {
                    setSelectedFolder(null);
                    setFolderFiles([]);
                  }}
                  className="p-1 hover:bg-slate-700/50 rounded text-slate-400 hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              
              {/* Debug Info */}
              <div className="mb-4 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-slate-400">Debug Info:</div>
                  <button 
                    onClick={() => selectedFolder && processFolderWithElectron(selectedFolder)}
                    className="text-xs text-slate-400 hover:text-white hover:bg-slate-600/50 px-2 py-1 rounded transition-colors"
                  >
                    Refresh
                  </button>
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <div>Selected Folder: {selectedFolder}</div>
                  <div>Files Count: {folderFiles.length}</div>
                  <div>Is Processing: {isProcessingFiles ? 'Yes' : 'No'}</div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-1">
                {folderFiles.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-slate-400 text-sm mb-2">No files found</div>
                    <div className="text-slate-500 text-xs">Try refreshing or check if the folder contains files</div>
                  </div>
                ) : (
                  folderFiles.map((item, index) => (
                    <FileTreeItem 
                      key={index} 
                      item={item} 
                      onDelete={deleteSelectedFile}
                      onGetInfo={getFileInfo}
                    />
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center">
                {/* <EmptyBoxIcon /> */}
                <h3 className="text-lg font-medium text-slate-300 mt-4 mb-2">It&apos;s empty</h3>
                <p className="text-sm text-slate-400 max-w-xs mb-6">
                  Files will appear here after uploading files or opening a folder.
                </p>
                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 font-medium mx-auto" onClick={triggerFolderSelect}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/>
                  </svg>
                  <span>Open Folder</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Resize Handle */}
        <div
          ref={rightResizeRef}
          className="absolute left-0 top-0 bottom-0 w-1 bg-slate-600/50 hover:bg-slate-500 cursor-col-resize group"
          onMouseDown={startRightResize}
        >
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-slate-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </div>
      </div>
    </div>
  );
}
