import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from '../MainCard';

// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbs = ({ navigation, title, ...others }) => {
  const theme = useTheme();
  const location = useLocation();
  const [main, setMain] = useState();
  const [item, setItem] = useState();

  // ✅ FIX: useCallback to stabilize function reference
  const getCollapse = useCallback(
    (menu) => {
      if (menu.children) {
        menu.children.forEach((collapse) => {
          if (collapse.type === 'collapse') {
            getCollapse(collapse);
          } else if (collapse.type === 'item' && location.pathname === collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        });
      }
    },
    [location.pathname]
  );

  // ✅ FIX: correct dependencies
  useEffect(() => {
    navigation?.items?.forEach((menu) => {
      if (menu.type === 'group') getCollapse(menu);
    });
  }, [navigation?.items, getCollapse]);

  if (!item || item.breadcrumbs === false) return null;

  return (
    <MainCard
      border={false}
      content={false}
      sx={{
        mb: 3,
        px: 3,
        py: 2.5,
        borderRadius: 2,
        bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
        boxShadow: theme.palette.mode === 'dark' ? '0 0 0 1px rgba(255,255,255,0.05)' : '0 0 0 1px rgba(0,0,0,0.05)'
      }}
      {...others}
    >
      <Grid container direction="column" spacing={1}>
        {/* BREADCRUMB */}
        <Grid item>
          <MuiBreadcrumbs aria-label="breadcrumb">
            <Typography component={Link} to="/" color="text.secondary" variant="subtitle2" sx={{ textDecoration: 'none' }}>
              Home
            </Typography>

            {main && main.title !== 'Home' && (
              <Typography component={Link} to={main.url || '#'} color="text.secondary" variant="subtitle2" sx={{ textDecoration: 'none' }}>
                {main.title}
              </Typography>
            )}

            <Typography variant="subtitle2" color="text.primary" fontWeight={600}>
              {item.title}
            </Typography>
          </MuiBreadcrumbs>
        </Grid>

        {/* PAGE TITLE */}
        {title && (
          <Grid item sx={{ mt: 1 }}>
            <Typography variant="h4" fontWeight={600}>
              {item.title}
            </Typography>
          </Grid>
        )}
      </Grid>
    </MainCard>
  );
};

Breadcrumbs.propTypes = {
  navigation: PropTypes.object,
  title: PropTypes.bool
};

export default Breadcrumbs;
