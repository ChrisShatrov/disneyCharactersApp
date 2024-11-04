import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/Profile';
import { CharacterDetails } from './pages/CharacterDetails';
import { CharacterData } from './components/CharacterCard';

interface AppRoutesProps {
  characters: CharacterData[];
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onViewCharacter: (id: number) => void;
  error: boolean;
}

const AppRoutes: React.FC<AppRoutesProps> = ({
  characters,
  loading,
  error,
  searchTerm,
  setSearchTerm,
  onViewCharacter,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim()) {
      navigate('/');
    }
  }, [searchTerm, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            characters={characters}
            error={error}
            loading={loading}
            searchTerm={searchTerm}
            onViewCharacter={onViewCharacter}
          />
        }
      />
      <Route path="/profile" element={<ProfilePage />} />
      <Route
        path="/character/:id"
        element={<CharacterDetails setSearchTerm={setSearchTerm} />}
      />
    </Routes>
  );
};

export default AppRoutes;
