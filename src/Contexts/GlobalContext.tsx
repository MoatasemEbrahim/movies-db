import React, {
  FC, ReactNode, createContext, useState, useEffect,
} from 'react';
import moviesAPIs from '../apis/moviesApis';

export const GlobalContext = createContext(null);

const GlobalProvider:FC<{ children:ReactNode }> = ({ children }:{ children:ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [moviesGenres, setMoviesGenres] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const genres = await moviesAPIs.getGenres();
        const mappedGenres = genres.reduce(
          (acc, genre) => ({ ...acc, [genre.id]: genre.name }), {},
        );
        setMoviesGenres(mappedGenres);
      } catch (error) {
        console.warn(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <GlobalContext.Provider value={{
      moviesGenres,
    }}
    >
      {loading ? <h2>Loading ...</h2> : children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
