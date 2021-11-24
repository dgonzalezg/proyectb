import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import {useNavigate} from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1, fontWeight: 'bold' }}>
      <AppBar position="static" className="AppBar" sx={{ bgcolor: '#08979d' }}>
        <Toolbar>
          <Button color="inherit" onClick={() => { navigate('/'); }}>DCCinema</Button>
        </Toolbar>
      </AppBar>
      </Box>
  )
}

export default Menu;