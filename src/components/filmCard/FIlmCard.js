/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Badge } from '@mui/material';


const FilmCard = ({title, genre, rating, img}) => {
    return (
             <Badge badgeContent={rating} color="success" horizontal="left" anchorOrigin={{horizontal:"left", vertical: 'top'}} >
             <Card sx={{Width:'100%',  height:'280px', bgcolor: 'primary.dark',  borderRadius:'20px' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="220"
                    image={img}
                    alt={title}
                />
                <CardContent>
                    <Typography  variant="h5" component="div" fontSize="14px" >
                        {title}
                    </Typography>
                    <Typography align="justify"  color="text.primary" fontSize="12px" style={{opacity:"0.7"}}>
                        {genre}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        </Badge>
      );
}

export default FilmCard