/* eslint-disable no-unused-vars */
import './App.scss';
import MainPage from './pages/MainPage';
import FilmPage from './pages/FilmPage';
import SerialsPage from './pages/SerialsPage';
import SerialPage from './pages/SerialPage';
import SearchAppBar from './components/appBar/SearchAppBar';
import ToggleColorMode from './components/darkModeToggler/DarkModeToggler';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <ToggleColorMode>
        <Router>
            <SearchAppBar color={'primary'}/>
            <Routes>
                <Route path='/' element={<MainPage/>} />
                <Route path='/serials' element={<SerialsPage/>} />
                <Route path='/films/:filmId' element={<FilmPage/>} />
                <Route path='/serials/:serialId' element={<SerialPage/>} />
            </Routes>
        </Router>
    </ToggleColorMode>
  );
}

export default App;
