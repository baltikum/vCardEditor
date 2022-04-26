import React from 'react';
import Contact from './Contact'

export default function Contacts({ contacts, editName, editLastname, editTelephone,toggleEdit, toggleKeep }){
    return (



        contacts.map( contact => {
            return <Contact key={contact.id} contact={contact} editName={editName} editLastname={editLastname} 
            editTelephone={editTelephone} toggleEdit={toggleEdit} toggleKeep={toggleKeep}/>
        })


        
    )


}