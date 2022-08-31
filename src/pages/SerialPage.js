/* eslint-disable react/prop-types */
import '../../src/App.scss'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomButton from '../components/customButton/CustomButton';
import BasicRating from '../components/basicRating/BasicRating';
import FilmParametr from '../components/filmParametr/FilmParametr';
import BasicTabs from '../components/basicTabs/BasicTabs'
import BreadCrumbs from '../components/breadCrumbs/BreadCrumbs';
import useFetchService from '../services/FetchService';
import { Box, Container } from '@mui/system';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Paper, Grid, Typography,Chip, Slider, Alert, CircularProgress } from '@mui/material';

const SerialPage = () => {
    const {serialId} = useParams();
    const [serial, setSerial] = useState(null);
    const {loading, error,clearError, getSerial,} = useFetchService();
    
    useEffect(() => {
        updateFilm()
    }, [serialId])

    const updateFilm = () => {
        clearError();
        getSerial(serialId)
            .then(onFilmLoaded)
    }

    const onFilmLoaded = (film) => {
        setSerial(film);
    }

    const errorMessage = error ? <Alert severity="error">This is an error alert — check it out!</Alert> : null;
    const spinner = loading ? <CircularProgress/> : null;
    const content = !(loading || error || !serial) ? <View serial={serial}/> : null;

    return(
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({serial}) => {
    const {
        rating, title, img,
        translate, age, description, duration, 
        marks, audioTarcks, subtitles, videoQuality, 
        year, Country, fullGenre, tagline, director, 
        scenario, producers, operator, composer, painter, 
        mounting, premiere, trailerDuration, actors, trailerImg, dubbing, review, seasons
    } = serial

    return(
            <Box sx ={{bgcolor: 'background', paddingTop:'40px', margin:'0', color:'text.primary'}}>
            <Container style={{height:'100%', marginTop:'64px'}}>
                <BreadCrumbs category={'Сериалы'} title={`${title} (${year})`}/>
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
                            {title} {year}
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
                            <CustomButton size="large" variant="contained" style={{width:"300px", margin:"10px 0"}}>Смотреть сериал</CustomButton>
                            <CustomButton variant="contained" style={{height:"39px", marginLeft:"14px"}}>
                                <FavoriteBorderIcon fontSize='medium'/>
                            </CustomButton>
                        </div>
                        <Typography component={'div'} style={{opacity:"0.5", marginTop:"20px"}}>
                            Аудиодорожки: 
                        </Typography>
                        <Typography component={'div'} >
                            {audioTarcks}
                        </Typography>
                        <Typography component={'div'} style={{opacity:"0.5", marginTop:"20px"}}>
                            Субтитры: 
                        </Typography>
                        <Typography component={'div'}>
                            {subtitles}
                        </Typography>
                        <Typography component={'div'} style={{ marginTop:"20px", display:"flex"}}>
                            <div style={{opacity:"0.5"}}>Качество видео:</div>
                            <Chip variant="outlined" label={videoQuality} size="small" style={{margin:"0 10px", height:"18px"}}/>
                        </Typography>
                        <Typography component={'div'} variant="h6" style={{ marginTop:"20px"}}>
                            Рейтинг сериала
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
                        <Typography component={'div'} fontFamily={'Roboto Condensed'} style={{marginTop:"10px", opacity:'0.5'}}>{marks} оценок</Typography>
                        <CustomButton size="large" variant="contained" style={{margin:"10px 0", width:"100%"}}>Оценить сериал</CustomButton>
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{marginTop:"20px"}}>
                    <Grid item xs>
                        <Paper 
                            sx={{height:"200px", width:"330px", borderRadius: 5, position:"relative"}}
                            elevation={8}
                        >
                            <img className='trailer_poster'
                                style={{height:'inherit', width:'inherit', borderRadius:'20px'}}
                                src={trailerImg}/>
                            <Chip icon={<PlayArrowIcon/>} color='primary' label="Трейлер" style={{position:"absolute", left:"10px", bottom:"10px"}}/>
                            <Chip color='primary' label={trailerDuration} size='small' style={{position:"absolute", right:"10px", bottom:"10px"}}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} >
                        <FilmParametr param='Год производства' paramValue={year}/>
                        <FilmParametr param='Страна' paramValue={Country}/>
                        <FilmParametr param='Жанр' paramValue={fullGenre}/>
                        <FilmParametr param='Сезоны' paramValue={seasons}/>
                        <FilmParametr param='Слоган' paramValue={tagline}/>
                        <FilmParametr param='Режиссер' paramValue={director}/>
                        <FilmParametr param='Сценарий' paramValue={scenario}/>
                        <FilmParametr param='Продюсер' paramValue={producers}/>
                        <FilmParametr param='Оператор' paramValue={operator}/>
                        <FilmParametr param='Композитор' paramValue={composer}/>
                        <FilmParametr param='Художник' paramValue={painter}/>
                        <FilmParametr param='Монтаж' paramValue={mounting}/>
                        <FilmParametr param='Премьера в Росcии' paramValue={premiere}/>
                        <FilmParametr param='Возраст' paramValue={age}/>
                        <FilmParametr param='Время' paramValue={duration}/>
                    </Grid>
                    <Grid item xs>
                        <Typography component={'div'} gutterBottom={true}  fontSize={18}>
                            В главных ролях
                        </Typography>
                        {actors.map((actor, i)=> {
                            return(
                                <Typography component={'div'} key={i}>{actor}</Typography>
                            )
                        })}

                        <Typography component={'div'} gutterBottom={true} style={{marginTop:"40px"}} fontSize={18}>
                            Роли дублировали
                        </Typography>
                        {dubbing.map((actor, i)=> {
                            return(
                                <Typography component={'div'} key={i}>{actor}</Typography>
                            )
                        })}
                    </Grid>
                </Grid > 
                <BasicTabs review={review}/>
            </Container>
            </Box>
    )
}

export default SerialPage




