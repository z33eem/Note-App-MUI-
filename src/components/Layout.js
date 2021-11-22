import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import {
  ListItemText,
  ListItemIcon,
  ListItem,
  IconButton,
  Typography,
  CssBaseline,
  List,
  Toolbar,
  Box,
} from '@mui/material/';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import {
  HomeOutlined,
  AddCircleOutlineOutlined,
  ChevronRight,
  ChevronLeft,
  Menu,
} from '@mui/icons-material';
import { teal } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DarkmodeBtn from './DarkmodeBtn';

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));
const Layout = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const customTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: teal,
    },
    typography: {
      fontFamily: 'Quicksand',
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
    shape: {
      borderRadius: 5,
    },
  });
  const menuItems = [
    {
      title: 'All Notes',
      icon: <HomeOutlined />,
      path: '/',
    },
    {
      title: 'Create New',
      icon: <AddCircleOutlineOutlined />,
      path: '/create',
    },
  ];
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position='fixed' open={open}>
            <Toolbar>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                edge='start'
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <Menu />
              </IconButton>
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{ flexGrow: 1 }}
              >
                Notes App
              </Typography>
              <DarkmodeBtn
                change={() => {
                  setDarkMode(!darkMode);
                }}
                state={darkMode}
              />
            </Toolbar>
          </AppBar>
          <Drawer variant='permanent' open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
            </DrawerHeader>
            <List>
              {menuItems.map(({ title, icon, path }) => (
                <ListItem
                  button
                  key={title}
                  onClick={() => {
                    history.push(path);
                  }}
                  style={location.pathname === path ? null : { opacity: 0.75 }}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={title} />
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            {children}
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
