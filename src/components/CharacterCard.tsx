import React from 'react';
import { Card, Box, CardContent, Typography, Link } from '@mui/material';

export interface CharacterData {
  _id: number;
  films: string[];
  name: string;
  imageUrl: string;
  url: string;
}

interface CharacterCardProps {
  characterData: CharacterData;
  onViewCharacter: (id: number) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  characterData,
  onViewCharacter,
}) => {
  const handleViewProfile = () => {
    onViewCharacter(characterData._id);
  };

  return (
    <Card
      onClick={handleViewProfile}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: { xs: 'auto', sm: '460px' },
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '180px', sm: '60%' },
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={characterData.imageUrl}
          alt={`${characterData.name} image`}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      <CardContent
        sx={{
          padding: { xs: 1, sm: 2 },
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            height: '3.6em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: '#222222',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              fontWeight: '600',
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            {characterData.name}
          </Typography>
        </Box>

        <Box mt={1} mb={1} sx={{ height: '3em', overflow: 'hidden' }}>
          <Typography
            sx={{ color: '#222222', fontWeight: '600', marginBottom: '0.3em' }}
          >
            Featured Films
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#222222',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: { xs: 1, sm: 2 },
            }}
          >
            {characterData.films.join(', ')}
          </Typography>
        </Box>

        <Link
          onClick={(e) => {
            e.stopPropagation();
            handleViewProfile();
          }}
          underline="hover"
          sx={{
            color: '#222222',
            fontWeight: 'bold',
            fontSize: '0.875rem',
            textDecoration: 'underline',
            marginTop: 2,
            cursor: 'pointer',
          }}
        >
          VIEW PROFILE
        </Link>
      </CardContent>
    </Card>
  );
};
