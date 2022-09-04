/* eslint-disable no-unused-vars */
import './App.scss';
import MainPage from './pages/MainPage';
import FilmPage from './pages/FilmPage';
import SerialsPage from './pages/SerialsPage';
import SerialPage from './pages/SerialPage';
import SearchAppBar from './components/appBar/SearchAppBar';
import ToggleColorMode from './components/darkModeToggler/DarkModeToggler';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import LogOut from './services/Logout';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from './services/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { userFetched } from './redux/UserSlice';

function App() {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user)

  const authStateChanged = (user) => {
    dispatch(userFetched(user))
  }

  useEffect(() => {
    onAuthStateChanged(getAuth(firebaseApp), authStateChanged)
  }, [])

  return (
    <ToggleColorMode>
        <Router>
            <SearchAppBar color={'primary'}/>
            <Routes>
                <Route path='/' element={<MainPage/>} />
                <Route path='/serials' element={<SerialsPage/>} />
                <Route path='/films/:filmId' element={<FilmPage currentUser={user}/>} />
                <Route path='/serials/:serialId' element={<SerialPage/>} />
                <Route path='/registration' element={<RegistrationPage currentUser={user}/>} />
                <Route path='/login' element={<LoginPage currentUser={user}/>} />
                <Route path='/logout' element={<LogOut currentUser={user}/>} />
                <Route path='/profile' element={<ProfilePage/>} />
                <Route path='/favorites' element={<FavoritesPage currentUser={user}/>} />
            </Routes>
        </Router>
    </ToggleColorMode>
  );
}

export default App;
