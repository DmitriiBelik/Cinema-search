/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { register } from "../services/auth";
import { Box, Container, Typography } from "@mui/material";


const RegistrationPage = (props) => {
    let formData = {
        email: '',
        password: ''
    }

    // const clearFormData = () => {
    //     formData.email = '';
    //     formData.password = ''
    // }

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
                        Заполните регистрационную форму 
                    </Typography>
                    <form onSubmit={handleFormSubmit}>
                        <div className="field">
                            <label className="label">Адрес электронной почты</label>
                            <div className="control">
                                <input 
                                    type="email" 
                                    className="input"
                                    onChange={handleEmailChange}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Пароль</label>
                            <div className="control">
                                <input 
                                    type="password" 
                                    className="input"
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <input 
                                    type="reset" 
                                    className="input"
                                    value="Сброс"
                                />
                            </div>
                        </div>

                        <div className="control">
                            <input 
                                type="submit" 
                                className="button"
                                value="Зарегистрироваться"
                            />
                        </div>
                    </form>
                </div>
            </Container>
        </Box>
    )
}

export default RegistrationPage