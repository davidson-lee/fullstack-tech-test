import React, { useState, useEffect, useCallback } from 'react'
export default function MovieDetails({movie, detailsOpen}) {

    const [movieData, setMovieData] = useState(null)

    const getMovieData = useCallback(
        async () => {
            if (!movieData) {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=58a8e982cf6f672d3ff8786e5b70bc76`)
                const data = await res.json()
                setMovieData(data)
            }
        }, [movie.id, movieData]
    )

    useEffect(() => {
        if (detailsOpen) {
            getMovieData()
        }
    }, [detailsOpen, getMovieData])

    return (
        <div>
            {
                movieData
                    ? 
                        <div style={{marginTop: '1rem'}}>
                            <p><strong>Overview</strong></p>
                            <p>{movieData.overview}</p>
                            <br />
                            <p><strong>Runtime:</strong> {movieData.runtime} min.</p>
                            <p><strong>Genres:</strong> 
                                {
                                    movieData.genres.map(genre => {
                                        return (
                                                <span key={movie.id + genre.id}> {genre.name}</span>
                                            )
                                    })
                                }
                            </p>
                            <p><strong>Tagline:</strong> {movieData.tagline ? movieData.tagline : null}</p>
                        </div>
                    :   null
            }
        </div>
    )

}