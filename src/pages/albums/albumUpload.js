import React, { useState } from 'react';
import Header from './album/header';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Tooltip,
  IconButton,
  CircularProgress
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AddCircleOutline, Close } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useLocation, useNavigate } from 'react-router-dom';
import {fetchPostFileUploadWithAuth} from 'client/client'


const useStyles = makeStyles((theme) => ({
  dropzoneContainer: {
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    textAlign: 'center',
    cursor: 'pointer',
  },
  uploadedFile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: theme.spacing(1),
  },
}));

const FileUploadPage = () => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const navigate = useNavigate();
  const [processing, SetProcessing] = useState(false)
  
  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    try {
        SetProcessing(true)
        const formData = new FormData();
        files.forEach((file) => {
          formData.append('files', file);
        });

        fetchPostFileUploadWithAuth('/albums/'+id+'/upload-photos', formData)
        .then(
          res => {
            console.log(res.data)
            navigate('/album/show?id='+id)
          }
        );
      
      setFiles([])
      
    } catch (error) {
      console.error('Error uploading files:', error.message);
    }
  };
  

  return (
    <div>
    <Header />
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Photo Upload
            </Typography>
          </Grid>
          <Grid item xs={12} {...getRootProps()}>
            <input {...getInputProps()} />
            <Paper elevation={3} className={classes.dropzoneContainer}>
              <AddCircleOutline fontSize="large" color="primary" />
              <Typography variant="h6">
                Drag and drop photos or click to select files
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Box>
              {files.map((file, index) => (
                <Paper
                  key={index}
                  elevation={3}
                  className={classes.uploadedFile}
                >
                  <Typography>{file.name}</Typography>
                  <IconButton
                    onClick={() => removeFile(index)}
                    color="secondary"
                  >
                    <Close />
                  </IconButton>
                </Paper>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            {processing ? (
              <Box textAlign="center">
                <CircularProgress />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  marginTop="10px"
                >
                  Uploading...
                </Typography>
              </Box>
            ) : (
              <Tooltip
                title={files.length === 0 ? 'Select at least one photo to upload' : ''}
                arrow
              >
                <span style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%'
                }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: files.length === 0 ? 'grey.600' : 'success.main',
                      color: '#fff',
                      '&:hover': {
                        bgcolor: files.length === 0 ? 'grey.600' : 'success.dark'
                      }
                    }}
                    onClick={handleUpload}
                    disabled={files.length === 0}
                  >
                    Upload Photos
                  </Button>
                </span>
              </Tooltip>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
    </div>
  );
};

export default FileUploadPage;