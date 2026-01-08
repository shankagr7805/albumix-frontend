import { useEffect, useState } from 'react';
import { Avatar, Box, Card, CardContent, Chip, CircularProgress, Divider, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { fetchGetDataWithAuth } from 'client/client';
import MainCard from 'components/MainCard';

const ProfileView = () => {
  const theme = useTheme();

  const [profile, setProfile] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchGetDataWithAuth('/auth/profile'), fetchGetDataWithAuth('/albums')])
      .then(([profileRes, albumsRes]) => {
        setProfile(profileRes.data);
        setAlbums(albumsRes.data || []);
      })
      .catch((err) => {
        console.error('Profile load error:', err);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- LOADER ----------
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  // ---------- ERROR ----------
  if (!profile) {
    return (
      <Typography align="center" color="error" sx={{ mt: 4 }}>
        Failed to load profile
      </Typography>
    );
  }

  // ---------- SAFE AUTHORITIES ----------
  const authorities = Array.isArray(profile.authorities) ? profile.authorities : profile.authorities ? [profile.authorities] : [];

  const albumsCount = albums.length;
  const photosCount = albums.reduce((total, album) => total + (album.photos?.length || 0), 0);

  return (
    <MainCard sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Grid container spacing={3}>
        {/* LEFT – USER INFO */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack spacing={2} alignItems="center">
                <Avatar
                  sx={{
                    width: 90,
                    height: 90,
                    bgcolor: theme.palette.primary.main,
                    fontSize: 34
                  }}
                >
                  {profile.email?.charAt(0).toUpperCase()}
                </Avatar>

                <Typography variant="h6" fontWeight={600}>
                  {profile.email}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  User ID: {profile.id}
                </Typography>

                <Divider flexItem />

                <Typography variant="subtitle2">Roles</Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
                  {authorities.length > 0 ? (
                    authorities.map((role, index) => (
                      <Chip key={index} label={role.name || role} size="small" color="info" variant="outlined" />
                    ))
                  ) : (
                    <Typography variant="caption" color="text.secondary">
                      No roles assigned
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT – STATS */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Overview
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Card
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100]
                    }}
                  >
                    <Typography variant="h4" fontWeight={600}>
                      {albumsCount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Albums
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100]
                    }}
                  >
                    <Typography variant="h4" fontWeight={600}>
                      {photosCount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Photos
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ProfileView;
