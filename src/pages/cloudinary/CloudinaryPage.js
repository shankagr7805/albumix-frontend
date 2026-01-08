import { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import MainCard from 'components/MainCard';
import CloudinaryUpload from './CloudinaryUpload';
import CloudinaryDelete from './CloudinaryDelete';

const CloudinaryPage = () => {
  const [image, setImage] = useState(null);

  return (
    <MainCard title="Cloudinary Media">
      <Typography variant="subtitle2" color="text.secondary">
        Upload & manage photos securely using Cloudinary
      </Typography>

      <Divider sx={{ my: 2 }} />

      <CloudinaryUpload onUploadSuccess={setImage} />

      {image && (
        <Box sx={{ mt: 3 }}>
          <img src={image.secure_url} alt="uploaded" width={250} style={{ borderRadius: 8 }} />

          <Box sx={{ mt: 2 }}>
            <CloudinaryDelete publicId={image.public_id} onDelete={() => setImage(null)} />
          </Box>
        </Box>
      )}
    </MainCard>
  );
};

export default CloudinaryPage;
