/* eslint-disable react/prop-types */
import '../../App.scss'
import { useEffect} from 'react';
import { useParams,Link } from 'react-router-dom';
import CustomButton from '../customButton/CustomButton';
import BasicRating from '../basicRating/BasicRating';
import FilmParametr from '../filmParametr/FilmParametr';
import BasicTabs from '../basicTabs/BasicTabs';
import BreadCrumbs from '../breadCrumbs/BreadCrumbs';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Paper, Grid, Typography,Chip, Slider, CircularProgress} from '@mui/material';
import { useDispatch, useSelector } from "react-redux"
import { fetchSerial } from '../../redux/FilmsSlice';
import FilmCard from '../filmCard/FIlmCard';
import { addFavorite, removeFavorite, getList } from '../../services/auth';
import { favoritesFetched, favoriteStatusFalse, favoriteStatusTrue} from "../../redux/UserSlice"

const SerialWrapper = (props) => {
    const dispatch = useDispatch();
    const { LoadingStatus} = useSelector(state => state.films);
    const {loadedSerial, serials} = useSelector(state => state.films);
    const {favorites, favoriteStatus} = useSelector(state => state.user);
    const {user} = useSelector(state => state.user);
    const {serialId} = useParams();

    const addFavoriteToDatabase = () => {
        addFavorite(props.currentUser, loadedSerial)
        console.log(loadedSerial)
        console.log(props.currentUser)
        dispatch(favoriteStatusTrue()) 
    }

    const removeFavoriteFromDatabase = () => {
        removeFavorite(props.currentUser, loadedSerial.id)
        dispatch(favoriteStatusFalse())
    }

    useEffect(() => {
        if(props.currentUser){
            getList(props.currentUser)
                .then(res => dispatch(favoritesFetched(res)))
        }
    }, [props.currentUser])
    
    useEffect(() => {
        dispatch(fetchSerial(serialId))
    }, [serialId])

    useEffect(() => {
        if(favorites.length > 0){
            favorites.forEach(serial => {
                if(serial.id === serialId){
                    dispatch(favoriteStatusTrue())
                }
            })
        }   
    }, [favorites])
    
    let content = <CircularProgress/>;
    if (LoadingStatus === "loading") {
         content = <CircularProgress/>
    } else if (LoadingStatus === "error") {
        content = <h5>???????????? ????????????????</h5>
    } else{
        content = renderSerial(loadedSerial)
    }

    function renderSerial(serial) {
        const {
            rating, title, img, seasons,trailerSrc,
            translate, age, description, duration, 
            marks, audioTarcks, subtitles, videoQuality, 
            year, Country, fullGenre, tagline, director, 
            scenario, producers, operator, composer, painter, 
            mounting, premiere, actors, dubbing, review
        } = serial 
        return(
                <>
                <BreadCrumbs category={'??????????????'} title={`${title} (${year})`}/>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Paper 
                            sx={{height:"495px", width:"330px", borderRadius: 5,}}
                            elevation={8}
                        >
                            <img style={{height:'inherit', width:'inherit', borderRadius:'20px'}} src={img}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography component={'div'} variant="h1"  fontSize={38} fontWeight={500} style={{lineHeight:'30px'}}>
                            {title} ({year})
                        </Typography>
                        <Typography component={'div'} gutterBottom={true} variant="h2" fontFamily={'Roboto Condensed'} fontSize={24} style={{opacity:"0.5", lineHeight:"18px", marginTop:"20px"}}>
                            {translate} 
                            <Chip variant="outlined" label={age} size="small" style={{margin:"0 10px", height:"18px"}}/>
                        </Typography>
                        <Typography component={'div'}  gutterBottom={true}  fontSize={18} style={{marginTop:"20px"}}>
                            {description}
                        </Typography>
                        <div style={{display:"flex", alignItems:"center", marginTop:"10px"}}>
                            <Slider disabled color={'primary'} defaultValue={95} size={'medium'} style={{width:"300px"}}/>
                            <Typography component={'div'} style={{marginLeft:"10px"}}>
                                {duration}
                            </Typography>
                        </div>
                        <div style={{display:"flex", alignItems:"center", marginTop:"10px"}}>
                            {user? (favoriteStatus == false?
                                <CustomButton onClick={addFavoriteToDatabase} variant="contained" style={{height:"39px", marginLeft:"0px"}}>
                                    <FavoriteBorderIcon fontSize='medium'/>
                                    ???????????????? ?? ??????????????????
                                </CustomButton>
                                :<CustomButton onClick={removeFavoriteFromDatabase} variant="contained" style={{height:"39px", marginLeft:"0px"}}>
                                    <FavoriteBorderIcon fontSize='medium'/>
                                    ?????????????? ???? ????????????????????
                                </CustomButton>): ''
                            }
                        </div>
                        <Typography component={'div'} style={{opacity:"0.5", marginTop:"20px"}}>
                            ????????????????????????: 
                        </Typography>
                        <Typography component={'div'} >
                            {audioTarcks}
                        </Typography>
                        <Typography component={'div'} style={{opacity:"0.5", marginTop:"20px"}}>
                            ????????????????: 
                        </Typography>
                        <Typography component={'div'}>
                            {subtitles}
                        </Typography>
                        <Typography component={'div'} style={{ marginTop:"20px", display:"flex"}}>
                            <div style={{opacity:"0.5"}}>???????????????? ??????????:</div>
                            <Chip variant="outlined" label={videoQuality} size="small" style={{margin:"0 10px", height:"18px"}}/>
                        </Typography>
                        <Typography component={'div'} variant="h6" style={{ marginTop:"20px"}}>
                            ?????????????? ??????????????
                        </Typography>
                        <BasicRating rating={rating}/> 
                    </Grid>
                    <Grid item xs>
                        <Typography  className='point' component={'span'}  fontSize={38} fontWeight={500} style={{
                            lineHeight: '30px',
                            backgroundColor: '#2AA5A0',
                            backgroundImage: 'linear-gradient(90deg, #E3535D, #2AA5A0)'
                            }}>
                            {rating}
                        </Typography>
                        <Typography component={'div'} fontFamily={'Roboto Condensed'} style={{marginTop:"10px", opacity:'0.5'}}>{marks} ????????????</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{marginTop:"20px"}}>
                    <Grid item xs>
                    <iframe style={{borderRadius:"20px"}} width="320" height="200" src={trailerSrc} title="?????????? ???? ?????????? ???3. ?????? ?????????????? ???????? ?????????? ?????? ??????????. video.js" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </Grid>
                    <Grid item xs={6} >
                        <FilmParametr param='?????? ????????????????????????' paramValue={year}/>
                        <FilmParametr param='????????????' paramValue={seasons}/>
                        <FilmParametr param='????????????' paramValue={Country}/>
                        <FilmParametr param='????????' paramValue={fullGenre}/>
                        <FilmParametr param='????????????' paramValue={tagline}/>
                        <FilmParametr param='????????????????' paramValue={director}/>
                        <FilmParametr param='????????????????' paramValue={scenario}/>
                        <FilmParametr param='????????????????' paramValue={producers}/>
                        <FilmParametr param='????????????????' paramValue={operator}/>
                        <FilmParametr param='????????????????????' paramValue={composer}/>
                        <FilmParametr param='????????????????' paramValue={painter}/>
                        <FilmParametr param='????????????' paramValue={mounting}/>
                        <FilmParametr param='???????????????? ?? ??????c????' paramValue={premiere}/>
                        <FilmParametr param='??????????????' paramValue={age}/>
                        <FilmParametr param='??????????' paramValue={duration}/>
                    </Grid>
                    <Grid item xs>
                        <Typography component={'div'} gutterBottom={true}  fontSize={18}>
                            ?? ?????????????? ??????????
                        </Typography>
                        {actors?.map((actor, i)=> {
                            return(
                                <Typography component={'div'} key={i}>{actor}</Typography>
                            )
                        })}

                        <Typography component={'div'} gutterBottom={true} style={{marginTop:"40px"}} fontSize={18}>
                            ???????? ??????????????????????
                        </Typography>
                        {dubbing?.map((actor, i)=> {
                            return(
                                <Typography component={'div'} key={i}>{actor}</Typography>
                            )
                        })}
                    </Grid>
                </Grid > 
                <BasicTabs review={review}/>
                <Typography component={'div'} variant="h5" style={{ margin:"20px 0px"}}>
                    ?????????????? ??????????????
                </Typography>
                <Grid container spacing={2} rowSpacing={3}>
                    {
                        serials.filter(item => {
                            return (item.genre.indexOf(loadedSerial.genre) > -1 && item.id !== loadedSerial.id)
                        }).map((item,i) => {
                            return(
                                <Grid className="filmGrid" key={i} item md={2}>
                                    <Link style={{textDecoration:"none"}} to={`/serials/${item.id}`}>
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
                        })
                    }
                </Grid>
            </>
        )
    }

    return(
        <>
            {content}
        </>
    )
}


export default SerialWrapper




