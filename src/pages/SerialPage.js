/* eslint-disable react/prop-types */
import SerialWrapper from "../components/serialWrapper/SerialWrapper";
import { Container, Box } from "@mui/material";

const SerialPage = (props) => {
    return(
            <Box sx ={{ bgcolor: 'background', paddingTop:'40px', margin:'0', color:'text.primary'}}>
                <Container style={{minHeight:'120vh', marginTop:'64px'}}>
                    <SerialWrapper currentUser={props.currentUser} contentName='films'/>
                </Container>
            </Box>
    );
}

export default SerialPage;