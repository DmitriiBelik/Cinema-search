/* eslint-disable no-unused-vars */
import '../../App.scss';
import { Button, Typography, Toolbar, Box, AppBar, styled, alpha, Autocomplete, TextField} from '@mui/material';
import { Container } from '@mui/system';
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MainPage from '../../pages/MainPage';
// import CustomButton from '../customButton/CustomButton';

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
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.1),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    '.MuiAutocomplete-listbox':{
        backgroundColor:'#d74d31'
    }

}));

export default function SearchAppBar() {
    const {films} = useSelector(state => state.films);
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState(null);
    
    useEffect(()=> {
        films.forEach((element,index) => {
            if(element.title === searchValue){
                navigate(`/films/${index+1}`)
            }
        });
    }, [searchValue])
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
                КИНО ПАРК
            </Typography>
            <SearchAppBarButton color={'primary'}>Фильмы</SearchAppBarButton>
            <SearchAppBarButton>Сериалы</SearchAppBarButton>
            <SearchAppBarButton>Премьеры</SearchAppBarButton>
            <SearchAppBarButton>Лучшие 250</SearchAppBarButton>
            <StyledSerch
                style={{width:'300px'}}
                size='small'
                noOptionsText='Ничего не найдено'
                id="free-solo-2-demo"
                value={searchValue}
                onChange={(event, newValue) => setSearchValue(newValue)}
                disableClearable
                options={films.map((option) => option.title)}
                // onOpen={
                //     event.defaultMuiPrevented = true;
                //     navigate("/films/2")
                // }
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
            </Toolbar>
        </Container>
        </AppBar>
    </Box>
    );
}