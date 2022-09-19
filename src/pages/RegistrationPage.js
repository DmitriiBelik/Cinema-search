/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { register } from "../services/auth";
import { Box, Container, Typography, TextField, Button, Alert } from "@mui/material";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


const RegistrationPage = (props) => {

    const RegisterSchema = Yup.object().shape({
        password: Yup.string().required('No password provided.').min(8, 'Too short - 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        repeatPassword: Yup.string().required('No password provided.').min(8, 'Too short - 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.') .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
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
                        РЕГИСТРАЦИЯ
                    </Typography>
                    <Formik
                        initialValues={{
                            password: '',
                            email: '',
                        }}
                        validationSchema={RegisterSchema}
                        onSubmit={values => {
                            const result = register(values.email, values.password)
                            if(typeof result !== 'object'){
                                console.log(result)
                            }
                        }}
                    >
                        {({ errors, touched }) => (
                        <Form style={{display:"flex", flexDirection:"column"}}>
                            <Field as={TextField} label="E-mail" name="email" required style={{width:"300px", margin:"20px 0px"}}/>
                            {errors.email && touched.email ? (<Alert severity="error" style={{margin:"0px 0px 20px 0px", Maxwidth:"300px"}}>{errors.email}</Alert>) : null}
                            <Field as={TextField} label="Password" type="password" name="password" required style={{width:"300px", margin:"0px 0px 20px 0px"}}/>
                            {errors.password && touched.password ? (<Alert severity="error" style={{margin:"0px 0px 20px 0px", Maxwidth:"300px"}}>{errors.password}</Alert>) : null}
                            <Field as={TextField} label="Password repeat" type="password" name="repeatPassword" required style={{width:"300px", margin:"0px 0px 20px 0px"}}/>
                            {errors.repeatPassword && touched.repeatPassword ? (<Alert severity="error" style={{margin:"0px 0px 20px 0px", Maxwidth:"300px"}}>{errors.repeatPassword}</Alert>) : null}
                            <Button variant="contained" type="submit" >Зарегистрироваться</Button>
                        </Form>
                        )}
                    </Formik>
                </div>
            </Container>
        </Box>
    )
}

export default RegistrationPage