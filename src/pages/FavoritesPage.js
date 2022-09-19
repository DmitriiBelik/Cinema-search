/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { getList } from "../services/auth"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { favoritesFetched } from "../redux/UserSlice"
import { Grid, Box, Container, CircularProgress } from "@mui/material"
import FilmCard from "../components/filmCard/FIlmCard"
import { Link } from "react-router-dom"

const FavoritesPage = (props) => {
    const dispatch = useDispatch();
    const {favorites, loadingStatus} = useSelector(state => state.user)
    useEffect(() => {
        if(props.currentUser){
            getList(props.currentUser)
                .then(res => dispatch(favoritesFetched(res)))
        }
    }, [props.currentUser])

    function renderItems(arr){
        const items = arr.map((item,i) => {
            return(
                <Grid className="filmGrid" key={i} item md={2}>
                    <Link style={{textDecoration:"none"}} to={`/${item['type']}/${item['id']}`}>
                        <FilmCard 
                            key={item['id']}
                            title={item['title']}
                            genre={item['genre']}
                            rating={item['rating']}
                            img={item['img']}
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
    let favoritesFilms = <CircularProgress />
    if(loadingStatus =='idle'){
      favoritesFilms = renderItems(favorites)  
    }
    return(
        <Box sx ={{ bgcolor: 'background', paddingTop:'40px', margin:'0', color:'text.primary'}}>
            <Container style={{height:"100vh",marginTop:'64px'}}>
                <div style={{position:"relative"}}>
                    {favoritesFilms}
                </div>
            </Container>
        </Box>
    )
}

export default FavoritesPage