import React, { useState,useEffect } from 'react';
import Contacts from "./components/Contacts";
import AddContactFile from './components/AddContactFile'
import axios from 'axios'
import { v4 as uuid } from 'uuid';
import './components/container.css'

import './components/contacts-container.css'



const LOCAL_STORAGE_KEY = 'contactApp.contacts'

function App() {

  const [contacts, setContacts] = useState([])
  const [contactFile,setFile] = useState()

  function handleAddContacts(contacts) {
    contacts.map( contact => {
      setContacts( old => {
        return [...old, {id: uuid(), name: contact.name,lastname: contact.lastname,telephone: contact.telephone,keep: contact.keep,edit: contact.edit}]
      })
    })
  }


  const fetchContacts = async () => {
    axios.get('/get').then(
      (response) => {
        handleAddContacts(response.data.contacts)
        console.log(response.data.contacts);
      },
      (error) => {
        console.log(error);
      }
    ); 
  }

  const postContacts = () => {
    axios.post("/load", contacts).then(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
      }
    );   
  }

  useEffect(() => {
    fetchContacts()
  }, [contactFile]);



  //Storing
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedContacts) setContacts(storedContacts)
  }, [] )

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts))
  },[contacts])


  function handleRemoveContacts() {
    setContacts([])
  }
  function handleRemoveNonKeepContacts() {
    const newContacts = contacts.filter(contact => contact.keep)
    setContacts(newContacts)
  }


  //Contact editing
  function toggleKeep(id) {
    const newContacts = [...contacts]
    const contact = newContacts.find( contact => contact.id === id )
    contact.keep = !contact.keep
    setContacts(newContacts)
  }
  function setEdited(id) {
    const newContacts = [...contacts]
    const contact = newContacts.find( contact => contact.id === id )
    contact.edit = false
    setContacts(newContacts)
  }
  function editName(id,name) {
    const newContacts = [...contacts]
    const contact = newContacts.find( contact => contact.id === id )
    contact.name = name
    setContacts(newContacts)
  }
  function editLastname(id,lastname) {
    const newContacts = [...contacts]
    const contact = newContacts.find( contact => contact.id === id )
    contact.lastname = lastname
    setContacts(newContacts)
  }
  function editTelephone(id,telephone) {
    const newContacts = [...contacts]
    const contact = newContacts.find( contact => contact.id === id )
    contact.telephone = telephone
    setContacts(newContacts)
  }


  //File upload
  function onUploadFile(event) {
      
      const formData = new FormData();
      formData.append('contacts', contactFile);
      axios.post("/load", formData).then(
        (response) => {
          console.log(response)
        },
        (error) => {
          console.log(error)
        }
      );  

  }
  function onFileAdded(event) {
      setFile(event.target.files[0])
  }

  return (
    <>
      <div className='containers'>

        <AddContactFile onFileAdded={onFileAdded} onUploadFile={onUploadFile} />
        <button onClick={handleRemoveContacts} className="button">Remove all Contacts</button>
        <button onClick={handleRemoveNonKeepContacts} className="button">Remove all but Keeps</button>

        <div className='contacts-container'>
          <Contacts contacts={contacts} editName={editName} editLastname={editLastname} 
            editTelephone={editTelephone} setEdited={setEdited} toggleKeep={toggleKeep} />
        </div>

        

        <div>{contacts.filter(contact => !contact.keep).length } contacts to be removed.</div>
        <div>{contacts.filter(contact => contact.edit).length } contacts needs editing.</div>

      </div>
    </>
  )


}



export default App;