/* eslint-disable no-unused-vars */
import '../../App.scss';
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useFetchService from "../../services/FetchService"
import FilmCard from "../filmCard/FIlmCard"
import { Grid, Alert, CircularProgress, Box, FormControl, InputLabel, Select, MenuItem, styled, alpha} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { filmsFetched } from "../../redux/FilmsSlice"

const FilmsList = () => {
    const StyledSelect = styled(Select)(({ theme }) => ({
        backgroundColor: theme.palette.primary.dark,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: 'auto',
        },
        '.MuiSelect-filled':{
            backgroundColor:theme.palette.primary.dark,
            borderRadius:'10px'
        },
        '.MuiList-padding':{
            paddingTop:'0'
        }
    }));

    const StyledItem = styled(MenuItem)(({ theme }) => ({
        backgroundColor: theme.palette.primary.dark,
        '&:hover':{
            backgroundColor:theme.palette.primary.light
        },
        '&:focus':{
            backgroundColor: theme.palette.primary.dark
        },
        width: '100%',
        margin:'0'
    }));

    
    const {films} = useSelector(state => state.films);
    const [newFilmsLoading, setNewFilmsLoading] = useState(false);
    const {loading, error, getAllFilms} = useFetchService();
    const [genre, setGenre] = useState('');
    const [sortMethod, setSortMethod] = useState('')
    const dispatch = useDispatch();

    const genreChange = (event) => {
        setGenre(event.target.value);
    };

    const sortChange = (event) => {
        setSortMethod(event.target.value);
    };


    useEffect(() => {
        onRequest(true);
    }, [])

    useEffect(() => {
        const arrayForSort = [...films]
            switch(sortMethod){
                case 'rating':
                    arrayForSort.sort((a,b) => b.rating - a.rating);
                    break;
                case 'year':
                    arrayForSort.sort((a,b) => b.year - a.year);
                    console.log('year');
                    break;
                case 'title':
                    arrayForSort.sort((x, y) => x.title.localeCompare(y.title));
                    break;
                default: 
                    onRequest(true);
                    break;
            }
        dispatch(filmsFetched(arrayForSort))
    }, [sortMethod])

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
        const items = arr.filter(item => {
            return item.genre.indexOf(genre) > -1
        }).map((item,i) => {
            return(
                <Grid className="filmGrid" key={i} item md={2}>
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
           <>
               <div className="sort_wrapper">
               <Box sx={{width:320, marginBottom:6}}>
                    <FormControl 
                        fullWidth
                    >
                        <InputLabel id="demo-simple-select-label">Жанр</InputLabel>
                        <StyledSelect
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={genre}
                            label="genre"
                            onChange={genreChange}
                        >
                            <StyledItem value={''}>Любой</StyledItem>
                            <StyledItem value={'Драма'}>Драма</StyledItem>
                            <StyledItem value={'Детектив'}>Детектив</StyledItem>
                            <StyledItem value={'Криминал'}>Криминал</StyledItem>
                            <StyledItem value={'Фантастика'}>Фантастика</StyledItem>
                            <StyledItem value={'Биография'}>Биография</StyledItem>
                        </StyledSelect>
                    </FormControl>
                </Box>
                <Box sx={{width:320, marginBottom:6}}>
                    <FormControl 
                        fullWidth
                    >
                        <InputLabel id="demo-simple-select-label">Сортировать по</InputLabel>
                        <StyledSelect
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sortMethod}
                            label="sortMethod"
                            onChange={sortChange}
                        >
                            <StyledItem value={''}>Не сортировать</StyledItem>
                            <StyledItem value={'rating'}>По рейтингу</StyledItem>
                            <StyledItem value={'year'}>По дате выхода</StyledItem>
                            <StyledItem value={'title'}>По названию</StyledItem>
                        </StyledSelect>
                    </FormControl>
                </Box>
               </div>
                <Grid container spacing={2} rowSpacing={3}>
                    {items}
                </Grid>
           </>
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

