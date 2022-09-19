/* eslint-disable react/prop-types */
import ItemWrapper from "../components/itemWrapper/ItemWrapper";
import { Container, Box } from "@mui/material";

const FilmPage = (props) => {
    return(
            <Box sx ={{ bgcolor: 'background', paddingTop:'40px', margin:'0', color:'text.primary'}}>
                <Container style={{minHeight:'120vh', marginTop:'64px'}}>
                    <ItemWrapper currentUser={props.currentUser} contentName='films'/>
                </Container>
            </Box>
    );
}

export default FilmPage;