import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { setDarkMode } from 'store/reducers/actions';

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleToggle = () => {
    dispatch(setDarkMode(!isDarkMode));
  };

  return (
    <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
      <IconButton
        onClick={handleToggle}
        sx={{
          color: isDarkMode ? theme.palette.warning.light : theme.palette.grey[600],
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'grey.100',
          '&:hover': {
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.16)' : 'grey.200'
          }
        }}
      >
        {isDarkMode ? <BulbFilled /> : <BulbOutlined />}
      </IconButton>
    </Tooltip>
  );
};

export default DarkModeToggle;
