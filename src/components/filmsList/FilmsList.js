import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useFetchService from "../../services/FetchService"
import FilmCard from "../filmCard/FIlmCard"
import { Grid, Alert, CircularProgress } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { filmsFetched } from "../../redux/FilmsSlice"

const FilmsList = () => {
    const {films} = useSelector(state => state.films);
    const [newFilmsLoading, setNewFilmsLoading] = useState(false);
    const {loading, error, getAllFilms} = useFetchService();

    const dispatch = useDispatch();

    useEffect(() => {
        onRequest(true);
    }, [])

    const onRequest = (initial) => {
        initial ? setNewFilmsLoading(false) : setNewFilmsLoading(true);
        getAllFilms()
            .then(onFilmListLoaded)
    }

    const onFilmListLoaded = (newFilmList) =>{
        dispatch(filmsFetched(newFilmList))
        setNewFilmsLoading(false);
    }
    
    function renderItems(arr) {
        const items = arr.map((item,i) => {
            return(
                <Grid key={i} item md={2}>
                    <Link style={{textDecoration:"none"}} to={`/films/${item.id}`}>
                        <FilmCard 
                            key={item.id}
                            title={item.title}
                            genre={item.genre}
                            rating={item.rating}
                            img={item.img}
                        />
                    </Link>
                </Grid> 
            )
        });

        return(
            <Grid container spacing={2} rowSpacing={3}>
                {items}
            </Grid>
        )
    }   
    const chars = renderItems(films)
    const errorMessage = error ? <Alert severity="error">This is an error alert — check it out!</Alert> : null;
    const spinner = loading && !newFilmsLoading ? 
            <CircularProgress 
                style={{
                    margin:"0 auto",
                    position:"absolute",
                    top:"0",
                    bottom:"0",
                    left:"0",
                    right:"0"
                }}/> 
        : null;

    return(
        <div style={{position:"relative"}}>
            {errorMessage}
            {spinner}
            {chars}
        </div>
    )
    
};

export default FilmsList

