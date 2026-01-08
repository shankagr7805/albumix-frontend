import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { fetchGetDataWithAuth } from 'client/client';
import { useNavigate, Link } from 'react-router-dom';

// 🎨 Softer color palette (dark-mode friendly)
const cardColors = [
  ['#ff6a88', '#ff99ac'],
  ['#ee0979', '#ff6a00'],
  ['#11998e', '#38ef7d'],
  ['#8e2de2', '#4a00e0'],
  ['#f7971e', '#ffd200'],
  ['#36d1dc', '#5b86e5'],
  ['#00c6ff', '#0072ff'],
  ['#fc4a1a', '#f7b733']
];

// 🔒 Deterministic color (same album → same color)
const getColorPair = (id) => {
  return cardColors[id % cardColors.length];
};

const AlbumDynamicGridPage = () => {
  const [dataArray, setDataArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('token');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    fetchGetDataWithAuth('/albums')
      .then((res) => setDataArray(res.data))
      .catch(() => navigate('/'));
  }, [navigate]);

  return (
    <Grid container spacing={3}>
      {dataArray.map((data) => {
        const [c1, c2] = getColorPair(data.id);

        return (
          <Grid item key={data.id} xs={12} sm={6} md={4} lg={3}>
            <Link to={`/album/show?id=${data.id}`} style={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  height: 220,
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'hidden',
                  color: '#fff',
                  background: `linear-gradient(135deg, ${c1}, ${c2})`,
                  boxShadow: (theme) => theme.customShadows.z8,
                  transition: 'all 0.25s ease',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.45))'
                  },
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: (theme) => theme.customShadows.z16
                  }
                }}
              >
                <CardContent
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 0.3 }}>
                    {data.name}
                  </Typography>

                  <Typography variant="body2" sx={{ opacity: 0.85, mt: 1 }}>
                    {data.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AlbumDynamicGridPage;
