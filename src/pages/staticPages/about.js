import { Typography } from '@mui/material';

import MainCard from 'components/MainCard';

const About = () => {
  return (
    <MainCard>
      <Typography variant="h4" gutterBottom>
        About Albumix
      </Typography>

      <Typography variant="body1" paragraph>
        Albumix is a modern photo album management application that helps you securely store, organize, and manage your photo collections
        online.
      </Typography>

      <Typography variant="body1" paragraph>
        You can create albums, upload photos, generate thumbnails, and manage your content with a clean and intuitive interface.
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Version: 1.0.0
      </Typography>
    </MainCard>
  );
};

export default About;
