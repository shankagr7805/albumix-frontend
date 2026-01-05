import { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardActions,
  Button,
} from '@mui/material';
import {
  fetchGetDataWithAuth,
  fetchDeleteDataWithAuth
} from 'client/client';

const CloudinaryGallery = () => {
  const [images, setImages] = useState([]);

  const loadImages = async () => {
    const res = await fetchGetDataWithAuth('/cloudinary/list');
    setImages(res.data);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleDelete = async (publicId) => {
    await fetchDeleteDataWithAuth(
      `/cloudinary/delete?publicId=${publicId}`
    );
    loadImages(); // refresh gallery
  };

  return (
    <>
      <Grid container spacing={2}>
        {images.map((img) => (
          <Grid item xs={12} sm={6} md={4} key={img.public_id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={img.secure_url}
              />
              <CardActions>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => handleDelete(img.public_id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CloudinaryGallery;