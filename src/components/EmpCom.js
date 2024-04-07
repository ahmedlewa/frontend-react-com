import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Table, TableBody, TableCell, Button, Typography, TableContainer, TableHead, TableRow, Paper, Box, TextField, Modal, Snackbar, Alert } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typeahead } from 'react-bootstrap-typeahead';

function EmpCom() {
    const [data, setData] = useState([])
    const { id } = useParams()
    const [nextUrl, setNextUrl] = useState()
    const [previousUrl, setPreviousUrl] = useState()
    const [search, setSearch] = useState('')
    const [govFilter, setGovFilter] = useState('')
    const [coms, setComs] = useState('')
    const navigate = useNavigate()
    console.log(id);

    const [empName, setEmpName] = useState('')
    const [empBirth, setEmpBirth] = useState('')
    const [empMother, setEmpMother] = useState('')
    const [empStatus, setEmpStatus] = useState('')
    const [empDep, setEmpDep] = useState('')
    const [empGov, setEmpGov] = useState('')
    const [empAddress, setEmpAddress] = useState('')
    const [empPhone, setEmpPhone] = useState('')
    const [empNote, setEmpNote] = useState('')
    const [empCom, setEmpCom] = useState('')


    const [openSnake,setOpenSnake]=useState(false)
    const[message,setMessage]=useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        let formField = new FormData()
        formField.append('label', empName)
        formField.append('emp_birth', empBirth)
        formField.append('emp_mother', empMother)
        formField.append('emp_status', empStatus)
        formField.append('emp_dep', empDep)
        formField.append('emp_gov', empGov)
        formField.append('emp_address', empAddress)
        formField.append('emp_phone', empPhone)
        formField.append('emp_note', empNote)
        formField.append('emp_com', empCom[0].id)
        const res= await axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/empcom/',
            headers: { 'content-type': 'multipart/form-data' },
            data: formField
        })
        if(res.status===201){
            setOpenSnake(true)
            setMessage('تمت اضافة موظف')
            handleClose()
        }
    }






    const getComs = async () => {
        const res = await axios.get('http://127.0.0.1:8000/coms/')
        setComs(res.data)
    }

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const getAgents = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/empcom/?emp_com=${id}&emp_gov=${govFilter}&search=${search}`)
        setNextUrl(res.data.next)
        setPreviousUrl(res.data.previous)
        setData(res.data.results)
    }
    const paginationHandler = (url) => {
        try {
            axios.get(url)
                .then((res) => {
                    setNextUrl(res.data.next)
                    setPreviousUrl(res.data.previous)
                    setData(res.data.results)
                })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAgents()
        getComs()
    }, [id, search, govFilter])
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        mb: 2,
        display: "flex",
        flexDirection: "column",
        height: 575,
        overflow: "hidden",
        overflowY: "scroll",

    };
    return (
        <div>

            <Box
                sx={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 1500,
                    p: 4,
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 500,
                    marginTop: '-55px',
                    marginLeft: '80px'

                }}
            >
                <Button variant="contained" color="success" sx={{ marginRight: '160px', fontWeight: 'bold', fontSize: '20px', marginTop: '', width: '150px', marginLeft: '1100px' }} onClick={handleOpen}>اضافة وكيل</Button>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"

                >

                    <Box sx={style}>
                        <form onSubmit={handleSubmit}>
                        <Box
              sx={{
                bgcolor: 'background.paper',
                m: 1,
                border: 1,
                width: '750px',
                height: '420px',
                marginLeft: '-10px'
              }}>
               <TextField sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="اسم الموظف" onChange={e => setEmpName(e.target.value)} variant="outlined" />
               <TextField sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="تاريخ الميلاد" variant="outlined" onChange={e => setEmpBirth(e.target.value)} />
               <TextField sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="اسم الام" onChange={e => setEmpMother(e.target.value)} variant="outlined" />
               <TextField sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="القسم" onChange={e => setEmpDep(e.target.value)} variant="outlined" />
               <TextField sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="الحالة الاجتماعية واسم الزوج" onChange={e => setEmpStatus(e.target.value)} variant="outlined" />
                                <select onChange={e => setEmpGov(e.target.value)}
                                    style={{ marginLeft: '25px', marginTop: '20px', width: '350px',height:'60px' }}>
                                    <option label='المحافظة'></option>
                                    <option>بغداد</option>
                                    <option>البصرة</option>
                                    <option>نينوى</option>
                                    <option>الأنبار</option>
                                    <option>كربلاء</option>
                                    <option>النجف</option>
                                    <option>ميسان</option>
                                    <option>تكريت</option>
                                    <option>بابل</option>
                                    <option>القادسية</option>
                                    <option>ميسان</option>
                                    <option>المثنى</option>
                                    <option>واسط</option>
                                    <option>كركوك</option>
                                    <option>أربيل</option>
                                    <option>دهوك</option>
                                    <option>السليمانية</option>
                                    <option>ديالى</option>
                                </select>
                                <TextField id="outlined-basic" sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} onChange={e => setEmpAddress(e.target.value)} label="العنوان" variant="outlined" />
                                <TextField sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="رقم الهاتف" variant="outlined" onChange={e => setEmpPhone(e.target.value)} />
                                <Typeahead
                                    style={{ marginLeft: '10px',height:'60px', marginTop: '20px', width: '350px' }}
                                    placeholder="شركة الاتصال"
                                    onChange={setEmpCom}
                                    options={coms}
                                    selected={empCom}

                                />
                                <TextField sx={{ marginLeft: '385px', marginTop: '-60px', width: '350px' }} id="outlined-basic" label="الملاحظات" variant="outlined" onChange={e => setEmpNote(e.target.value)} />
                </Box>
                           
                                
                       
                        
                            <div>
                                <Button type='submit' sx={{ marginTop: '20px', marginLeft: '350px' }} variant="contained" color="success">اضافة</Button>
                            </div>

                        </form>
                    </Box>

                </Modal>


                <TextField
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ width: '150px', marginTop: '-60px' }}
                />



                <Typography sx={{ fontWeight: 'bold', fontSize: '50px', marginLeft: '600px', marginTop: '-65px' }}>موظفي الشركات</Typography>

            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 1800,
                    p: 4,
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 800,
                    marginTop: '84px'

                }}
            >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead sx={{ background: 'black' }}>
                            <TableRow>
                                <TableCell sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>اسم الموظف</TableCell>
                                <TableCell sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>تاريخ الميلاد</TableCell>
                                <TableCell sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>اسم الام</TableCell>
                                <TableCell sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>الحالة الاجتماعية</TableCell>
                                <TableCell sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>القسم والمنصب</TableCell>
                                <TableCell sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>رقم الهاتف</TableCell>
                                <TableCell sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>العنوان</TableCell>
                                <TableCell sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}><select value={search} onChange={e => setGovFilter(e.target.value)}>
                                    <option>المحافظة</option>
                                    <option>بغداد</option>
                                    <option>البصرة</option>
                                    <option>نينوى</option>
                                    <option>الأنبار</option>
                                    <option>كربلاء</option>
                                    <option>النجف</option>
                                    <option>ميسان</option>
                                    <option>تكريت</option>
                                    <option>بابل</option>
                                    <option>القادسية</option>
                                    <option>ميسان</option>
                                    <option>المثنى</option>
                                    <option>واسط</option>
                                    <option>كركوك</option>
                                    <option>أربيل</option>
                                    <option>دهوك</option>
                                    <option>السليمانية</option>
                                    <option>ديالى</option>
                                </select></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {data.map((e) => (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', '&:hover': { backgroundColor: 'gray' } }}
                                    onClick={() => navigate(`${e.id}-empD`)}
                                >
                                    <TableCell sx={{ textAlign: 'center' }}>{e.label}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{e.emp_birth}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{e.emp_mother}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{e.emp_status}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{e.emp_dep}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{e.emp_phone}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{e.emp_address}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{e.emp_gov}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Snackbar open={openSnake} autoHideDuration={6000}>
                        <Alert severity='success'>{message}</Alert>
                    </Snackbar>
                </TableContainer>
                {previousUrl &&
                    <Button variant="contained" sx={{ width: '150px', marginLeft: '750px', marginTop: '30px', backgroundColor: 'black' }} onClick={() => paginationHandler(previousUrl)} startIcon={<ArrowBackIcon />}>
                        السابق
                    </Button>
                }
                {nextUrl &&
                    <Button variant="contained" sx={{ width: '150px', marginLeft: '750px', marginTop: '30px', backgroundColor: 'black' }} onClick={() => paginationHandler(nextUrl)} startIcon={<ArrowForwardIcon />}>
                        القادم
                    </Button>
                }
            </Box>
        </div>
    )
}

export default EmpCom