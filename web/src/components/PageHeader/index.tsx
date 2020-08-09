import React from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import backImg from '../../assets/images/icons/back.svg'

import './styles.css'

interface PageHeaderProps {
    title: string;
    description?: string;
}

//React.FunctionComponent
const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return(
        <header className="page-header">
            <div className="top-bar-container">
                <Link to='/'>
                    <img src={ backImg } alt='Voltar' />
                </Link>
                <img src={ logoImg } alt='Proffy' />
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                { props.description && <p>{props.description}</p> }
                { props.children }
            </div>
        </header>
    )
}

export default PageHeader
