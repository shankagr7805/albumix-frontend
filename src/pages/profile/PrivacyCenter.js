import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
  Alert
} from '@mui/material';

const PrivacyCenter = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Privacy Center
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Learn how your data is handled and protected
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={3}>
            {/* DATA COLLECTION */}
            <Box>
              <Typography variant="h6" gutterBottom>
                What data we collect
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We only collect the minimum data required to operate the application:
              </Typography>
              <ul>
                <li>Email address (for authentication)</li>
                <li>Your albums and uploaded photos</li>
                <li>Basic account metadata (ID, roles)</li>
              </ul>
            </Box>

            {/* DATA USAGE */}
            <Box>
              <Typography variant="h6" gutterBottom>
                How your data is used
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your data is used only to:
              </Typography>
              <ul>
                <li>Authenticate your account</li>
                <li>Store and manage your albums and photos</li>
                <li>Ensure security and access control</li>
              </ul>
            </Box>

            {/* DATA SECURITY */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Data security
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We take security seriously:
              </Typography>
              <ul>
                <li>Passwords are never stored in plain text</li>
                <li>All API access is token protected</li>
                <li>Users can only access their own data</li>
              </ul>
            </Box>

            {/* USER CONTROL */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Your control
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You are always in control of your data:
              </Typography>
              <ul>
                <li>You can update your password anytime</li>
                <li>You can delete your account permanently</li>
                <li>Deleting your account removes all albums and photos</li>
              </ul>
            </Box>

            <Alert severity="info">
              This application does not share your data with any third-party services.
            </Alert>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PrivacyCenter;