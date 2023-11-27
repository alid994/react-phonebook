import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  
  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem('contacts');
    return storedContacts ? JSON.parse(storedContacts): [];
  });
  const [newContact, setNewContact] = useState({name: '', phone:''});

  const handleInputChange = (e) => {
    const {name, value } = e.target;
    setNewContact({...newContact, [name]: value});
  }

  const addContact = () => {
    if(newContact.name && newContact.phone) {
      setContacts([...contacts, {id: Date.now(), ...newContact}]);
      setNewContact({name: '', phone: ''});
    }
  }

  const removeContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  }

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div id='form-container'>
      <div className='container d-flex flex-column justify-content-center align-items-center gap-4 mt-5'>
        <input type="text" name="name" value={newContact.name}
          onChange={handleInputChange} className="form-control" 
          placeholder="Enter your name..."/>
        <input type="text" name="phone" value={newContact.phone}
          onChange={handleInputChange} className="form-control"
          placeholder="Enter your phone number......"/>
        <button onClick={addContact} className='btn btn-primary w-100'>Add Contact</button>
        <hr></hr>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              {contact.name} - {contact.phone} 
              <button className='btn btn-danger m-2' onClick={() => removeContact(contact.id)}>Remove Contact</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );


}


export default App;
