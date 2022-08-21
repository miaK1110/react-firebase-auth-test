import './App.css';
import { useState, useEffect } from 'react';
import { app, database } from './firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

function Database() {
  const [data, setData] = useState({});
  const collectionRef = collection(database, 'users');

  useEffect(() => {
    getDocs(collectionRef).then((responce) => {
      console.log(
        responce.docs.map((user) => {
          return { ...user.data(), id: user.id };
        })
      );
    });
  }, []);

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };

    setData({ ...data, ...inputs });
  };

  const handleSubmit = () => {
    addDoc(collectionRef, { email: data.email, password: data.password })
      .then((responce) => {
        alert('データ登録完了');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleUpdateData = () => {
    const docToUpdate = doc(database, 'users', 'KBiUwNse7gvE1PzMgwhy');

    updateDoc(docToUpdate, {
      email: 'aaa@aaa.com',
      password: '999999',
    })
      .then(() => alert('データが更新されました'))
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleDeleteData = () => {
    const docToUpdate = doc(database, 'users', 'KBiUwNse7gvE1PzMgwhy');

    deleteDoc(docToUpdate)
      .then(() => alert('データが削除されました'))
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className='App-header'>
      <input
        placeholder='Email'
        name='email'
        type='email'
        className='input-fields'
        onChange={(event) => handleInputs(event)}
      />
      <input
        placeholder='Password'
        name='password'
        type='password'
        className='input-fields'
        onChange={(event) => handleInputs(event)}
      />
      <button onClick={handleSubmit}>送信</button>
    </div>
  );
}

export default Database;
