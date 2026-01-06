import React, { useState, useEffect } from 'react';
import {Card, CardContent, CardMedia, Grid, Typography, Tooltip} from '@mui/material';
import { fetchGetDataWithAuth, fetchDeleteDataWithAuth } from 'client/client';
import { useLocation } from 'react-router-dom';
import { Stack, IconButton } from '@mui/material';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import DownloadOutlined from '@mui/icons-material/DownloadOutlined';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';

const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]);         //& State to store fetched photos
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const album_id = queryParams.get('id');           //& Extract album ID from URL query parameters
  const [albumInfo, setAlbumInfo] = useState({});

  const handleDelete = (photo_id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete the photo ?");
    if(isConfirmed) {
      console.log('Item deleted! '+ photo_id);
      fetchDeleteDataWithAuth("/albums/"+album_id+"/photo/"+photo_id+"/delete")
      .then(res => {
        console.log(res);
        setPhotos(prev => prev.filter(p => p.id !== photo_id));
      })
    } else {
      console.log('Delete operation cancelled');
      
    }
  };

  useEffect(() => {
    fetchGetDataWithAuth('/albums/' + album_id).then(res => {
      setAlbumInfo(res.data);
      setPhotos(res.data.photos); // direct photos array
    });
  }, [album_id]);    //* Dependency array ensures useEffect runs when album_id changes
  return (
    <div>
      <Typography variant="h4" gutterBottom> {albumInfo.name} </Typography>
      <Typography variant="subtitle1" gutterBottom> {albumInfo.description} </Typography>
      <Grid container spacing={2}>
        {photos.map(photo => (
          <Grid item key={photo.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                transition: 'all 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: 6
                }
              }}
            >
              <Tooltip title={photo.description || photo.name}>
                <CardMedia
                  component="img"
                  height="200"
                  image={photo.cloudinaryThumbnailUrl}
                  alt={photo.name}
                />
              </Tooltip>

              <CardContent>
                <Typography variant="subtitle1">
                  {photo.name}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  {/* VIEW */}
                  <Tooltip title="View">
                    <IconButton
                      size="small"
                      onClick={() =>
                        window.open(
                          `/api/v2/albums/${album_id}/photos/${photo.id}/download-photo`,
                          '_blank'
                        )
                      }
                    >
                      <VisibilityOutlined fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  {/* DOWNLOAD */}
                  <Tooltip title="Download">
                    <IconButton
                      size="small"
                      onClick={() =>
                        window.location.href =
                          `/api/v2/albums/${album_id}/photos/${photo.id}/download-photo`
                      }
                    >
                      <DownloadOutlined fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  {/* DELETE */}
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(photo.id)}
                    >
                      <DeleteOutlineOutlined fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PhotoGrid;