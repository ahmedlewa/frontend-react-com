import React, { useEffect, useState } from 'react'
import { Paper, Box, TableContainer, TableHead, Snackbar, Alert, TableBody, Table, Button, Modal, TableCell, TableRow, TextField, Typography, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent } from '@mui/material'
import axios from 'axios'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'
function Pos() {

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  //const [activeStep,setActiveStep]=useState(0)
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [posGove, setPosGove] = useState('')




  const [ownerName, setOwnerName] = useState('')
  const [dataBirth, setDataBirth] = useState('')
  const [motherName, setMotherName] = useState('')
  const [gov, setGov] = useState('')
  const [address, setAddress] = useState('')
  const [posName, setPosName] = useState('')
  const [posAddress, setPosAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [securty, setSucurty] = useState('')
  const [bookNumber, setBookNumber] = useState('')
  const [dataBook, setDataBook] = useState('')
  const [resBook, setResBook] = useState('')
  const [dataResBook, setDataResBook] = useState('')
  const [asiaAgent, setAsiaAgent] = useState('')
  const [korekAgent, setKorekAgent] = useState('')
  const [zainAgent, setZainAgent] = useState('')
  const [asiaActive, setAsiaActive] = useState('')
  const [korekActive, setKorekActive] = useState('')
  const [zainActive, setZainActive] = useState('')
  const [nextUrl, setNextUrl] = useState()
  const [previousUrl, setPreviousUrl] = useState()



  const [openSnake, setOpenSnake] = useState(false)
  const [message, setMessage] = useState('')






  const rows = async () => {
    await axios.get(`http://127.0.0.1:8000/pos/?gov=${posGove}&search=${search}`).then(
      res => {
        setNextUrl(res.data.next)
        setPreviousUrl(res.data.previous)
        setData(res.data.results)

      }
    )
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


  const handleSubmit = async (e) => {
    e.preventDefault()
    let formField = new FormData()
    formField.append('owner_name', ownerName)
    formField.append('date_birth', dataBirth)
    formField.append('mother_name', motherName)
    formField.append('gov', gov)
    formField.append('address', address)
    formField.append('label', posName)
    formField.append('pos_address', posAddress)
    formField.append('number_phone', phoneNumber)
    formField.append('securty', securty)
    formField.append('book_numb', bookNumber)
    formField.append('date_book', dataBook)
    formField.append('res_book', resBook)
    formField.append('date_book_res', dataResBook)
    formField.append('asia_agent', asiaAgent)
    formField.append('korek_agent', korekAgent)
    formField.append('zain_agent', zainAgent)
    formField.append('asia_active', asiaActive)
    formField.append('korek_active', korekActive)
    formField.append('zain_active', zainActive)
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/pos/',
      headers: { 'content-type': 'multipart/form-data' },
      data: formField,
    })
    if (res.status === 201) {
      setOpenSnake(true)
      setMessage('تمت الاضافة')
      handleClose()
    }

  }







  useEffect(() => {
    rows()
  }, [posGove, search])
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
    height: 700,
    overflow: "hidden",
    overflowY: "scroll",

  };
  return (

    <div>


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
          marginTop: 'px'

        }}
      >
