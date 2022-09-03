import { Box, Container, Typography, Card, CardContent,alpha, styled, Button } from "@mui/material"
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ProfilePage = () => {

    const {user} = useSelector(state => state.user)
    
    const StyledCard = styled(Card)(({ theme }) => ({
        backgroundColor: theme.palette.primary.dark,
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

    return(
        <Box sx ={{ bgcolor: 'background', paddingTop:'40px', margin:'0', color:'text.primary'}}>
            <Container style={{height:"100vh",marginTop:'64px', display:"flex", justifyContent:"space-between"}}>
                <div className="personal_information">
                    <Typography component={'div'} variant="h1"  fontSize={38} fontWeight={500} style={{lineHeight:'30px'}}>
                        Личная информация
                    </Typography>
                    <AssignmentIndIcon style={{width:"80px", height:"80px", margin:"40px 0px"}}/>
                    <Typography fontSize={18}>Электронная почта: {user.email}</Typography>
                    <Button variant="contained"><NavLink to="/logout">Выйти из аккаунта</NavLink></Button>
                </div>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <StyledCard sx={{ maxWidth: 345 }}>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Список избранного
                        </Typography>
                        <Typography variant="h5" color="text.secondary" style={{textAlign:"center"}}>
                            8
                        </Typography>
                        </CardContent>
                    </StyledCard>
                    <StyledCard sx={{ maxWidth: 345 }}  style={{marginTop:"40px"}}>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Подписка
                        </Typography>
                        <Typography variant="h5" color="text.secondary" style={{textAlign:"center"}}>
                            Не оформлена
                        </Typography>
                        </CardContent>
                    </StyledCard>
                </div>
            </Container>
        </Box>
    )
}

export default ProfilePage