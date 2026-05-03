import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export function Quote() {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 8, minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 2 }}>
          Get Your Quote
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Select the type of insurance you need
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              onClick={() => navigate('/private-motor')}
              sx={{
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                height: '300px',
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'white',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                  bgcolor: '#c062c4',
                  color: 'white',
                  '& .MuiSvgIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <DirectionsCarIcon sx={{ fontSize: 80, color: '#c062c4', mb: 3 }} />
              <Typography variant="h4">
                Private Motor
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, opacity: 0.8 }}>
                Coverage for personal vehicles
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              onClick={() => navigate('/commercial-motor')}
              sx={{
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                height: '300px',
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'white',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                  bgcolor: '#c062c4',
                  color: 'white',
                  '& .MuiSvgIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <LocalShippingIcon sx={{ fontSize: 80, color: '#c062c4', mb: 3 }} />
              <Typography variant="h4">
                Commercial Motor
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, opacity: 0.8 }}>
                Coverage for business vehicles
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              onClick={() => navigate('/fire')}
              sx={{
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                height: '300px',
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'white',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                  bgcolor: '#c062c4',
                  color: 'white',
                  '& .MuiSvgIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <LocalFireDepartmentIcon sx={{ fontSize: 80, color: '#c062c4', mb: 3 }} />
              <Typography variant="h4">
                Fire
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, opacity: 0.8 }}>
                Fire protection coverage
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {/* Footer */}
            {/* <Box
              sx={{
                background: 'linear-gradient(10deg, #c062c4, #eef1f9)',
                p: 1.5,
                mt: 4,
                textAlign: 'center',
              }}
            >
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.3px',
                }}
              >
                © 2026 Vehicle Insurance - All Rights Reserved
              </Typography>
            </Box> */}
    </Box>
  );
}