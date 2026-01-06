import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Tab,
  Tabs,
  Typography,
  Avatar
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import logout from 'pages/authentication/Logout';
import { fetchGetDataWithAuth } from 'client/client';

// assets
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

// tab panel
function TabPanel({ children, value, index }) {
  return value === index && <Box>{children}</Box>;
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
  value: PropTypes.number
};

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
  const theme = useTheme();
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [profile, setProfile] = useState(null);

  // fetch profile once
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) return; 
    fetchGetDataWithAuth('/auth/profile')
      .then((res) => setProfile(res.data))
      .catch(() => {
        sessionStorage.clear();
        window.location.href = '/login';
      });
  }, []);

  const handleToggle = () => setOpen((prev) => !prev);

  const handleClose = (event) => {
    if (anchorRef.current?.contains(event.target)) return;
    setOpen(false);
  };

  const email = profile?.email || 'User';

  return (
    <Box sx={{ flexShrink: 0 }}>
      {/* PROFILE BUTTON */}
      <ButtonBase
        ref={anchorRef}
        onClick={handleToggle}
        sx={{
          p: 0.5,
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            bgcolor:
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.08)'
                : 'action.hover'
          }
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: theme.palette.primary.main,
              fontSize: 14
            }}
          >
            {email.charAt(0).toUpperCase()}
          </Avatar>

          <Typography
            sx={{
              fontWeight: 600,
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.common.white
                  : theme.palette.text.primary
            }}
          >
            {email}
          </Typography>
        </Stack>
      </ButtonBase>

      {/* DROPDOWN */}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        disablePortal
        modifiers={[{ name: 'offset', options: { offset: [0, 10] } }]}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                width: 280,
                boxShadow: theme.customShadows.z1,
                bgcolor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.grey[900]
                    : theme.palette.background.paper
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false} content={false}>
                  <CardContent sx={{ pb: 1 }}>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          {email.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="h6">{email}</Typography>
                      </Stack>

                      <IconButton onClick={logout} color="secondary">
                        <LogoutOutlined />
                      </IconButton>
                    </Grid>
                  </CardContent>

                  <Tabs
                    value={value}
                    onChange={(e, v) => setValue(v)}
                    variant="fullWidth"
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                  >
                    <Tab
                      icon={<UserOutlined />}
                      iconPosition="start"
                      label="Profile"
                      sx={{ textTransform: 'capitalize' }}
                    />
                    <Tab
                      icon={<SettingOutlined />}
                      iconPosition="start"
                      label="Setting"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Tabs>

                  <Box sx={{ p: 2 }}>
                    <TabPanel value={value} index={0}>
                      <ProfileTab handleLogout={logout} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <SettingTab />
                    </TabPanel>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;