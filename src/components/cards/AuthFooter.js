// material-ui
import { useMediaQuery, Container, Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="xl">
      <Stack
        direction={matchDownSM ? 'column' : 'row'}
        justifyContent={matchDownSM ? 'center' : 'space-between'}
        spacing={2}
        textAlign={matchDownSM ? 'center' : 'inherit'}
      >
        {/* LEFT */}
        <Typography variant="subtitle2" color="text.secondary">
          © {new Date().getFullYear()}&nbsp;
          <Typography
            component="span"
            variant="subtitle2"
            sx={{ fontWeight: 600, color: 'text.primary' }}
          >
            Albumix
          </Typography>
        </Typography>

        {/* RIGHT */}
        <Stack
          direction={matchDownSM ? 'column' : 'row'}
          spacing={matchDownSM ? 1 : 3}
          textAlign={matchDownSM ? 'center' : 'inherit'}
        >
          <Typography
            variant="subtitle2"
            component={Link}
            href="/about"
            underline="hover"
            color="text.secondary"
          >
            About
          </Typography>

          <Typography
            variant="subtitle2"
            component={Link}
            href="/privacy"
            underline="hover"
            color="text.secondary"
          >
            Privacy Policy
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default AuthFooter;