import './App.css';
import { useState } from 'react';

import CreateUser from './CreateUser';
import Database from './database.js';

function App() {
  const [showCreateUSer, setShowCreatUser] = useState(true);

  const handleClick = () => {
    setShowCreatUser(!showCreateUSer);
  };

  return (
    <div>
      {/* when showCreate = true show text 'Firestore' */}
      <button className='button-top' onClick={handleClick}>
        {showCreateUSer ? 'Firestore' : 'Authentication'}
      </button>
      {/* when showCreate = true show CreateUser component */}
      {showCreateUSer ? <CreateUser /> : <Database />}
    </div>
  );
}

export default App;
