// material-ui
import { createTheme } from '@mui/material/styles';

// third-party
import { presetPalettes } from '@ant-design/colors';

// project import
import ThemeOption from './theme';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (mode) => {
  const colors = presetPalettes;

  const greyPrimary = [
    '#ffffff',
    '#fafafa',
    '#f5f5f5',
    '#f0f0f0',
    '#d9d9d9',
    '#bfbfbf',
    '#8c8c8c',
    '#595959',
    '#262626',
    '#141414',
    '#000000'
  ];
  const greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];
  const greyConstant = ['#fafafb', '#e6ebf1'];

  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

  const paletteColor = ThemeOption(colors);

  return createTheme({
    palette: {
      mode,
      common: {
        black: '#000',
        white: '#fff'
      },
      ...paletteColor,
      text: {
        primary: mode === 'dark' ? '#e6edf3' : paletteColor.grey[700],
        secondary: mode === 'dark' ? '#9da7b3' : paletteColor.grey[500]
      },
      action: {
        disabled: paletteColor.grey[300]
      },
      divider: mode === 'dark' ? 'rgba(255,255,255,0.08)' : paletteColor.grey[200],
      background: {
        default: mode === 'dark' ? '#0f1214' : paletteColor.grey.A50,
        paper: mode === 'dark' ? '#161c24' : paletteColor.grey[0]
      }
    }
  });
};

export default Palette;
