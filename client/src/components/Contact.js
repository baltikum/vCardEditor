import React from 'react'
import './contact-box.css'

function Contact({ contact, editName, editLastname, editTelephone, toggleEdit,toggleKeep }) {
  function handleEditName() {
    editName(contact.id, contact.name)
  }
  function handleEditLastname() {
    editLastname(contact.id, contact.lastname)
  }
  function handleEditTelephone() {
    editTelephone(contact.id, contact.telephone)
  }
  function handleKeepBox() {
    toggleKeep(contact.id)
  }
  function handleEditBox() {
    toggleEdit(contact.id)
  }



  return (
    <div className="contact-box">
      <h4> {contact.name} {contact.lastname}</h4>
      <input type="text" placeholder={contact.name} onChange={handleEditName}></input><br></br>
      <input type="text" placeholder={contact.lastname} onChange={handleEditLastname}></input><br></br>
      <input type="text" placeholder={contact.telephone} onChange={handleEditTelephone}></input><br></br>
      
      <label>Keep
        <input type="checkbox" className="contact-input" checked={contact.keep} onChange={handleKeepBox}></input>
      </label>

      <label>Edit
        <input type="checkbox" className="contact-input" checked={contact.edit} onChange={handleEditBox}></input>
      </label>
    </div>
  )
}
export default Contact;