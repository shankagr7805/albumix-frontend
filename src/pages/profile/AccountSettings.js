import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import { fetchGetDataWithAuth, fetchDeleteDataWithAuth } from 'client/client';
import MainCard from 'components/MainCard';

const AccountSettings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔹 Load account details
  useEffect(() => {
    fetchGetDataWithAuth('/auth/profile')
      .then((res) => {
        setProfile(res.data);
      })
      .catch(() => {
        setError('Failed to load account details');
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔥 Delete account
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'This will permanently delete your account and all albums. Are you sure?'
    );

    if (!confirmed) return;

    try {
      await fetchDeleteDataWithAuth('/auth/profile/delete');
      sessionStorage.removeItem('token');
      window.location.href = '/login';
    } catch (err) {
      setError('Failed to delete account');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Typography align="center" color="error">
        Unable to load account
      </Typography>
    );
  }

  return (
    <MainCard sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Account Settings
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Manage your account information
          </Typography>

          <Divider sx={{ my: 2 }} />

          {error && <Alert severity="error">{error}</Alert>}

          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {profile.email}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                User ID
              </Typography>
              <Typography variant="body1">
                {profile.id}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Roles
              </Typography>
              <Typography variant="body1">
                {Array.isArray(profile.authorities)
                  ? profile.authorities.join(', ')
                  : profile.authorities}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </MainCard>
  );
};

export default AccountSettings;