import React from 'react';
import { 
  Drawer as MuiDrawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  Toolbar 
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Code as CodeIcon,
  Update as EffectIcon,
  Storage as StorageIcon,
  ReduceCapacity as ReducerIcon,
  Memory as RefIcon,
  Speed as MemoIcon,
  Share as ContextIcon,
  Functions as CallbackIcon
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

export const Drawer = ({ open }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <MuiDrawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          position: 'relative',
          whiteSpace: 'nowrap',
          width: drawerWidth,
          transition: theme => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          boxSizing: 'border-box',
          ...(!open && {
            overflowX: 'hidden',
            transition: theme => theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            width: 0,
          }),
          top: '64px',
          height: 'calc(100% - 64px)'
        },
      }}
    >
      <List>
        {menuItems.map((category, index) => (
          <React.Fragment key={category.category}>
            {index > 0 && <Divider />}
            {category.items.map((item) => (
              <ListItem
                button
                key={item.text}
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </React.Fragment>
        ))}
      </List>
    </MuiDrawer>
  );
}; 