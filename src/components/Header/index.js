import React from 'react'
import './styles.css'

import Icons from '../../assets/icons'

export default function Header() {
    return (
        <header>
            <div className="header-fixed">
                <img className="header-logo" src={Icons.logoWhite} alt="White TIFF Logo" />
            </div>
        </header>
    )
}