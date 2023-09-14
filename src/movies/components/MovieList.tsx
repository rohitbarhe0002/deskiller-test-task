import React, { useEffect, useState } from 'react';

import { MovieCard } from './MovieCard';
import { AddMovieButton } from './AddMovieButton';
import { AddMovieForm } from './AddMovieForm';
import { Card } from 'shared/components';

import { useMovies } from './MovieProvider';

type NewMovieMode = "BUTTON" | "FORM"

export const MovieList = () => {
  const { movies, moviesDispatch } = useMovies();
  const [displayOptionType, setDisplayOptionType] = useState<NewMovieMode>('BUTTON');  
  return (
    <div className="card-deck">
      {movies.map(movie => (
        <Card key={movie.id}>
          <MovieCard key={movie.id} movie={movie} />
        </Card>      
      ))}
      <Card>
        {/* TODO: Implement displaying appropriate card for add movie - button or form */}
        { displayOptionType === "FORM" && 
          <AddMovieForm onSubmit={async(values:any)=>{
            setDisplayOptionType("BUTTON");
            await moviesDispatch({ type: "ADD", payload: { movie: values } });
          }} onCancel={()=>{
            setDisplayOptionType("BUTTON");
          }} />
        }
        {/* TODO: use AddMovieButton and AddMovieForm */}
        {displayOptionType == "BUTTON" && <AddMovieButton 
        onClick={()=>{
          setDisplayOptionType("FORM")
        }} />}
      </Card>
    </div>
  );
}
