import { useState } from 'react';
import { fetchPostFileUploadWithAuth } from 'client/client';
import { Box, Button, Typography, Card, CardContent, Stack, Alert, LinearProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const CloudinaryUpload = () => {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFiles = [...e.target.files];

    // 🔐 File size validation
    for (let file of selectedFiles) {
      if (file.size > MAX_FILE_SIZE) {
        setError(`"${file.name}" exceeds 10MB limit`);
        return;
      }
    }

    setFiles(selectedFiles);
    setPreview(selectedFiles.map((file) => URL.createObjectURL(file)));
    setError('');
    setSuccess('');
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select at least one image');
      return;
    }

    try {
      setUploading(true);
      setProgress(0);
      setError('');
      setSuccess('');

      const token = sessionStorage.getItem('token');

      for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);

      await fetchPostFileUploadWithAuth('/cloudinary/upload', formData, token, 
        (event) => {
          if (!event.total) return;

          const percent = Math.round(
            ((i + event.loaded / event.total) / files.length) * 100
          );
          setProgress(percent);
        }
      );
}

      setSuccess('Images uploaded successfully 🎉');

      // 🚀 Auto redirect after 1.5s
      setTimeout(() => {
        navigate('/cloudinary/gallery');
      }, 1500);

      setFiles([]);
      setPreview([]);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Stack spacing={3} alignItems="center">
          <CloudUploadIcon sx={{ fontSize: 50, color: 'primary.main' }} />

          <Typography variant="h5" fontWeight={600}>
            Upload Images
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Max size 10MB per image
          </Typography>

          {/* Upload Box */}
          <Box
            sx={{
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 2,
              p: 3,
              width: '100%',
              textAlign: 'center'
            }}
          >
            <input type="file" accept="image/*" multiple hidden id="upload-input" onChange={handleFileChange} />
            <label htmlFor="upload-input">
              <Button variant="outlined" component="span">
                Choose Images
              </Button>
            </label>
          </Box>

          {/* Preview */}
          {preview.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {preview.map((src, idx) => (
                <Box
                  key={idx}
                  component="img"
                  src={src}
                  sx={{
                    width: 90,
                    height: 90,
                    objectFit: 'cover',
                    borderRadius: 1,
                    border: '1px solid #333'
                  }}
                />
              ))}
            </Box>
          )}

          {/* Progress */}
          {uploading && (
            <Box sx={{ width: '100%' }}>
              <LinearProgress variant="determinate" value={progress} />
              <Typography variant="caption" align="center" display="block">
                Uploading {progress}%
              </Typography>
            </Box>
          )}

          {/* Alerts */}
          {success && (
            <Alert icon={<CheckCircleIcon />} severity="success">
              {success}
            </Alert>
          )}
          {error && (
            <Alert icon={<ErrorIcon />} severity="error">
              {error}
            </Alert>
          )}

          <Button variant="contained" fullWidth size="large" disabled={uploading} onClick={handleUpload}>
            {uploading ? 'Uploading...' : 'Upload Images'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CloudinaryUpload;
