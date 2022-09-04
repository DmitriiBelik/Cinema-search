/* eslint-disable no-unused-vars */
import '../../App.scss';
import { Button, Typography, Toolbar, Box, AppBar, styled, alpha, Autocomplete, TextField, Avatar} from '@mui/material';
import { Container } from '@mui/system';
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import {fetchSerials, fetchFilms} from "../../redux/FilmsSlice"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';


const SearchAppBarButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledSerch = styled(Autocomplete)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor:theme.palette.divider,
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.1),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
}));


export default function SearchAppBar() {
    const dispatch = useDispatch();
    const {films, serials} = useSelector(state => state.films);
    const {user} = useSelector(state => state.user);
    const options = films.concat(serials)
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    
    useEffect(()=> {
        films.forEach((element,index) => {
            if(element.title === searchValue.title){
                navigate(`/films/${index+1}`)
                setSearchValue('')
            }
        });
    }, [searchValue])

    useEffect(() => {
      dispatch(fetchSerials())
      dispatch(fetchFilms())
    }, [])
    return (
    <Box sx={{ flexGrow: 1}}>
        <AppBar sx={{backgroundColor: 'primary.dark'}} style={{position:"fixed"}}>
        <Container style={{paddingLeft:'0', paddingRight:'0'}}>
            <Toolbar>
              <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                  <NavLink to="/">КИНО ПАРК</NavLink>
              </Typography>
              <SearchAppBarButton color={'primary'}><NavLink to="/" style={({ isActive }) => ({ color: isActive ? '#c33f49' : 'inherit' })}>Фильмы</NavLink></SearchAppBarButton>
            <SearchAppBarButton><NavLink to="/serials" style={({ isActive }) => ({ color: isActive ? '#c33f49' : 'inherit' })}>Сериалы</NavLink></SearchAppBarButton>
            <SearchAppBarButton>Премьеры</SearchAppBarButton>
            <StyledSerch
                style={{width:'320px'}}
                size='small'
                noOptionsText='Ничего не найдено'
                id="free-solo-2-demo"
                limitTags={3}
                value={searchValue}
                onChange={(event, newValue) => setSearchValue(newValue)}
                disableClearable
                options={options}
                getOptionLabel={(option) => option.title || ""}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderOption={(props, option) => (
                    <Box className='search_content' sx={{width:'100%', height:'90px', color:'#fffff', display:'flex'}} {...props}>
                      <Avatar variant="rounded" src={option.img}/>
                      <div className='search_item_wrapper' style={{marginLeft:'20px'}}>
                      <Typography fontFamily={'Roboto Condensed'} fontSize={10} style={{opacity:"0.5"}}>{option.year}</Typography>
                        <Typography>{option.title}</Typography>
                        <Typography fontFamily={'Roboto Condensed'} fontSize={10} style={{opacity:"0.5"}}>{option.genre}, {option.rating}</Typography>
                      </div>
                    </Box>
                  )}
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Фильмы, сериалы..."
                    InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    }}
                />
                )}
            />
            {user ? 
              <>
                <SearchAppBarButton style={{lineHeight:"10px"}}>
                  <NavLink to="/favorites" style={({ isActive }) => ({ color: isActive ? '#c33f49' : 'inherit' })}><FavoriteBorderOutlinedIcon fontSize='medium'/></NavLink>
                </SearchAppBarButton>
                <SearchAppBarButton style={{lineHeight:"10px"}}><NavLink to="/profile" style={({ isActive }) => ({ color: isActive ? '#c33f49' : 'inherit' })}><AccountCircleIcon/></NavLink></SearchAppBarButton>
              </> :
              <>
                <SearchAppBarButton><NavLink to="/registration" style={({ isActive }) => ({ color: isActive ? '#c33f49' : 'inherit' })}>Зарегистрироваться</NavLink></SearchAppBarButton>
                <SearchAppBarButton><NavLink to="/login" style={({ isActive }) => ({ color: isActive ? '#c33f49' : 'inherit' })}>Войти</NavLink></SearchAppBarButton>
              </>
            }
            </Toolbar>
        </Container>
        </AppBar>
    </Box>
    );
}