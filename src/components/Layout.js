import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Memory as MemoryIcon,
  Code as CodeIcon,
  Layers as LayersIcon,
  DataObject as DataObjectIcon,
  Storage as StorageIcon
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Ref 示例', icon: <MemoryIcon />, path: '/ref' },
  { text: 'Memo 示例', icon: <CodeIcon />, path: '/memo' },
  { text: 'Context 示例', icon: <LayersIcon />, path: '/context' },
  { text: '状态管理', icon: <DataObjectIcon />, path: '/state' },
  { text: '数据请求', icon: <StorageIcon />, path: '/query' },
];

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            React 学习平台
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
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
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}; 