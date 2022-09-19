import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import FilmCard from "../filmCard/FIlmCard"
import { Grid, Typography, Button} from "@mui/material"

const MainContent = () => {
    const {films, serials} = useSelector(state => state.films);

    function renderItems(arr, type) {
        let itemsToRender = [...arr]
        const Items = itemsToRender.sort((a,b) => b.rating - a.rating).map((item,i) => {
            return(
                <Grid className="filmGrid" key={i} item md={2}>
                    <Link style={{textDecoration:"none"}} to={`/${type}/${item.id}`}>
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
           <div style={{position:"relative"}}>   
            {type == 'films'? <Typography fontSize={24} style={{margin:"40px 0px 20px"}}>Лучшие фильмы</Typography> : <Typography fontSize={24} style={{margin:"40px 0px 20px"}}>Лучшие сериалы</Typography>} 
                <Grid container spacing={2} rowSpacing={3}>
                    {Items}
                </Grid>
                {type =='films' ? 
                <Button style={{position:"absolute", right:0, top:0}} variant="text"><Link to='/films'>Все фильмы</Link></Button>
                : <Button style={{position:"absolute", right:0, top:0}} variant="text"><Link to='/serials'>Все сериалы</Link></Button>}
           </div>
        )
    }  
    const filmItems = renderItems(films, 'films')
    const serialItems = renderItems(serials, 'serials')
    return(
        <div style={{position:"relative"}}>
            {filmItems}
            {serialItems}
        </div>
    )

}

export default MainContent