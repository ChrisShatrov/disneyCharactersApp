import React, { useEffect, useState } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import { CharacterCard } from './CharacterCard';
import { fetchCharacters } from '../services/disneyApi';

interface FeaturedCharactersProps {
  onViewCharacter: (id: number) => void;
}

export const FeaturedCharacters: React.FC<FeaturedCharactersProps> = ({
  onViewCharacter,
}) => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharacters().then((data) => {
      const randomCharacters = data.data
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      setCharacters(randomCharacters);
      setLoading(false);
    });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#054553',
        paddingInline: 8,
        paddingBlock: 4,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" color="white" sx={{ marginBlockEnd: 4 }}>
        Featured Characters!
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={2}>
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Box
                key={index}
                width={{ xs: '100%', sm: '48%', md: '23%' }}
                height="416px"
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="60%"
                  sx={{ borderRadius: 2 }}
                />
                <Skeleton
                  variant="text"
                  width="80%"
                  sx={{ marginTop: 1 }}
                  height={32}
                />
                <Skeleton
                  variant="text"
                  width="80%"
                  sx={{ marginTop: 1 }}
                  height={32}
                />
              </Box>
            ))
          : characters?.map((character) => (
              <Box
                key={character._id}
                width={{ xs: '100%', sm: '48%', md: '23%' }}
              >
                <CharacterCard
                  characterData={character}
                  onViewCharacter={onViewCharacter}
                />
              </Box>
            ))}
      </Box>
    </Box>
  );
};
