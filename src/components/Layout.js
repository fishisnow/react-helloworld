import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const drawerWidth = 240;

export const Layout = ({ drawer, main }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: '100%'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => setDrawerOpen(!drawerOpen)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            React Hooks 示例
          </Typography>
        </Toolbar>
      </AppBar>

      {React.cloneElement(drawer, { 
        open: drawerOpen,
        variant: "persistent"
      })}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)`,
          marginLeft: 0,
          transition: theme => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          height: '100%',
          overflow: 'auto',
          pt: '64px', // AppBar 的高度
          px: 2      // 左右padding改小
        }}
      >
        {main}
      </Box>
    </Box>
  );
}; 