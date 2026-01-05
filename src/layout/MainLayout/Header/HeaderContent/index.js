// material-ui
import { useMediaQuery, Box } from '@mui/material';

// project import
import MobileSection from './MobileSection';
import Profile from './Profile';
import DarkModeToggle from './DarkModeToggle';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%'
      }}
    >
      {/* Push actions to right */}
      <Box sx={{ flexGrow: 1 }} />

      {/* Dark mode toggle */}
      <Box sx={{ mx: 1 }}>
        <DarkModeToggle />
      </Box>

      {/* Profile / Mobile menu */}
      <Box sx={{ ml: 1 }}>
        {!matchesXs ? <Profile /> : <MobileSection />}
      </Box>
    </Box>
  );
};

export default HeaderContent;