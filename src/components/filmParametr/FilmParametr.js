/* eslint-disable react/prop-types */
import { Grid, Typography } from "@mui/material"

const FilmParametr = ({param, paramValue}) => {
    return(
        <Grid style={{marginBottom:"20px"}} container spacing={3}>
            <Grid item md={4}>
                <Typography style={{opacity:"0.5"}}>
                    {param}
                </Typography>
            </Grid>
            <Grid item md={8}>
                <Typography>
                    {paramValue}
                </Typography>
            </Grid>
        </Grid>
)
}

export default FilmParametr