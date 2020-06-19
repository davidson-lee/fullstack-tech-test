import React, { useState, useEffect, useCallback } from 'react'
import CastMember from '../CastMember'

export default function CastDetails({movie, castOpen}) {

    const [castData, setCastData] = useState(null)

    const getCastData = useCallback(
        async () => {
            if (!castData) {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=58a8e982cf6f672d3ff8786e5b70bc76`)
                const data = await res.json()

                const castMembers = data.cast.map(member => {
                    return {
                        id: member.id,
                        name: member.name
                    }
                })

                const uniqueCast = castMembers.filter((member, i, self) => self.findIndex(
                    mem => {return (mem.id === member.id && mem.name === member.name)}) === i)

                setCastData([...uniqueCast])
            }
        }, [movie.id, castData]
    )

    useEffect(() => {
        if (castOpen) {
            getCastData()
        }
    }, [castOpen, getCastData])

    return (
        <div style={{ marginTop: '2rem' }} className='flex-row'>
            {
                castData
                    ? 
                        castData.map(member => {
                            return <CastMember key={movie.id + member.id} movie={movie} member={member} />
                        })
                    :   null
            }
        </div>
    )

}