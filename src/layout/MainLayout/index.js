import { useEffect, useState, } from 'react';
import { Outlet, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';
// project import
import Drawer from './Drawer';
import Header from './Header';
import navigation from 'menu-items';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

// redux
import { openDrawer } from 'store/reducers/menu';

const MainLayout = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const dispatch = useDispatch();
  const location = useLocation();
  const hideBreadcrumbRoutes = [
    '/profile/edit',
    '/profile/view',
    '/profile/settings',
    '/profile/feedback'
  ];

  const showBreadcrumb = !hideBreadcrumbRoutes.includes(location.pathname);

  const { drawerOpen } = useSelector((state) => state.menu);

  const [open, setOpen] = useState(drawerOpen);

  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(openDrawer({ drawerOpen: !matchDownLG }));
    // eslint-disable-next-line
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line
  }, [drawerOpen]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />

      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />

        {/* ✅ Breadcrumb only when allowed */}
        {showBreadcrumb && <Breadcrumbs navigation={navigation} title />}

        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;