<div style={{ marginTop: '70px' }}>
            <Button variant="contained" color="success" sx={{ fontWeight: 'bold', fontSize: '20px', marginTop: '', width: '150px', marginLeft: '1450px' }} onClick={handleOpen}>اضافة نقطة</Button>

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
                      height: '320px',
                      marginLeft: '-10px'
                    }}>
                    <TextField sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="اسم صاحب النقطة" variant="outlined" onChange={(e) => setOwnerName(e.target.value)} />
                    <TextField sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="تاريخ الميلاد" variant="outlined" onChange={(e) => setDataBirth(e.target.value)} />

                    <TextField sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="اسم الام" variant="outlined" onChange={(e) => setMotherName(e.target.value)} />




                    <TextField sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="العنوان" variant="outlined" onChange={(e) => setAddress(e.target.value)} />

                    <TextField sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="رقم الهاتف" variant="outlined" onChange={(e) => setPhoneNumber(e.target.value)} />


                    <TextField sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="خط تفعيل اسياسيل" variant="outlined" onChange={(e) => setAsiaActive(e.target.value)} />
                    <TextField sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="خط تفعيل كورك" variant="outlined" onChange={(e) => setKorekActive(e.target.value)} />
                    <TextField sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="خط تفعيل زين العراق" variant="outlined" onChange={(e) => setZainActive(e.target.value)} />


                  </Box>
                  <Box
                    sx={{
                      bgcolor: 'background.paper',
                      m: 1,
                      border: 1,
                      width: '750px',
                      height: '260px',
                      marginLeft: '-10px'
                    }}>
                    <TextField sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="اسم النقطة" variant="outlined" onChange={(e) => setPosName(e.target.value)} />
                    <TextField sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="عنوان النقطة" variant="outlined" onChange={(e) => setPosAddress(e.target.value)} />
                    <select onChange={e => setGov(e.target.value)}
                      style={{ marginLeft: '10px', marginTop: '20px', width: '360px', height: '60px' }}>
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
                    </select>
                    <TextField id="outlined-basic" sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} label="وكيل اسياسيل" variant="outlined" onChange={(e) => setAsiaAgent(e.target.value)} />
                    <TextField id="outlined-basic" sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} label="وكيل كورك" variant="outlined" onChange={(e) => setKorekAgent(e.target.value)} />
                    <TextField id="outlined-basic" sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} label="وكيل زين" variant="outlined" onChange={(e) => setZainAgent(e.target.value)} />


                  </Box>

                  <Box
                    sx={{
                      bgcolor: 'background.paper',
                      m: 1,
                      border: 1,
                      width: '750px',
                      height: '260px',
                      marginLeft: '-10px'
                    }}>

                    <TextField id="outlined-basic" label="التدقيق الامني" sx={{ marginLeft: '10px', marginTop: '20px', width: '730px' }} variant="outlined" onChange={(e) => setSucurty(e.target.value)} />
                    <TextField sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="رقم الكتاب الصادر" variant="outlined" onChange={(e) => setBookNumber(e.target.value)} />
                    <TextField sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="تاريخ الكتاب الصادر" variant="outlined" onChange={(e) => setDataBook(e.target.value)} />
                    <TextField sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="رقم الكتاب الوارد" variant="outlined" onChange={(e) => setResBook(e.target.value)} />
                    <TextField sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="تاريخ الكتاب الوارد" variant="outlined" onChange={(e) => setDataResBook(e.target.value)} />

                  </Box>



                  <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                  </div>









                  <div>
                    <Button type='submit' sx={{ marginTop: '20px', marginLeft: '370px' }} variant="contained" color="success">اضافة</Button>
                  </div>
                </form>
              </Box>

            </Modal>


            <TextField
              id="filled-search"
              label="بحث"
              type="search"
              variant="filled"

              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: '250px', marginLeft: '100px', marginTop: '-40px', textAlign: 'right', }}

            />



            <Typography sx={{ fontWeight: 'bold', fontSize: '50px', marginLeft: '800px', marginTop: '-80px' }}>نقاط البيع</Typography>

          </div>

        <TableContainer component={Paper} sx={{ marginTop: '40px', width: '1700px',height:'700px', marginLeft: '20px' }}>
          

          <Table sx={{ minWidth: 700,height:'800px', marginTop: '' }} aria-label="simple table">
            <TableHead sx={{ background: 'black' }}>
              <TableRow>
                <TableCell align='center' sx={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>مالك نقطة البيع</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }} align="center">
                  <select value={search} onChange={e => setPosGove(e.target.value)}>
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
                  </select></TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }} align="center">العنوان</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }} align="center">اسم نقطة البيع</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  onClick={() => navigate(`${row.id}`)}
                  key={row.owner_name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', '&:hover': { backgroundColor: 'gray' } }}
                >
                  <TableCell align='center' sx={{ fontSize: '17px' }}>{row.owner_name}</TableCell>
                  <TableCell align="center" sx={{ fontSize: '17px' }}>{row.gov}</TableCell>
                  <TableCell align="center" sx={{ fontSize: '17px' }}>{row.address}</TableCell>
                  <TableCell align="center" sx={{ fontSize: '17px' }}>{row.label}</TableCell>
                </TableRow>
              ))}


            </TableBody>
          </Table>
          <Snackbar open={openSnake} autoHideDuration={6000}>
            <Alert severity='success'>{message}</Alert>
          </Snackbar>


        </TableContainer>


        {previousUrl &&
          <Button variant="contained" sx={{ width: '150px', marginLeft: '820px', marginTop: '30px', backgroundColor: 'black' }} onClick={() => paginationHandler(previousUrl)} startIcon={<ArrowBackIcon />}>
            السابق
          </Button>
        }
        {nextUrl &&
          <Button variant="contained" sx={{ width: '150px', marginLeft: '820px', marginTop: '30px', backgroundColor: 'black' }} onClick={() => paginationHandler(nextUrl)} startIcon={<ArrowForwardIcon />}>
            القادم
          </Button>
        }



      </Box>

    </div>


  )
}

export default Pos