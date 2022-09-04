/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { register } from "../services/auth";
import { Box, Container, Typography, TextField, Button } from "@mui/material";


const RegistrationPage = (props) => {
    let formData = {
        email: '',
        password: ''
    }

    const handleEmailChange = (event) => {
        formData.email = event.target.value
    }

    const handlePasswordChange = (event) => {
        formData.password = event.target.value
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const result = await register(formData.email, formData.password)
        
        if(typeof result !== 'object'){
            console.log(result)
        }
    }

    if(props.currentUser){
        return <Navigate to='/' replace/>
    }

    return(
        <Box sx ={{ bgcolor: 'background', paddingTop:'40px', margin:'0', color:'text.primary'}}>
            <Container style={{margin:"0 auto",width:"fit-content",height:"100vh"}}>
                <div className="form_wrapper" style={{marginTop:"64px"}}>
                    <Typography style={{opacity:'0.5'}}>
                        РЕГИСТРАЦИЯ
                    </Typography>
                    <form onSubmit={handleFormSubmit} style={{display:"flex", flexDirection:"column"}}>
                            <TextField 
                                id="outlined-basic" 
                                label="E-mail" 
                                variant="outlined" 
                                type="email"
                                onChange={handleEmailChange}
                                style={{margin:"20px 0px", width:"300px"}}
                                />
                            <TextField 
                                id="outlined-basic" 
                                label="Password" 
                                variant="outlined" 
                                type="password"
                                onChange={handlePasswordChange}
                                style={{margin:"20px 0px", width:"300px"}}
                            />

                        <Button variant="contained" type="submit" >Зарегистрироватсья</Button>
                    </form>
                </div>
            </Container>
        </Box>
    )
}

export default RegistrationPage