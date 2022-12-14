/* eslint-disable react/prop-types */
import '../../App.scss';
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import FilmCard from "../filmCard/FIlmCard"
import { Grid, Box, FormControl, InputLabel, Select, MenuItem, styled, Pagination} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {filmsUpdated, serialsUpdated} from "../../redux/FilmsSlice"

const FilmsList = ({contentName}) => {
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

    const dispatch = useDispatch();
    const {films, serials} = useSelector(state => state.films);
    
    let content = '';
    const [genre, setGenre] = useState('');
    const [sortMethod, setSortMethod] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [ItemsPerPage]=useState(12)

    const lastItemIndex = currentPage * ItemsPerPage;
    const firstItemIndex = lastItemIndex - ItemsPerPage;
    const pageCount = Math.ceil(films.length/ItemsPerPage);

    const genreChange = (event) => {
        setGenre(event.target.value);
    };

    const sortChange = (event) => {
        setSortMethod(event.target.value);
    };

    const paginationChange = (event, value) => {
        setCurrentPage( value)    
    }
  
    useEffect(() => {
        if(contentName == 'films'){
            content = films
        } else{
            content = serials
        }
        let arrayForSort = [...content]
            switch(sortMethod){
                case 'rating':
                    arrayForSort.sort((a,b) => b.rating - a.rating);
                    break;
                case 'year':
                    arrayForSort.sort((a,b) => b.year - a.year);
                    break;
                case 'title':
                    arrayForSort.sort((x, y) => x.title.localeCompare(y.title));
                    break;
            }
        if(contentName == 'films'){
            dispatch(filmsUpdated(arrayForSort))
        } else{
            dispatch(serialsUpdated(arrayForSort))
        }
    }, [sortMethod])

    
    function renderItems(arr, contentName) {
        const items = arr.filter(item => {
            return item.genre.indexOf(genre) > -1
        }).map((item,i) => {
            return(
                <Grid className="filmGrid" key={i} item md={2}>
                    <Link style={{textDecoration:"none"}} to={`/${contentName}/${item.id}`}>
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
                        <InputLabel id="demo-simple-select-label">????????</InputLabel>
                        <StyledSelect
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={genre}
                            label="genre"
                            onChange={genreChange}
                        >
                            <StyledItem value={''}>??????????</StyledItem>
                            <StyledItem value={'??????????'}>??????????</StyledItem>
                            <StyledItem value={'??????????????'}>??????????????</StyledItem>
                            <StyledItem value={'????????????????'}>????????????????</StyledItem>
                            <StyledItem value={'????????????????'}>????????????????</StyledItem>
                            <StyledItem value={'????????????????????'}>????????????????????</StyledItem>
                            <StyledItem value={'??????????????????'}>??????????????????</StyledItem>
                        </StyledSelect>
                    </FormControl>
                </Box>
                <Box sx={{width:320, marginBottom:6}}>
                    <FormControl 
                        fullWidth
                    >
                        <InputLabel id="demo-simple-select-label">????????????????????</InputLabel>
                        <StyledSelect
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sortMethod}
                            label="sortMethod"
                            onChange={sortChange}
                        >
                            <StyledItem value={'rating'}>???? ????????????????</StyledItem>
                            <StyledItem value={'year'}>???? ???????? ????????????</StyledItem>
                            <StyledItem value={'title'}>???? ????????????????</StyledItem>
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
    let chars = '';
    if(contentName =='films'){
        const currentItem = films.slice(firstItemIndex, lastItemIndex)
        chars = renderItems(currentItem, 'films')
    } else{
        const currentItem = serials.slice(firstItemIndex, lastItemIndex)
        chars = renderItems(currentItem, 'serials')
    }
    let pagination = pageCount > 1 ? <Pagination
        count={pageCount}
        variant="outlined"
        page={currentPage}
        shape="rounded"
        onChange={paginationChange}
    />: ''
    return(
        <div style={{position:"relative"}}>
            {chars}
            {pagination}
        </div>
    )
    
};

export default FilmsList

