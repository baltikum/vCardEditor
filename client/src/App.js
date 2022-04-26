import React, { useState,useEffect } from 'react';
import Contacts from "./components/Contacts";
import AddContactFile from './components/AddContactFile'
import axios from 'axios'


import './components/contacts-container.css'


/* {id:1, name:'Namn', lastname:'Efternamn', telephone:'0739729298', keep:true, edit:false}*/

const LOCAL_STORAGE_KEY = 'contactApp.contacts'

function App() {

  const [contacts, setContacts] = useState([{id:1, name:'Namn', lastname:'Efternamn', telephone:'0739729298', keep:true, edit:false}])
  const [file,setFile] = useState([])

  const fetchContacts = async () => {
    axios.get('/get').then(
      (response) => {
          console.log(response.data);
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
  }, []);



  //Storing
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedContacts) setContacts(storedContacts)
  }, [] )

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts))
  },[contacts])


  function handleRemoveContacts() {
    const newContacts = contacts.filter(contact => !contact)
    setContacts(newContacts)
  }
  function handleRemoveNonKeepContacts() {
    const newContacts = contacts.filter(contact => contact.keep)
    setContacts(newContacts)
  }


  //Contact editing
  function toggleKeep(id) {
    const newContacts = [...contacts]
    const contact = newContacts.find( contact => contact.id === id )
    contact.keep = ! contact.keep
    setContacts(newContacts)
  }
  function toggleEdit(id) {
    const newContacts = [...contacts]
    const contact = newContacts.find( contact => contact.id === id )
    contact.edit = ! contact.edit
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
  function handleUploadFile(event) {

      const formData = new FormData();

      formData.append('contacts',{file});

      console.log({file});

      axios.post('/load', formData);

  }
  function onFileAdded(event) {
      setFile({selectedFile:event.target.files[0]})
  }

  return (
    <>

      <AddContactFile onFileAdded={onFileAdded} handleUploadFile={handleUploadFile} />
      <button onClick={handleRemoveContacts}>Remove all Contacts</button>
      <button onClick={handleRemoveNonKeepContacts}>Remove all but Keeps</button>

      <div className='contacts-container'>
        <Contacts contacts={contacts} editName={editName} editLastname={editLastname} 
          editTelephone={editTelephone} toggleEdit={toggleEdit} toggleKeep={toggleKeep} />
      </div>

      

      <div>{contacts.filter(contact => !contact.keep).length } contacts to be removed.</div>
      <div>{contacts.filter(contact => contact.edit).length } contacts needs editing.</div>
    </>
  )


}



export default App;