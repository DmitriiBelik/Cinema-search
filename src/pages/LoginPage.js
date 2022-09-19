/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { login } from "../services/auth";
import { Box, Container, Typography, TextField, Button, Alert } from "@mui/material";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginPage = (props) => {

    const LoginSchema = Yup.object().shape({
        password: Yup.string().required('No password provided.').min(8, 'Too short - 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        email: Yup.string().email('Invalid email').required('Required'),
    });

    if(props.currentUser){
        return <Navigate to='/' replace/>
    }

    return(
        <Box sx ={{ bgcolor: 'background', paddingTop:'40px', margin:'0', color:'text.primary'}}>
            <Container style={{margin:"0 auto",width:"fit-content",height:"100vh"}}>
                <div className="form_wrapper" style={{marginTop:"64px"}}>
                    <Typography style={{opacity:'0.5'}}>
                        АВТОРИЗАЦИЯ
                    </Typography>
                    <Formik
                        initialValues={{
                            password: '',
                            email: '',
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={values => {
                            const result = login(values.email, values.password)
                            if(typeof result !== 'object'){
                                console.log(result)
                            }
                        }}
                    >
                        {({ errors, touched }) => (
                        <Form style={{display:"flex", flexDirection:"column"}}>
                            <Field label="E-mail" as={TextField} name="email" required style={{width:"300px", margin:"20px 0px"}}/>
                            {errors.email && touched.email ? (<Alert severity="error" style={{margin:"0px 0px 20px 0px", Maxwidth:"300px"}}>{errors.email}</Alert>) : null}
                            <Field label="Password" as={TextField} type="password" name="password" required style={{width:"300px", margin:"0px 0px 20px 0px"}}/>
                            {errors.password && touched.password ? (<Alert severity="error" style={{margin:"0px 0px 20px 0px", Maxwidth:"300px"}}>{errors.password}</Alert>) : null}
                            <Button variant="contained" type="submit" >Войти</Button>
                        </Form>
                        )}
                    </Formik>
                    <div style={{color:'#c33f49', marginTop:"20px"}} id="error-block-id"></div>
                </div>
            </Container>
        </Box>
    )
}

export default LoginPage