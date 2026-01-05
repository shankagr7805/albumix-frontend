import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { EditOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleNavigate = (index, path) => {
    setSelectedIndex(index);
    navigate(path);
  };

  return (
    <List
      component="nav"
      sx={{
        p: 0,
        '& .MuiListItemIcon-root': {
          minWidth: 32,
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[400]
              : theme.palette.grey[600]
        }
      }}
    >
      {/* EDIT PROFILE */}
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={() => handleNavigate(0, '/profile/edit')}
      >
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItemButton>

      {/* VIEW PROFILE */}
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={() => handleNavigate(1, '/profile/view')}
      >
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>

      {/* LOGOUT */}
      <ListItemButton
        selected={false}
        onClick={handleLogout}
        sx={{
          color: theme.palette.error.main,
          '& .MuiListItemIcon-root': {
            color: theme.palette.error.main
          }
        }}
      >
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func.isRequired
};

export default ProfileTab;