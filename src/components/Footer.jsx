import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100]
      }}
    >
      <Divider sx={{ mb: 3 }} />
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} TaskMaster. Todos los derechos reservados.
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mt: { xs: 2, sm: 0 } 
          }}>
            <Link href="#" color="inherit">
              <GitHubIcon fontSize="small" />
            </Link>
            <Link href="#" color="inherit">
              <LinkedInIcon fontSize="small" />
            </Link>
            <Link href="#" color="inherit">
              <TwitterIcon fontSize="small" />
            </Link>
          </Box>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 2,
          gap: { xs: 2, sm: 3 },
          flexWrap: 'wrap'
        }}>
          <Link href="#" underline="hover" color="text.secondary" sx={{ fontSize: 14 }}>
            Términos de Servicio
          </Link>
          <Link href="#" underline="hover" color="text.secondary" sx={{ fontSize: 14 }}>
            Política de Privacidad
          </Link>
          <Link href="#" underline="hover" color="text.secondary" sx={{ fontSize: 14 }}>
            Contacto
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;