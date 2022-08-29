/* eslint-disable no-unused-vars */
import '../../App.scss';
import { Button, Typography, Toolbar, Box, AppBar, styled, alpha, Autocomplete, TextField, Avatar} from '@mui/material';
import { Container } from '@mui/system';
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';


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
    const {films} = useSelector(state => state.films);
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
                style={{width:'320px'}}
                size='small'
                noOptionsText='Ничего не найдено'
                id="free-solo-2-demo"
                limitTags={3}
                value={searchValue}
                onChange={(event, newValue) => setSearchValue(newValue)}
                disableClearable
                options={films}
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
            </Toolbar>
        </Container>
        </AppBar>
    </Box>
    );
}