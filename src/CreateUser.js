import './App.css';
import { useState, useEffect } from 'react';
import { app } from './firebaseConfig';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth';

function CreateUser() {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const twitterProvider = new TwitterAuthProvider();

  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };

    setData({ ...data, ...inputs });
  };

  const handleSignin = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleSignInWithTwitter = () => {
    signInWithPopup(auth, twitterProvider)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handlelogout = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        alert('ログインしています');
      } else {
        alert('ログインされてません');
      }
    });
  }, []);

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

      <button onClick={handleSignin}>会員登録</button>
      <button onClick={handleLogin}>ログイン</button>
      <button onClick={handlelogout}>ログアウト</button>
      <button onClick={handleSignInWithGoogle}>
        グーグルで会員登録・ログイン
      </button>
      <button onClick={handleSignInWithTwitter}>
        Twitterで会員登録・ログイン
      </button>
    </div>
  );
}

export default CreateUser;
