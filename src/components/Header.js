import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Tabs, IconButton, Toolbar, Tab, Menu, Select, MenuItem, Button, InputLabel, FormControl, Box } from "@mui/material";

import inss from '../image/inss.jpg'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Header = () => {
    const [coms, setComs] = useState([])
    const navigate = useNavigate()

    const getComs = async () => {
        const res = await axios.get('http://127.0.0.1:8000/coms/')
        setComs(res.data)
    }


    useEffect(() => {
        getComs()
    }, [])

    return (
        <React.Fragment>
            <AppBar sx={{ background: '#eeeeee' }}>
                <Toolbar>
                    <IconButton>
                        <Avatar sx={{ width: '50px', height: '50px' }} src={inss} />
                    </IconButton>
                    <Tabs sx={{ marginLeft: 'auto' }} textColor='inherit'>
                        <Box sx={{ minWidth: 120,marginRight:'20px' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">الوكلاء</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Age"
                                    
                                >
                                    {coms.map(e => <div><Button sx={{float:'right'}}  onClick={() => navigate(`${e.id}-agent`)}  variant="text">{e.label}</Button></div>)}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">الموظفين</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Age"
                                >
                                    {coms.map(e => <div><Button sx={{float:'right'}} onClick={() => navigate(`${e.id}-emp`)} variant="text">{e.label}</Button></div>)}
                                </Select>
                            </FormControl>
                        </Box>

                        <Tab href="/pos" sx={{ color: "black", fontSize: '20px' }} label='نقاط البيع' />
                    </Tabs>

                </Toolbar>



            </AppBar>
        </React.Fragment>
    )
}
export default Header