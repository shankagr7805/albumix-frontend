import { useState } from 'react';
import { Button, Alert } from '@mui/material';
import { fetchDeleteDataWithAuth } from 'client/client';

const CloudinaryDelete = ({ publicId, onDelete }) => {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this image?');
    if (!confirm) return;

    try {
      await fetchDeleteDataWithAuth(`/cloudinary/delete?publicId=${publicId}`);
      setSuccess('🗑 Image deleted successfully');
      onDelete();
    } catch (err) {
      setError('❌ Delete failed');
    }
  };

  return (
    <>
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <Button variant="outlined" color="error" onClick={handleDelete} sx={{ mt: 1 }}>
        Delete Image
      </Button>
    </>
  );
};

export default CloudinaryDelete;
