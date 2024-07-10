import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function ContactsApp() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setContacts(response.data);
      });
  }, []);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleBackClick = () => {
    setSelectedContact(null);
  };

  return (
    <div className="contacts-app">
      <div className="leftsidebar">
        <h1>Contacts</h1>
        <ul className="contact-list">
          {contacts.map(contact => (
            <li key={contact.id} onClick={() => handleContactClick(contact)} className={`contact-item ${selectedContact && selectedContact.id === contact.id ? 'selected' : ''}`}>
              <div className="contact-name">{contact.name}</div>
              <div className="contact-company">{contact.company.name}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        {selectedContact ? (
          <div className="contact-details">
            <button onClick={handleBackClick} className="back-button">Back</button>
            <div className="namecard">
              <img src={`https://i.pravatar.cc/150?img=${selectedContact.id}`} alt={selectedContact.name} className="contact-avatar"/>
              <h2>{selectedContact.name}</h2>
              <p><strong>Username:</strong> {selectedContact.username}</p>
              <p><strong>Email:</strong> {selectedContact.email}</p>
              <p><strong>Phone:</strong> {selectedContact.phone}</p>
              <p><strong>Website:</strong> <a href={`http://${selectedContact.website}`} target="_blank" rel="noopener noreferrer">{selectedContact.website}</a></p>
              <p><strong>Address:</strong> {selectedContact.address.street}, {selectedContact.address.suite}, {selectedContact.address.city}, {selectedContact.address.zipcode}</p>
              <p><strong>Company:</strong> {selectedContact.company.name}</p>
              <p><strong>Catch Phrase:</strong> {selectedContact.company.catchPhrase}</p>
              <p><strong>BS:</strong> {selectedContact.company.bs}</p>
            </div>
          </div>
        ) : (
          <div className="placeholder">
            <h2>Select a contact to view details</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactsApp;


