import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, Divider, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Code as CodeIcon,
  Update as EffectIcon,
  Storage as StorageIcon,
  ReduceCapacity as ReducerIcon,
  Memory as RefIcon,
  Speed as MemoIcon,
  Share as ContextIcon,
  Functions as CallbackIcon,
  Menu as MenuIcon
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { 
    category: '基础 Hooks',
    items: [
      { text: 'useState 示例', icon: <StorageIcon />, path: '/usestate' },
      { text: 'useEffect 示例', icon: <EffectIcon />, path: '/useeffect' },
      { text: 'useContext 示例', icon: <ContextIcon />, path: '/usecontext' },
      { text: 'useReducer 示例', icon: <ReducerIcon />, path: '/usereducer' },
      { text: 'useRef 示例', icon: <RefIcon />, path: '/useref' },
      { text: 'useMemo 示例', icon: <MemoIcon />, path: '/usememo' },
      { text: 'useCallback 示例', icon: <CallbackIcon />, path: '/usecallback' },
      { text: 'useQuery 示例', icon: <StorageIcon />, path: '/usequery' }
    ]
  }
];

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            React 学习平台
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerOpen ? drawerWidth : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            transform: drawerOpen ? 'none' : 'translateX(-100%)',
            transition: 'transform 0.2s'
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          {menuItems.map((category) => (
            <React.Fragment key={category.category}>
              <Typography
                variant="subtitle2"
                sx={{ px: 2, py: 1, fontWeight: 'bold', color: 'text.secondary' }}
              >
                {category.category}
              </Typography>
              <List>
                {category.items.map((item) => (
                  <ListItem 
                    button 
                    key={item.text}
                    onClick={() => navigate(item.path)}
                    selected={location.pathname === item.path}
                  >
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
            </React.Fragment>
          ))}
        </Box>
      </Drawer>
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        transition: 'margin 0.2s',
        marginLeft: drawerOpen ? 0 : `-${drawerWidth}px`
      }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}; 