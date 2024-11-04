import React from 'react';
import { Box, Typography } from '@mui/material';
import { FeaturedCharacters } from './FeaturedCharacters';

interface FooterProps {
  onViewCharacter: (id: number) => void;
}

export const Footer: React.FC<FooterProps> = ({ onViewCharacter }) => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: 'center',
        color: '#222222',
      }}
    >
      <FeaturedCharacters onViewCharacter={onViewCharacter} />
      <Box
        component="img"
        src="/logo.png"
        alt="Disney Logo"
        sx={{
          width: 80,
          height: 'auto',
          marginBottom: 1,
          marginBlockStart: 4,
        }}
      />
      <Typography variant="body2">
        For educational use only. All characters and content are the property of
        Disney. This test is for private use and development testing only and
        should not be distributed for public consumption.
      </Typography>
    </Box>
  );
};
