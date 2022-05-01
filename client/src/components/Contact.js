import React,{ useState, useEffect, useRef} from 'react'
import './contact-box.css'

function Contact({ contact, editName, editLastname, editTelephone, setEdited, toggleKeep }) {


  const [color,setStyle] = useState('')
  const [hover,setMouseOver] = useState('inactive')

  const nameInputField = useRef()
  const lastnameInputField = useRef()
  const telephoneInputField = useRef()

  function handleEditName(event) {
    editName(contact.id, nameInputField.current.value)
    setEdited(contact.id)
  }
  function handleEditLastname(event) {
    editLastname(contact.id, lastnameInputField.current.value)
    setEdited(contact.id)
  }
  function handleEditTelephone(event) {
    editTelephone(contact.id,telephoneInputField.current.value)
    setEdited(contact.id)
  }
  function handleKeepBox() {
    toggleKeep(contact.id)
  }
  function handleMouseOver(event){
        setMouseOver('active')
  }
  function handleMouseLeave(event){
        setMouseOver('inactive')
  }

  useEffect(() => {
    if (contact.keep) {
      if (contact.edit) {
        setStyle('edit')
      } else {
        setStyle('keep')
      }
    } else {
      setStyle('remove')
    }
  },[handleKeepBox,handleEditName,handleEditLastname,handleEditTelephone])


  return (
    <div className={'contact-box ' + color+' '+hover } onClick={handleKeepBox} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <h4> {contact.name} {contact.lastname}</h4>
      <input type="text" className="contact-input" ref={nameInputField} placeholder={contact.name} onChange={handleEditName}></input><br></br>
      <input type="text" className="contact-input" ref={lastnameInputField} placeholder={contact.lastname} onChange={handleEditLastname}></input><br></br>
      <input type="text" className="contact-input" ref={telephoneInputField} placeholder={contact.telephone} onChange={handleEditTelephone}></input>
    </div>
  )
}
export default Contact;