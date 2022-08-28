/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
            <Box sx={{ p: 3 }}>
                <Typography component={'div'}>{children}</Typography>
            </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function BasicTabs({review}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs component={'div'} value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab component={'div'} label="Обзор" {...a11yProps(0)} />
                <Tab component={'div'} label="Награды" {...a11yProps(1)} />
                <Tab component={'div'} label="Изображения" {...a11yProps(2)} />
            </Tabs>
        </Box>
        <TabPanel component={'div'} value={value} index={0}>
            <Typography component={'div'} fontSize={'16px'} style={{opacity:"0.7"}}>
                {review}
            </Typography>
        </TabPanel>
        <TabPanel component={'div'}  value={value} index={1}>
            <Typography component={'div'} fontSize={'16px'} style={{opacity:"0.7"}}>
                Оскар, 2020 год
            </Typography>
            <Typography component={'div'} fontSize={'16px'} style={{opacity:"0.7"}}>
                Золотой глобус, 2020 год
            </Typography>
            <Typography component={'div'} fontSize={'16px'} style={{opacity:"0.7"}}>
                Британская академия, 2020 год
            </Typography>
            <Typography component={'div'} fontSize={'16px'} style={{opacity:"0.7"}}>
                Премия Гильдии актеров, 2020 год
            </Typography>
        </TabPanel>
        <TabPanel component={'div'} value={value} index={2}>
            
        </TabPanel>
    </Box>
  );
}
