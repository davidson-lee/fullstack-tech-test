import React, { useState } from 'react'
import './styles.css'

import MovieDetails from '../MovieDetails'
import CastDetails from '../CastDetails'

export default function Movie({order, movie}) {

    const [detailsOpen, setDetailsOpen] = useState(false)
    const [castOpen, setCastOpen] = useState(false)

    const handleDetailsOpen = (e) => {
        e.preventDefault()
        setDetailsOpen(!detailsOpen)
    }

    const handleCastOpen = (e) => {
        e.preventDefault()
        setCastOpen(!castOpen)
    }

    return (
        <div style={{order: detailsOpen ? -1 : order }} className={`movie-container ${detailsOpen ? 'block fullsize' : 'flex-center' }`}>
            <h3 className='heading movie-title' onClick={handleDetailsOpen} style={{ textAlign: `${detailsOpen ? 'left' : 'center' }` }}>{movie.title}</h3>
            <div style={{background: `${detailsOpen ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)' }`}} className='divider' />
            <p><strong>Release</strong></p>
            <p>{movie.release_date}</p>
            {
                detailsOpen 
                    ?
                        <React.Fragment>
                            <MovieDetails movie={movie} detailsOpen={detailsOpen} />
                            <p className='show-button' onClick={handleCastOpen}><strong>Cast</strong></p>
                            {
                                castOpen
                                ?   <CastDetails movie={movie} castOpen={castOpen} />
                                :   null
                            }
                        </React.Fragment>
                    :   
                        null
            }
            
        </div>
    )
}