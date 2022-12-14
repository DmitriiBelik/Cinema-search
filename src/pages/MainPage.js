import { Container,Box } from '@mui/system';
import '../../src/App.scss'
import MainContent from '../components/mainPageContent/MainContent';

const MainPage = () => {
    return(
            <Box sx ={{ bgcolor: 'background', paddingTop:'40px', margin:'0', color:'text.primary'}}>
                <Container style={{height:"100vh",marginTop:'64px'}}>
                    <MainContent/>
                </Container>
            </Box>
    );
}

export default MainPage;