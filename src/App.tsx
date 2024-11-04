import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import AppRoutes from "./AppRoutes";
import { CssBaseline, Container } from "@mui/material";
import { fetchCharacters, fetchCharactersByName } from "./services/disneyApi";
import { CharacterData } from "./components/CharacterCard";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleCharacterView = (id: number) => {
    setSearchTerm("");
    navigate(`/character/${id}`);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      const params = new URLSearchParams(location.search);
      if (searchTerm) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }
      navigate({ search: params.toString() }, { replace: true });
    }
  }, [searchTerm, location.pathname, navigate, location.search]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = searchTerm.trim()
          ? await fetchCharactersByName(searchTerm)
          : await fetchCharacters(1, 8);
        setCharacters(data.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchData, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ paddingX: 3, paddingY: 2 }}>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <AppRoutes
          characters={characters}
          loading={loading}
          error={error}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onViewCharacter={handleCharacterView}
        />
        <Footer onViewCharacter={handleCharacterView} />
      </Container>
    </>
  );
};

export default App;
