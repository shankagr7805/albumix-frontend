import { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchGetDataWithAuth, fetchPutDataWithAuth} from 'client/client';
import MainCard from 'components/MainCard';

const EditProfile = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // 🔹 Load profile (email only)
  useEffect(() => {
    fetchGetDataWithAuth('/auth/profile')
      .then((res) => {
        setEmail(res.data.email);
      })
      .catch(() => {
        setError('Failed to load profile');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    setError('');

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setSaving(true);
      await fetchPutDataWithAuth('/auth/profile/update-password', {
        password
      });

      // redirect to view profile
      navigate('/profile/view');
    } catch (err) {
      setError('Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <MainCard sx={{ maxWidth: 420, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Edit Profile
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        Update your account details
      </Typography>

      <Stack spacing={2} mt={2}>
        {error && <Alert severity="error">{error}</Alert>}

        {/* EMAIL (READ ONLY) */}
        <TextField
          label="Email"
          value={email}
          fullWidth
          disabled
        />

        {/* PASSWORD */}
        <TextField
          label="New Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText="Minimum 6 characters"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={saving}
          sx={{ mt: 1 }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </Stack>
    </MainCard>
  );
};

export default EditProfile;