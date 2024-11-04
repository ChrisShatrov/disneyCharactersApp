import { Box, Skeleton, Typography } from '@mui/material';
import { CharacterCard } from '../components/CharacterCard';
import { CharacterData } from '../components/CharacterCard';

interface HomePageProps {
  characters: CharacterData[];
  loading: boolean;
  error: boolean;
  searchTerm?: string;
  onViewCharacter: (id: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  characters,
  loading,
  error,
  searchTerm,
  onViewCharacter,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: '#F1F2F3',
        marginBlockStart: 2,
        paddingInline: 6,
        paddingBlock: 8,
      }}
    >
      {searchTerm && (
        <Box
          sx={{
            textAlign: 'center',
            color: '#222222',
            marginBlockEnd: 4,
          }}
        >
          <Typography variant="h5">Search Results - {searchTerm}</Typography>
        </Box>
      )}

      {error ? (
        <Box textAlign="center" color="error.main">
          <Typography variant="h5">
            Failed to fetch details. Please try again.
          </Typography>
        </Box>
      ) : (
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
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
          {!loading && !characters?.length && !error && (
            <Box
              sx={{
                textAlign: 'center',
                color: '#222222',
              }}
            >
              <Typography variant="h5">No Results Found</Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
