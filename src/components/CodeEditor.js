import React, { useState, useEffect, useRef } from 'react';
import Editor from "@monaco-editor/react";
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export const CodeEditor = ({ code, onChange, title }) => {
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  // 计算编辑器内容需要的高度
  const calculateEditorHeight = () => {
    if (editorRef.current) {
      const lineCount = code.split('\n').length;
      // 每行大约 20px 高度，再加上一些 padding
      return Math.min(Math.max(lineCount * 20 + 40, 200), 600);
    }
    return 500; // 默认高度
  };

  // 保存编辑器的引用
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    // 初始化时设置合适的高度
    if (containerRef.current) {
      containerRef.current.style.height = `${calculateEditorHeight()}px`;
    }
  };

  // 处理全屏切换
  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    
    // 使用 requestAnimationFrame 确保在 DOM 更新后执行
    requestAnimationFrame(() => {
      if (containerRef.current && editorRef.current) {
        if (!isFullscreen) {
          // 进入全屏
          containerRef.current.style.height = 'calc(100vh - 48px)';
        } else {
          // 退出全屏，恢复到基于内容的高度
          containerRef.current.style.height = `${calculateEditorHeight()}px`;
        }
        // 通知编辑器重新布局
        editorRef.current.layout();
      }
    });
  };

  // 监听 ESC 键退出全屏
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && isFullscreen) {
        handleFullscreen();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isFullscreen]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: isFullscreen ? '100vh' : 'auto', // 改为 auto
        position: isFullscreen ? 'fixed' : 'relative',
        top: isFullscreen ? 0 : 'auto',
        left: isFullscreen ? 0 : 'auto',
        zIndex: isFullscreen ? 1300 : 1,
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* 工具栏 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: isDarkTheme ? '#1e1e1e' : '#f3f3f3'
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: isDarkTheme ? '#fff' : '#000',
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <span style={{ 
            display: 'inline-block',
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#ff605c',
            marginRight: 4
          }}/>
          <span style={{ 
            display: 'inline-block',
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#ffbd44',
            marginRight: 4
          }}/>
          <span style={{ 
            display: 'inline-block',
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#00ca4e'
          }}/>
          {title || 'Source Code'}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title={isDarkTheme ? "Light Mode" : "Dark Mode"}>
            <IconButton 
              size="small" 
              onClick={handleThemeToggle}
              sx={{ color: isDarkTheme ? '#fff' : '#000' }}
            >
              {isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Copy Code">
            <IconButton 
              size="small" 
              onClick={handleCopy}
              sx={{ color: isDarkTheme ? '#fff' : '#000' }}
            >
              {copied ? <CheckIcon /> : <ContentCopyIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
            <IconButton 
              size="small" 
              onClick={handleFullscreen}
              sx={{ color: isDarkTheme ? '#fff' : '#000' }}
            >
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* 编辑器区域 */}
      <Box 
        ref={containerRef}
        sx={{ 
          flex: isFullscreen ? 1 : 'none',
          position: 'relative',
          height: `${calculateEditorHeight()}px`, // 初始高度
          transition: 'height 0.2s ease', // 添加平滑过渡
          '.monaco-editor': {
            '.margin': {
              backgroundColor: isDarkTheme ? '#1e1e1e' : '#f3f3f3'
            }
          }
        }}
      >
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue={code}
          onChange={onChange}
          onMount={handleEditorDidMount}
          theme={isDarkTheme ? "vs-dark" : "light"}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyond: false,
            automaticLayout: true,
            padding: { top: 10, bottom: 10 },
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
            },
            fontFamily: 'Fira Code, Consolas, monospace',
            fontLigatures: true,
            renderLineHighlight: 'all',
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: true,
            readOnly: true
          }}
        />
      </Box>
    </Box>
  );
}; 