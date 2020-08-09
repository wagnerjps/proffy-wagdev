import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import LogoImg from '../../assets/images/logo.svg'
import LandingImg from '../../assets/images/landing.svg'
import StudyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import './styles.css'



const Landing = () => {

    const [totalConnections, setTotalConnections] = useState(0)

    useEffect(() => {
        api.get('/connections').then(resp => {
            const { total } = resp.data
            setTotalConnections(total)
        })
        
    }, [])

    return(
        <div id='page-landing'>
            <div id='page-landing-content' className='container'>
                <div className='logo-container'>
                    <img src={LogoImg} alt='Proffy' />
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img src={LandingImg} alt='Plataforma de estudos' className='hero-image' />
                
                <div className='buttons-container'>
                    <Link to='study' className='study'>
                            <img src={StudyIcon} alt='Estudar' />
                            Estudar
                    </Link>
                    <Link to='/give-classes' className='give-classes'>
                        <img src={giveClassesIcon} alt='Dar aulas' />
                        Dar aulas
                    </Link>
                </div>

                <span className='total-connections'>
                    Total de {totalConnections} conexões realizadas <img src={purpleHeartIcon} alt='Coração roxo' />
                </span>
            </div>
        </div>
    )
}

export default Landing