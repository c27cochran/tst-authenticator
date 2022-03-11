import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Alert, AlertTitle, styled, useTheme } from '@mui/material';

// -----------------------------

const StyledTextField = styled(TextField)({
  '& .MuiFilledInput-root': {
    backgroundColor: 'rgba(255,255,255,0.85)'
  },
  '& .MuiFilledInput-root.Mui-focused': {
    backgroundColor: '#fff'
  },
  '& .MuiFilledInput-root.Mui-error': {
    color: 'red'
  }
});

export default function App() {
  const theme = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const passwordMatch = password === confirmPassword && password.length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1539201299177-2af0fae3d77f)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%'
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        {/* vertically align div */}
        <Box
          sx={{
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          <Box component="img" src="/static/logo.png" sx={{ mb: 3, maxWidth: '17%' }} />
          <Typography component="h1" variant="h5" fontWeight="bold" sx={{ color: theme.palette.common.white }}>
            Sign in...Take off
          </Typography>
          {submitted && !passwordMatch && (
            <Alert severity="error" sx={{ mt: 1 }}>
              <AlertTitle>Couldn't Sign In</AlertTitle>
              Passwords do not match.
            </Alert>
          )}
          {submitted && passwordMatch && (
            <Alert severity="success" sx={{ mt: 1 }}>
              <AlertTitle>Well Done!</AlertTitle>
              You typed the same thing twice 😁
            </Alert>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <StyledTextField
              required
              margin="dense"
              variant="filled"
              size="small"
              color="secondary"
              fullWidth
              label="Username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <StyledTextField
              required
              margin="dense"
              variant="filled"
              size="small"
              color="secondary"
              error={submitted && !passwordMatch}
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <StyledTextField
              required
              margin="dense"
              variant="filled"
              size="small"
              color={submitted && !passwordMatch ? 'error' : 'secondary'}
              error={submitted && !passwordMatch}
              fullWidth
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
              disabled={password === '' || confirmPassword === '' || username === ''}
              sx={{ mt: 3, mb: 2, color: theme.palette.common.white }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
