import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Skeleton } from '@mui/material';
import { fetchCharacterById } from '../services/disneyApi';
import { formatDate } from '../utils/formatDate';

export interface CharacterDetailsData {
  _id: number;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  parkAttractions: string[];
  allies: string[];
  enemies: string[];
  name: string;
  imageUrl: string;
  url: string;
  updatedAt: Date;
}

interface CharacterDetailsProps {
  setSearchTerm: (value: string) => void;
}

export const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  setSearchTerm,
}) => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<CharacterDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getCharacterDetails = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchCharacterById(Number(id));
        setCharacter(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    setSearchTerm('');
    getCharacterDetails();
  }, [id, setSearchTerm]);

  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: '#F1F2F3',
          marginBlockStart: 2,
          paddingInline: 6,
          paddingBlock: 8,
        }}
      >
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="320px"
            sx={{ flexBasis: { xs: '100%', md: '40%' }, borderRadius: 2 }}
          />
          <Box
            flexBasis={{ xs: '100%', md: '60%' }}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Skeleton variant="text" height={40} width="80%" />
            <Skeleton variant="text" height={20} width="50%" />
            <Skeleton variant="rectangular" height={100} />
            <Skeleton variant="rectangular" height={100} />
          </Box>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          backgroundColor: '#F1F2F3',
          marginBlockStart: 2,
          paddingInline: 6,
          paddingBlock: 8,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" color="error">
          Failed to fetch details
        </Typography>
      </Box>
    );
  }

  if (!character) return null;

  return (
    <Box
      sx={{
        backgroundColor: '#F1F2F3',
        marginBlockStart: 2,
        paddingInline: 6,
        paddingBlock: 8,
      }}
    >
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        <Box flexBasis={{ xs: '100%', md: '40%' }} flexShrink={0}>
          <Box
            component="img"
            src={character.imageUrl}
            alt={character.name}
            sx={{ width: '100%', borderRadius: 2, objectFit: 'cover' }}
          />
        </Box>

        <Box
          flexBasis={{ xs: '100%', md: '60%' }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography variant="h4" fontWeight="bold">
            {character.name}
          </Typography>

          <Box mt={2}>
            <Typography variant="subtitle1">
              Last Updated {formatDate(character.updatedAt)}
            </Typography>
          </Box>

          <Box mt={2}>
            <Typography variant="h6" fontWeight="bold">
              Featured Films:
            </Typography>
            {character.films.length > 0 ? (
              <Box
                component="ul"
                sx={{ paddingLeft: 2, listStyleType: 'none' }}
              >
                {character.films.map((film, index) => (
                  <Typography key={index} component="li" fontWeight="bold">
                    • {film}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography>N/A</Typography>
            )}
          </Box>

          <Box mt={2}>
            <Typography variant="h6" fontWeight="bold">
              Short Films:
            </Typography>
            {character.shortFilms.length > 0 ? (
              <Box
                component="ul"
                sx={{ paddingLeft: 2, listStyleType: 'none' }}
              >
                {character.shortFilms.map((film, index) => (
                  <Typography key={index} component="li" fontWeight="bold">
                    • {film}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography>N/A</Typography>
            )}
          </Box>

          <Box mt={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              TV Shows:
            </Typography>
            {character.tvShows.length > 0 ? (
              <Box
                component="ul"
                sx={{ paddingLeft: 2, listStyleType: 'none' }}
              >
                {character.tvShows.map((show, index) => (
                  <Typography key={index} component="li" fontWeight="bold">
                    • {show}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography>N/A</Typography>
            )}
          </Box>

          <Button
            variant="contained"
            href={character.url}
            target="_blank"
            sx={{
              width: '270px',
              fontSize: '16px',
              padding: '10px',
              marginBlockStart: 6,
              backgroundColor: '#054553',
              color: '#F1F2F3',
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            Explore more character details
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
