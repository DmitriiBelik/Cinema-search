import { Container,Box } from '@mui/system';
import '../../src/App.scss'
import FilmsList from '../components/filmsList/FilmsList';

const FilmsPage = () => {
    return(
            <Box sx ={{ bgcolor: 'background', paddingTop:'40px', margin:'0', color:'text.primary'}}>
                <Container style={{height:"100vh",marginTop:'64px'}}>
                    <FilmsList contentName='films'/>
                </Container>
            </Box>
    );
}

export default FilmsPage;