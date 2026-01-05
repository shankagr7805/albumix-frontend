import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Alert
} from '@mui/material';

const Feedback = () => {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');

    if (!message || message.length < 10) {
      setError('Feedback must be at least 10 characters');
      return;
    }

    // 🔹 Future: API call here
    // fetchPostDataWithAuth('/feedback', { message })

    setSubmitted(true);
    setMessage('');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Feedback
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Help us improve Albumix by sharing your thoughts
          </Typography>

          <Stack spacing={2} mt={2}>
            {submitted && (
              <Alert severity="success">
                Thank you for your feedback!
              </Alert>
            )}

            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Your feedback"
              placeholder="Tell us what you like, what can be improved, or report an issue"
              multiline
              rows={4}
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit Feedback
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Feedback;