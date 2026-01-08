// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SamplePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedin = sessionStorage.getItem('token');
    if (!isLoggedin) {
      navigate('/login');
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainCard title="Albums">
      <Typography variant="body2">Albums</Typography>
    </MainCard>
  );
};

export default SamplePage;
