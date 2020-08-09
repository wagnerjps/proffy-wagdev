import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'
import api from '../../services/api'

export interface Teacher {
    id: number,
    subject: string,
    cost: number,
    name: string,
    avatar: string,
    whatsapp: string,
    bio: string
}

interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

    function createNewConnection(){
        api.post('/connections', {
            user_id: teacher.id
        })
    }
    return(
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>{teacher.bio}</p>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a onClick={ createNewConnection } href={`https://wa.me/${teacher.whatsapp}?text=Gostaria%20de%20fazer%20suas%20aulas!`} target="_blanc">
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem