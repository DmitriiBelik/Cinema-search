/* eslint-disable react/prop-types */
import {Box, Rating, styled} from '@mui/material';
import { useState } from 'react';

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconFilled': {
      color: theme.palette.text.primary
    },
    '& .MuiRating-iconEmpty':{
        color: theme.palette.primary.dark
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
}));


const BasicRating = ({rating}) => {
    const [value] = useState(+rating);

    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
        <StyledRating
            max={10}
            size='large'
            name="simple-controlled"
            value={value}
            readOnly 
        />
        </Box>
    );
}

export default BasicRating