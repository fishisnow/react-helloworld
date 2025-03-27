import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  Grid,
  Divider,
  Link
} from '@mui/material';
import { CodeEditor } from './CodeEditor';
import { CodePreview } from './CodePreview';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

export const DemoPage = ({ title, whatIs, whenToUse, code }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'code'
  const bulletPoints = whenToUse.split('\n').map(item => 
    item.trim().replace('• ', '')
  ).filter(item => item);

  return (
    <Box 
      sx={{ 
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#FAFAFA',
      }}
    >
      {/* 头部区域 */}
      <Box 
        sx={{ 
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'white',
          px: 4,
          py: 4
        }}
      >
        {/* 标题和操作区 */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}
        >
          <Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                mb: 1,
                background: 'linear-gradient(120deg, #1976d2, #00a0b2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              {title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Chip 
                label="React Core" 
                size="small" 
                sx={{ 
                  bgcolor: '#E3F2FD',
                  color: '#1976d2',
                  fontWeight: 500
                }}
              />
              <Chip 
                label="Side Effects" 
                size="small"
                sx={{ 
                  bgcolor: '#E8F5E9',
                  color: '#2E7D32',
                  fontWeight: 500
                }}
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#666',
                  display: 'flex',
                  alignItems: 'center',
                  '&::before': {
                    content: '""',
                    width: 4,
                    height: 4,
                    bgcolor: '#666',
                    borderRadius: '50%',
                    mr: 1
                  }
                }}
              >
                最后更新: 2024.03
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="收藏">
              <IconButton size="small">
                <BookmarkBorderIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="分享">
              <IconButton size="small">
                <ShareIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="点赞">
              <IconButton size="small">
                <ThumbUpOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* 说明区域 */}
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                mb: 2,
                color: '#1976d2',
                display: 'flex',
                alignItems: 'center',
                '&::before': {
                  content: '""',
                  width: 3,
                  height: 20,
                  bgcolor: '#1976d2',
                  mr: 1.5,
                  borderRadius: 1
                }
              }}
            >
              What is it?
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#445',
                lineHeight: 1.8,
                fontSize: '1rem'
              }}
            >
              {whatIs}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                mb: 2,
                color: '#1976d2',
                display: 'flex',
                alignItems: 'center',
                '&::before': {
                  content: '""',
                  width: 3,
                  height: 20,
                  bgcolor: '#1976d2',
                  mr: 1.5,
                  borderRadius: 1
                }
              }}
            >
              When to use?
            </Typography>
            <List sx={{ p: 0 }}>
              {bulletPoints.map((point, index) => (
                <ListItem 
                  key={index} 
                  sx={{ 
                    py: 1,
                    px: 0,
                    color: '#445',
                    display: 'flex',
                    alignItems: 'flex-start',
                    '&::before': {
                      content: '""',
                      width: 6,
                      height: 6,
                      bgcolor: '#1976d2',
                      borderRadius: '50%',
                      mr: 2,
                      mt: 1.5
                    }
                  }}
                >
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    {point}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>

      {/* 代码和预览区域 */}
      <Box 
        sx={{ 
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          p: 4,
          gap: 3
        }}
      >
        {/* 切换标签 */}
        <Box 
          sx={{ 
            display: 'flex',
            gap: 2,
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}
        >
          {['preview', 'code'].map((tab) => (
            <Box
              key={tab}
              onClick={() => setActiveTab(tab)}
              sx={{
                px: 3,
                py: 1.5,
                cursor: 'pointer',
                position: 'relative',
                color: activeTab === tab ? '#1976d2' : '#666',
                fontWeight: activeTab === tab ? 600 : 400,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -1,
                  left: 0,
                  width: '100%',
                  height: 2,
                  bgcolor: activeTab === tab ? '#1976d2' : 'transparent',
                  borderRadius: '2px 2px 0 0'
                }
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Box>
          ))}
        </Box>

        {/* 内容区域 */}
        <Box 
          sx={{ 
            flex: 1,
            display: 'grid',
            gridTemplateColumns: activeTab === 'preview' ? '50fr 50fr' : '100fr',
            gap: 3,
            minHeight: 500,
            '& > *': {
              bgcolor: 'white',
              borderRadius: 2,
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              overflow: 'hidden'
            }
          }}
        >
          {activeTab === 'preview' ? (
            <>
              <CodeEditor code={code} />
              <CodePreview code={code} />
            </>
          ) : (
            <CodeEditor code={code} />
          )}
        </Box>
      </Box>

      {/* 页脚 */}
      <Box 
        component="footer" 
        sx={{ 
          mt: 'auto',
          pt: 3,
          pb: 4,
          bgcolor: 'white',
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box 
          sx={{ 
            px: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5
          }}
        >
          {/* 作者签名 */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'baseline',
            gap: 0.5,
            mb: 0.5
          }}>
            <Typography 
              sx={{ 
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.75rem',
                color: '#999',
              }}
            >
              Created with ❤️ by
            </Typography>
            <Typography 
              sx={{ 
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#666',
              }}
            >
              fishisnow & 太善
            </Typography>
          </Box>

          {/* 链接区域 */}
          <Box 
            sx={{ 
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              mb: 0.5
            }}
          >
            <Link
              href="https://github.com/your-repo"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: '#999',
                textDecoration: 'none',
                transition: 'color 0.2s',
                fontSize: '0.75rem',
                '&:hover': {
                  color: '#666'
                }
              }}
            >
              <GitHubIcon sx={{ fontSize: '0.9rem' }} />
              <Typography sx={{ fontSize: '0.75rem' }}>GitHub</Typography>
            </Link>

            <Link
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: '#999',
                textDecoration: 'none',
                transition: 'color 0.2s',
                fontSize: '0.75rem',
                '&:hover': {
                  color: '#666'
                }
              }}
            >
              <svg height="12" width="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <Typography sx={{ fontSize: '0.75rem' }}>React 官网</Typography>
            </Link>

            <Link
              href="mailto:fishisnow2021@gmail.com"
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: '#999',
                textDecoration: 'none',
                transition: 'color 0.2s',
                fontSize: '0.75rem',
                '&:hover': {
                  color: '#666'
                }
              }}
            >
              <EmailIcon sx={{ fontSize: '0.9rem' }} />
              <Typography sx={{ fontSize: '0.75rem' }}>联系我</Typography>
            </Link>
          </Box>

          {/* 版权信息 */}
          <Typography 
            sx={{ 
              color: '#999',
              textAlign: 'center',
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.75rem',
              mb: 0.5
            }}
          >
            © {new Date().getFullYear()} React Hooks Demo. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}; 