// material-ui
import { useTheme } from '@mui/material/styles';

// project import
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => {
  const theme = useTheme();

  return (
    <SimpleBar
      sx={{
        height: '100%',
        backgroundColor: theme.palette.mode === 'dark' ? '#0b0f14' : theme.palette.background.paper,

        '& .simplebar-content': {
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }
      }}
    >
      <Navigation />
    </SimpleBar>
  );
};

export default DrawerContent;
