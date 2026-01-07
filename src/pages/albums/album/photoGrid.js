import React, { useState, useEffect } from 'react';
import {Paper, Card, CardContent, CardMedia, Grid, Typography, Tooltip} from '@mui/material';
import { fetchGetDataWithAuth, fetchDeleteDataWithAuth,  fetchGetBlobDataWithAuth } from 'client/client';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Stack, IconButton } from '@mui/material';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import DownloadOutlined from '@mui/icons-material/DownloadOutlined';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMain: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: '90%',
    maxWidth: '90%',
    overflow: 'auto',
  },
  closeButton: {
    marginLeft: 'auto',
  },
}));

const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]);         //& State to store fetched photos
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const album_id = queryParams.get('id');           //& Extract album ID from URL query parameters
  const [albumInfo, setAlbumInfo] = useState({});
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [PhotoContent, setPhotoContent] = useState(null); 
  const [PhotoDesc, setPhotoDesc] = useState(null); 
  const [DownloadLink, setDownloadLink] = useState(null); 
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleView = (download_link, description) => {
    setDownloadLink(download_link);
    setPhotoDesc(description);
    setPhotoContent(download_link); // direct backend url
    handleOpen();
  };

  const handleDownload = (download_link) => { 
    console.log(download_link)
    fetchGetBlobDataWithAuth(download_link).then(
      response => {
        console.log(response);
        const disposition = response.headers.get('Content-Disposition');
        const match = /filename="(.*)"/.exec(disposition);
        const filename = match ? match[1] : 'downloadFile';
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      }).catch(error => {
        console.error('Error downloading photo: ', error);
      })
  };

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
    fetchGetDataWithAuth('/albums/' + album_id).then(res => {                           //& Fetch album data when component mounts or album_id changes
      setAlbumInfo(res.data);
      setPhotos(res.data.photos);   // 👈 Cloudinary URLs already included
    });
  }, [album_id]);     //* Dependency array ensures useEffect runs when album_id changes

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modal}>    
        <div className={classes.modalMain}>
          <img
            src={PhotoContent}
            alt={PhotoDesc}
            style={{ width: '100%', height: 'auto' }}
          />
          <Paper
            variant="outlined"
            sx={{
              mt: 2,
              p: 2,
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
              borderRadius: 2
            }}
          >
            <Button
              variant="contained"
              onClick={() => handleDownload(DownloadLink)}
            >
              Download Photo
            </Button>

            <Button
              variant="outlined"
              onClick={handleClose}
            >
              Close
            </Button>
          </Paper>
        </div>
      </Modal>
      <Typography variant="h4" gutterBottom> {albumInfo.name} </Typography>
      <Typography variant="subtitle1" gutterBottom> {albumInfo.description} </Typography>
      <Grid container spacing={2}>
        {/* Render each photo */}
        {photos.map(photo => (
          <Grid item key={photo.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{
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
              <Tooltip title={photo.description}>
              <Typography variant="subtitle1">{photo.name}</Typography>
              </Tooltip>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Tooltip title="View">
                  <IconButton
                    size="small"
                    sx={{
                      color: 'primary.main',
                      bgcolor: 'action.hover'
                    }}
                    onClick={() =>
                      handleView(
                        `/api/v2/albums/${album_id}/photos/${photo.id}/download-photo`,
                        photo.description
                      )
                    }
                  >
                    <VisibilityOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Edit">
                  <IconButton
                    size="small"
                    sx={{
                      color: 'warning.main',
                      bgcolor: 'action.hover'
                    }}
                    component="a"
                    href={`/photo/edit?album_id=${album_id}&photo_id=${photo.id}&photo_name=${photo.name}&photo_desc=${photo.description}`}
                  >
                    <EditOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Download">
                  <IconButton
                    size="small"
                    sx={{
                      color: 'success.main',
                      bgcolor: 'action.hover'
                    }}
                    onClick={() =>
                      window.location.href =
                        `/api/v2/albums/${album_id}/photos/${photo.id}/download-photo`
                    }
                  >
                    <DownloadOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    sx={{
                      color: 'error.main',
                      bgcolor: 'action.hover',
                      '&:hover': {
                        bgcolor: 'error.light',
                        color: 'common.white'
                      }
                    }}
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
