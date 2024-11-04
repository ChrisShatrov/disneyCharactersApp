import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  setSearchTerm: (value: string) => void;
  searchTerm?: string;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    setSearchTerm('');
    navigate('/');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box
      component="header"
      sx={{
        width: '100%',
        backgroundColor: '#fff',
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: '100%' }}
      >
        <Box
          component="img"
          src="/logo.png"
          alt="Disney Logo"
          onClick={handleLogoClick}
          sx={{
            width: 80,
            height: 'auto',
            flexShrink: 0,
            cursor: 'pointer',
          }}
        />

        <TextField
          variant="outlined"
          placeholder="Find a character..."
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            flexGrow: 1,
            flexBasis: '60%',
            marginX: 2,
            backgroundColor: '#F1F2F3',
            borderRadius: '25px',
            '& .MuiOutlinedInput-root': {
              paddingLeft: '8px',
              borderRadius: '25px',
              '& fieldset': {
                border: 'none',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: '#A7B6C5',
              opacity: 1,
            },
          }}
        />

        <IconButton edge="end" onClick={() => navigate('/profile')}>
          <Box
            component="img"
            src="/Avatar.png"
            alt="Disney Logo"
            sx={{
              width: 48,
              height: 'auto',
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};
