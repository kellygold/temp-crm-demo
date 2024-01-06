'use client';

import React, { useState, useEffect } from 'react';
import ConnectApp from './components/ConnectApp/ConnectApp.mjs';
import ContactList from './components/ContactList/ContactList.mjs';
import CreateContact from './components/CreateContact/CreateContact.mjs';

export default function Home() {
  const [connectionId, setConnectionId] = useState('');

  useEffect(() => {
    // Retrieve the connectionId from localStorage on component mount
    const storedConnectionId = localStorage.getItem('connectionId');
    if (storedConnectionId) {
      setConnectionId(storedConnectionId);
    }
  }, []);

  const handleConnectionEstablished = (id) => {
    setConnectionId(id);
  };

  return (
    <div>
      <h1>Alloy CRM Integration</h1>
      <section>
        <h2>Step 1: Connect App</h2>
        <ConnectApp onConnectionEstablished={handleConnectionEstablished} />
      </section>
      <section>
        <h2>Step 2: List Contacts</h2>
        <ContactList connectionId={connectionId} />
      </section>
      <section>
        <h2>Step 3: Create a Contact</h2>
        <CreateContact connectionId={connectionId} />
      </section>
    </div>
  );
}
