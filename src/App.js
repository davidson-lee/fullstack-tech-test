import React, { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header'
import Movie from './components/Movie'

function App() {

    const [movies, setMovies] = useState(null)

    const fetchMovieData = async () => {
        const movieData = []
        let currentPage = 0
        let pagesRequired = null;

        do {

            currentPage++
            const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=58a8e982cf6f672d3ff8786e5b70bc76&page=${currentPage}&sort_by=popularity.desc&primary_release_year=2020`)
            const data = await res.json();

            pagesRequired = data.total_pages;

            const filteredMovies = data.results.filter(film => {
                return (film.popularity >= 10)
            })
          
            if (filteredMovies.length > 0) {
                movieData.push(...filteredMovies)
            } else {
                break
            }

        } while (currentPage <= pagesRequired)

        const sortedMovies = movieData.sort((a, b) => {
            const aReleaseDate = new Date(a.release_date)
            const bReleaseDate = new Date(b.release_date)

            return aReleaseDate - bReleaseDate
        })

        setMovies(sortedMovies)
    }

    useEffect(() => {
        fetchMovieData()
    }, [])

    return (
        <div className="App">
            <Header />
            <main>
                <h2 className='heading heading-container'>2020 Films</h2>
                <div style={{width: '100%', marginTop: '2rem'}}>
                    {
                        movies
                            ?
                            movies.map((movie, order) => {
                                return ((order + 1) % 3 === 1)
                                    ?
                                        <div key={'row' + (order + 1)}className='flex-row' style={{width: '100%', marginTop: '2rem'}}>
                                            <Movie order={0} movie={movies[order]} key={movies[order].id}/>
                                            <Movie order={1} movie={movies[order + 1]} key={movies[order + 1].id}/>
                                            <Movie order={2} movie={movies[order + 2]} key={movies[order + 2].id}/>
                                        </div>
                                    : 
                                        null
                            })
                            :
                                null
                    }
                </div>
            </main>
        </div>
    );
}

export default App;

