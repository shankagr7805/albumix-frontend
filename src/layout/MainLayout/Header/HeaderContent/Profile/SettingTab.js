import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import {
  CommentOutlined,
  LockOutlined,
  UserOutlined
} from '@ant-design/icons';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = () => {
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
      {/* ACCOUNT SETTINGS */}
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={() => handleNavigate(0, '/profile/settings')}
      >
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="Account Settings" />
      </ListItemButton>

      {/* PRIVACY CENTER (future page) */}
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={() => handleNavigate(1, '/profile/privacy')}
      >
        <ListItemIcon>
          <LockOutlined />
        </ListItemIcon>
        <ListItemText primary="Privacy Center" />
      </ListItemButton>

      {/* FEEDBACK (future page) */}
      <ListItemButton
        selected={selectedIndex === 2}
        onClick={() => handleNavigate(2, '/profile/feedback')}
      >
        <ListItemIcon>
          <CommentOutlined />
        </ListItemIcon>
        <ListItemText primary="Feedback" />
      </ListItemButton>
    </List>
  );
};

export default SettingTab;