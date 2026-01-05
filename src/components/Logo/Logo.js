import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import logo from 'assets/images/logo.png';

const Logo = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.2
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="Albumix"
        sx={{
          height: 32,
          width: 'auto',
          filter: theme.palette.mode === 'dark'
            ? 'brightness(1.15)'
            : 'none'
        }}
      />

      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          letterSpacing: 0.5,
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          lineHeight: 1
        }}
      >
        Albumix
      </Typography>
    </Box>
  );
};

export default Logo;