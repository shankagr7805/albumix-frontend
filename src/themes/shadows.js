import { alpha } from '@mui/material/styles';

// ==============================|| DEFAULT THEME - CUSTOM SHADOWS ||============================== //

const CustomShadows = (theme) => {
  const isDark = theme.palette.mode === 'dark';

  return {
    button: isDark
      ? '0 2px 6px rgba(0,0,0,0.6)'
      : '0 2px #0000000b',

    text: isDark
      ? '0 -1px 0 rgba(0,0,0,0.8)'
      : '0 -1px 0 rgb(0 0 0 / 12%)',

    // Card / Paper elevation
    z1: isDark
      ? '0px 2px 8px rgba(0,0,0,0.9)'
      : `0px 2px 8px ${alpha(theme.palette.grey[900], 0.15)}`,

    z8: isDark
      ? '0px 8px 24px rgba(0,0,0,0.8)'
      : '0px 8px 16px rgba(0,0,0,0.15)',

    z16: isDark
      ? '0px 16px 40px rgba(0,0,0,0.7)'
      : '0px 16px 32px rgba(0,0,0,0.2)'
  };
};

export default CustomShadows;