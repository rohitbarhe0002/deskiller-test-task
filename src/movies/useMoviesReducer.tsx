import React, { useReducer, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { Movie, MoviesAction } from 'types';
import { getMovies } from 'api/movies';

interface MoviesState {
  movies: Movie[]
  initialized: boolean
}

export function useMoviesReducer(): [MoviesState, React.Dispatch<MoviesAction>] {
  // TODO: Implement all action processing

  const movieReducer = (state: MoviesState, action: MoviesAction): MoviesState => {
    switch (action.type) {
      case 'FETCH':
        return { ...state, 
          initialized:true,
          movies:action.payload.data 
        };

    case 'ADD':
      const { movie } = action.payload;
      const newMovie: Movie = {
        ...movie,
        id: uuid(),
        ratings: [],
      };
      return {
        ...state,
        movies: [...state.movies, newMovie],
      };

      case 'DELETE':
      const { movieId } = action.payload;
      let  allMovies = [...state.movies];
      let filterMovies = allMovies.filter((movie) => movie.id !== movieId)
      return {
        ...state,
        movies: filterMovies,
      };

      case 'RATE':
        const { movieId: ratedMovieId, rating } = action.payload;
        return {
          ...state,
          movies: state.movies.map((movie) => {
            if (movie.id === ratedMovieId) {
              return {
                ...movie,
                ratings: [...movie.ratings, rating],
              };
            }
            return movie;
          }),
        };

      default:
        return state
    }
  };

  const [state, dispatch] = useReducer(movieReducer, {
    movies: [],
    initialized: false,
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getMovies();
        dispatch({ type: 'FETCH', payload:{data:movies}});
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return [state, dispatch];
}
