import { StarRating, Button } from 'shared/components';

import { getAvgRating } from 'movies/ratings';
import { Movie } from 'types';
import { useMovies } from './MovieProvider';
import { type } from 'os';

interface MovieCardProps {
    movie: Movie,
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    const { moviesDispatch } = useMovies();
    
    // TODO: implement required functionality
    const deleteMovie = async (id: string) => {
      moviesDispatch({
        type: "DELETE",
        payload: { movieId: id },
      });
    };

    const showAvgRating = (movie: Movie) => {
        return movie.ratings.length > 0 ? getAvgRating(movie):0
    }

    return (
        <div data-testid={`movie-item-${movie.id}`}>
            {/* TODO: Display image */}
            <img src={movie.imageUrl}  alt={movie.title}/>
            <img className="card-img-top" alt="" />
            <div className="card-body">
                <h4 className="card-title">
                    {/* TODO: Display title */}
                    {movie.title}
                </h4>
                <h6 className="card-year mb-2 text-muted">
                    {/* TODO: Display year */}
                    {movie.year}
                </h6>
                <p className="text-justify" style={{ fontSize: '14px' }}>
                    {/* TODO: Display description */}
                    {movie.description}
                </p>
                <h6 className="card-duration mb-2">
                    {/* TODO: Display duration */}
                    {movie.duration}
                </h6>
                <h6 className={`card-director mb-2 ${movie.id}`}>
                    {/* TODO: Display directors */}
                    <ul>
                    {movie.director.map((director:string)=>{
                        return <li key={director}>{director}</li>
                    })}
                    </ul>
                </h6>
                <h6 className="card-starring mb-2">
                    {/* TODO: Display starring actors */}
                    <ul>
                    {movie.starring.map((actor:string)=>{
                        return <li key={actor}>{actor}</li>
                    })}
                    </ul>
                </h6>
                {/* TODO: Implement delete functionality */}
                <Button onClick={()=>deleteMovie(movie.id)}>Delete</Button>
            </div>
            <div className="card-footer">
                <div className="clearfix">
                <div className="float-left mt-1">
                    {/* TODO: Display stars */}
                    <StarRating rating={showAvgRating(movie)} onRate={(rating:number)=>{
                        moviesDispatch({
                            type:"RATE",
                            payload:{movieId:movie.id, rating:rating}
                        })
                    }} />
                </div>
                <div data-testid="movie-rating" className="card-footer-badge float-right badge badge-primary badge-pill">
                    {/* TODO: Display rating value */}
                    {showAvgRating(movie)}
                </div>
                </div>
            </div>
        </div>    
    )
};
