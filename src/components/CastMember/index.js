import React, { useState, useEffect, useCallback } from 'react'
import './styles.css'

export default function CastMember({movie, member}) {

    const [showOtherMovies, setShowOtherMovies] = useState(false)
    const [otherMovies, setOtherMovies] = useState([])

    const getOtherMoviesData = useCallback(
        async () => {
            const otherMoviesData = []
            let currentPage = 0
            let pagesRequired = null;
    
            do {

                currentPage++
                const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=58a8e982cf6f672d3ff8786e5b70bc76&page=${currentPage}&with_cast=${member.id}`)
                const data = await res.json();

                pagesRequired = data.total_pages;

                const filteredMovies = data.results.filter(film => {
                    return film.id !== movie.id
                })
                
                if (filteredMovies.length > 0) otherMoviesData.push(...filteredMovies)

            } while (currentPage <= pagesRequired)
    
            setOtherMovies(otherMoviesData)
        }, [member.id, movie.id]
    )

    const handleOtherMovies = (e) => {
        e.preventDefault()
        setShowOtherMovies(!showOtherMovies)
    }

    useEffect(() => {
        if (showOtherMovies) {
            getOtherMoviesData()
        }
    }, [showOtherMovies, getOtherMoviesData])

    return (
        <div className='member'>
            <p className='member-name' onClick={handleOtherMovies}>{member.name}</p>
            {
                showOtherMovies
                    ?
                        <div className='credits-container'>
                            <span onClick={handleOtherMovies} className='close-button'>X</span>
                            <h2 className='heading'>{member.name}</h2>
                            <div className='divider' />
                            <div className='container flex-row' style={{height: 'calc(80vh - 12em - 42px)', overflowY: 'auto'}}>
                                {
                                    otherMovies.length > 0
                                        ?
                                            otherMovies.map((movie) => {
                                                return <p className='member' key={member.id + movie.title}>{movie.title}</p>
                                            })
                                        :
                                            <p>No Other Movie Appearances</p>
                                }
                            </div>
                        </div>
                    :
                        null
            }
        </div>
    )
}