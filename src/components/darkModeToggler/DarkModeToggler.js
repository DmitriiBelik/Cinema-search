/* eslint-disable react/prop-types */

import { createContext,useContext, useState, useMemo } from 'react';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { blueGrey} from '@mui/material/colors';

const ColorModeContext = createContext({ toggleColorMode: () => {} });
const DarkModeToggler = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return(
            <Box
            sx={{
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                display: 'flex',
                width: '60px',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'primary.dark',
                color: 'text.primary',
                borderRadius: 2,
                height:'10px',
                p: 2,
            }}
        >
            <IconButton  onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Box>
    );
}

const ToggleColorMode = ({children}) => {
    const [mode, setMode] = useState('light');
    const colorMode = useMemo(
        () => ({
          toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
          },
        }),
        [],
    );
    const theme = useMemo(
        () =>
          createTheme({
            palette: {
                mode, ...(mode === 'light' ? {
                    primary: {
                        main:'#263238',
                        light:'#4f5b62',
                        dark:'#000a12'
                    },
                    secondary: {
                        main:'#546e7a'
                    },
                    background:'#0b131c',
                    divider: blueGrey[900],
                    text: {
                        primary: '#ffffff',
                        secondary: '#718792',
                    },
                }
                : {
                    primary: {
                        main:'#e0f7fa',
                        light:'#ffffff',
                        dark:'#aec4c7'
                    },
                    secondary: {
                        main:'#cfd8dc',
                        light: '#ffffff',
                        dark: '#9ea7aa'
                    },
                    background:'#fafafa',
                    divider: '#cfd8dc',
                    text: {
                        primary: '#546e7a',
                        secondary: '#000000',
                    },
                }),
            },
            typography:{
                fontFamily:'Rubik'
            }
        },
    ),
        [mode],
);
    return(
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <DarkModeToggler />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default ToggleColorMode