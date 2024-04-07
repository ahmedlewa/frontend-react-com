import React, { useEffect, useState } from 'react'
import { Box, Typography, Paper, Snackbar, TableContainer, TableHead, TableRow, Alert, Modal, Table, Autocomplete, TextField, TableCell, TableBody, Button } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router-dom'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import AttachmentIcon from '@mui/icons-material/Attachment';

function PosDetails() {
  const [posData, setPosData] = useState('')
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [imageID, setImageID] = useState()
  const [attachment, setAttachment] = useState()

  const [openDelete, setOpenDelete] = useState(false)
  const handleOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)



  const [loading, setLoading] = useState(false)


  const [openAtt, setOpenAtt] = useState(false);
  const handleOpenAtt = () => setOpenAtt(true);
  const handleCloseAtt = () => setOpenAtt(false);



  const [openUpload, setOpenUpload] = useState(false);
  const handleOpenUpload = () => setOpenUpload(true)

  const handleCloseUpload = () => setOpenUpload(false);



  const [openEdite, setOpenEdite] = useState(false);
  const handleOpenEdit = (id) => {
    setOpenEdite(true)
    setImageID(id)
  }


  const handleCloseEdit = () => setOpenEdite(false);

  const [openDeleteAttach, setOpenDeleteAttach] = useState(false);
  const handleOpenDeleteAttach = (id) => {
    setOpenDeleteAttach(true)
    setImageID(id)
  }
  const handleCloseDeleteAttach = () => setOpenDeleteAttach(false)










  const [posUpload, setPosUpload] = useState('')

  const [message, setMessage] = useState('')
  const [snakeDelete, setSnakeDelete] = useState(false)
  const [snakeEdite, setSnakeEdite] = useState(false)


  const [posTite, setPosTitle] = useState('')
  const [attach, setAttach] = useState([])

  const [getFile, setGetFile] = useState([{}])


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

  const [atta, setAtta] = useState([])

  const [attName, setAttName] = useState('')





  const handleDeleteAttachment = async () => {
    await axios.delete(`http://127.0.0.1:8000/posattedit/${imageID}/`)
  }





  const handleEdite = async (e) => {
    e.preventDefault()
    let formField = new FormData()
    formField.append('attachment', attachment)
    formField.append("pos", id)
    const res = await axios({
      method: 'PUT',
      url: `http://127.0.0.1:8000/posattedit/${imageID}/`,
      headers: { 'content-type': 'multipart/form-data' },
      data: formField,
    })



  }




  const getUpdate = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/pos/${id}/`)
    setOwnerName(res.data.owner_name);
    setDataBirth(res.data.date_birth);
    setMotherName(res.data.mother_name)
    setGov(res.data.gov)
    setAddress(res.data.address)
    setPosName(res.data.label)
    setPosAddress(res.data.pos_address)
    setPhoneNumber(res.data.number_phone)
    setSucurty(res.data.securty)
    setDataBook(res.data.securty)
    setBookNumber(res.data.book_numb)
    setResBook(res.data.date_book)
    setDataResBook(res.data.res_book)
    setAsiaAgent(res.data.date_book_res)
    setKorekAgent(res.data.asia_agent)
    setZainAgent(res.data.korek_agent)
    setAsiaActive(res.data.asia_active)
    setKorekActive(res.data.korek_active)
    setZainActive(res.data.zain_active)
  }


  const getPos = async () => {
    const res = await axios.get('http://127.0.0.1:8000/pos/',)
    setPosUpload(res.data.results)
    console.log(res.data);
  }



  const { id } = useParams()


  const posGet = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/pos/${id}/`)
    if (res.status === 200) {
      //setPosUpload(res.data)
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    let formField = new FormData()
    formField.append('attachment', attach)
    formField.append('pos', posTite[0].id)
    await axios({
      method: 'POST',
      url: `http://127.0.0.1:8000/posatt/`,
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: formField,
    })
  }

  const getPosData = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/pos/${id}/`)
    setPosData(res.data)
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
      method: 'PATCH',
      url: `http://127.0.0.1:8000/pos/${id}/`,
      headers: { 'content-type': 'multipart/form-data' },
      data: formField,
    })
    if (res.status === 200) {
      setMessage('تم تعديل المعلومات')
      setSnakeEdite(true)
      handleClose()
    }

  }


  console.log(posData.number_phone)
  const handleDelete = async (e) => {
    const res = await axios.delete(`http://127.0.0.1:8000/pos/${id}/`).then(
      setMessage('تم حذف البيانات'),
      setSnakeDelete(true),
      handleCloseDelete(),
      console.log('حذف')
    )

  }



  const getAtt = async (e) => {
    const res = await axios.get(`http://127.0.0.1:8000/posatt/?pos=${id}`)
    setAtta(res.data)
    setAttName(res.data)
    console.log(res.data)
    setLoading(false)

  }




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
    height: 900,
    overflow: "hidden",
    overflowY: "scroll",

  };
  const styleDelete = {
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
    height: 200,
    overflow: "hidden",
    overflowY: "scroll",

  };

  const style2 = {
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
    height: 200,
    overflow: "hidden",
    overflowY: "scroll",

  };
  useEffect(() => {
    getPosData()
    posGet()
    getUpdate()
    getAtt()
    getPos()



  }, [])
  return (loading ? (<div>isLoading</div>) :
    <div style={{ marginTop: '200px' }}>

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


              <TextField id="outlined-basic" value={ownerName} sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} label="اسم صاحب النقطة" variant="outlined" onChange={(e) => setOwnerName(e.target.value)} />


              <TextField id="outlined-basic" value={dataBirth} sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} label="تاريخ الميلاد" variant="outlined" onChange={(e) => setDataBirth(e.target.value)} />


              <TextField id="outlined-basic" value={motherName} sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} label="اسم الام" variant="outlined" onChange={(e) => setMotherName(e.target.value)} />





              <TextField id="outlined-basic" value={address} sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} label="العنوان" variant="outlined" onChange={(e) => setAddress(e.target.value)} />


              <TextField id="outlined-basic" value={phoneNumber} sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} label="رقم الهاتف" variant="outlined" onChange={(e) => setPhoneNumber(e.target.value)} />

              <TextField id="outlined-basic" value={asiaActive} sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} label="خط تفعيل اسياسيل" variant="outlined" onChange={(e) => setAsiaActive(e.target.value)} />

              <TextField id="outlined-basic" value={korekActive} sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} label="خط تفعيل كورك" variant="outlined" onChange={(e) => setKorekActive(e.target.value)} />

              <TextField id="outlined-basic" value={zainActive} sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} label="خط تفعيل زين العراق" variant="outlined" onChange={(e) => setZainActive(e.target.value)} />
            </Box>



            <Box
              sx={{
                bgcolor: 'background.paper',
                m: 1,
                border: 1,
                width: '750px',
                height: '250px',
                marginLeft: '-10px'
              }}>
              <TextField id="outlined-basic" value={posName} sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} label="اسم النقطة" variant="outlined" onChange={(e) => setPosName(e.target.value)} />
              <TextField id="outlined-basic" value={posAddress} sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} label="عنوان النقطة" variant="outlined" onChange={(e) => setPosAddress(e.target.value)} />
              <TextField id="outlined-basic" value={gov} label="المحافظة" sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} variant="outlined" onChange={(e) => setGov(e.target.value)} />
              <TextField id="outlined-basic" value={asiaAgent} sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} label="وكيل اسياسيل" variant="outlined" onChange={(e) => setAsiaAgent(e.target.value)} />
              <TextField id="outlined-basic" value={korekAgent} sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} label="وكيل كورك" variant="outlined" onChange={(e) => setKorekAgent(e.target.value)} />
              <TextField id="outlined-basic" value={zainAgent} sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} label="وكيل زين" variant="outlined" onChange={(e) => setZainAgent(e.target.value)} />
            </Box>

            <Box
              sx={{
                bgcolor: 'background.paper',
                m: 1,
                border: 1,
                width: '750px',
                height: '250px',
                marginLeft: '-10px'
              }}>


              <TextField id="outlined-basic" sx={{ marginLeft: '10px', marginTop: '20px', width: '730px' }} value={securty} label="التدقيق الامني" variant="outlined" onChange={(e) => setSucurty(e.target.value)} />
              <TextField  value={bookNumber} sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} id="outlined-basic" label="رقم الكتاب الصادر" variant="outlined" onChange={(e) => setBookNumber(e.target.value)} />
              <TextField id="outlined-basic" value={dataBook } sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} label=" تاريخ الكتاب الصادر" variant="outlined" onChange={(e) => setDataBook(e.target.value)} />
              <TextField sx={{ marginLeft: '10px', marginTop: '20px', width: '350px' }} value={resBook} id="outlined-basic" label="رقم الكتاب الوارد" variant="outlined" onChange={(e) => setResBook(e.target.value)} />
              <TextField id="outlined-basic" value={dataResBook} sx={{ marginLeft: '25px', marginTop: '20px', width: '350px' }} label="تاريخ الكتاب الوارد" variant="outlined" onChange={(e) => setDataResBook(e.target.value)} />
            </Box>












      
   



            <div>
              <Button type='submit' sx={{ marginTop: '20px', marginLeft: '370px',fontWeight: 'bold', fontSize: '20px', }} variant="contained" color="success">تعديل</Button>
            </div>
          </form>
        </Box>

      </Modal>
      <Box sx={{
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
        width: '114rem',
        height: '6rem',
        marginTop: '-90px'
      }} >
        <Typography variant="h2" sx={{ marginLeft: '50rem', marginTop: '20px' }} gutterBottom>
          {posData.label}
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          m: 1,
          border: 1,
          width: '114rem',
          height: '28rem',
          marginLeft: '10px'
        }}
      >




        <Card sx={{ width: '1820px', height: '445px', }}>
          <CardContent>
            <Typography sx={{ fontSize: 25, textAlign: 'right' }} color="text.secondary" gutterBottom>
              معلومات النقطة
            </Typography>
          </CardContent>
          <TableContainer component={Paper} sx={{ width: '300' }}>
            <Table sx={{ minWidth: 100 }}>
              <TableBody sx={{ fontSize: '20px' }}>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{posData.label}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">اسم نقطة البيع</TableCell>
              </TableBody>
              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{posData.gov}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">المحافظة</TableCell>
              </TableBody>

              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{posData.pos_address}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">عنوان نقطة البيع</TableCell>
              </TableBody>

              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{posData.asia_agent}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">وكيل اسياسيل</TableCell>
              </TableBody>
              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{posData.korek_agent}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">وكيل كورك</TableCell>
              </TableBody>

              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{posData.zain_agent}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">وكيل زين العراق</TableCell>
              </TableBody>













            </Table>

          </TableContainer>
        </Card>


      </Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          m: 1,
          border: 1,
          width: '114rem',
          height: '35.5rem',
          marginLeft: '10px'
        }}
      >




        <Card sx={{ width: '1820px', height: '565px', }}>
          <CardContent>
            <Typography sx={{ fontSize: 25, textAlign: 'right' }} color="text.secondary" gutterBottom>
              معلومات صاحب النقطة
            </Typography>
          </CardContent>
          <TableContainer component={Paper} sx={{ width: '300' }}>
            <Table sx={{ minWidth: 100 }}>
              <TableBody sx={{ fontSize: '20px' }}>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{posData.owner_name}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">اسم صاحب النقطة</TableCell>
              </TableBody>


              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{posData.date_birth}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">تاريخ الميلاد</TableCell>
              </TableBody>

              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{posData.mother_name}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">اسم الام</TableCell>
              </TableBody>

              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{posData.address}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">العنوان</TableCell>
              </TableBody>
              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{posData.number_phone}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">رقم الهاتف</TableCell>
              </TableBody>
              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{posData.asia_active}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">خط تفعيل اسياسيل</TableCell>
              </TableBody>

              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{posData.korek_active}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">خط تفعيل كورك</TableCell>
              </TableBody>

              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{posData.zain_active}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">خط تفعيل زين العراق</TableCell>
              </TableBody>

            </Table>
          </TableContainer>
        </Card>


      </Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          m: 1,
          border: 1,
          width: '114rem',
          height: '24.3rem',
          marginLeft: '10px'
        }}
      >




        <Card sx={{ width: '1820px', height: '385px', }}>
          <CardContent>
            <Typography sx={{ fontSize: 25, textAlign: 'right' }} color="text.secondary" gutterBottom>
              معلومات الامنية
            </Typography>
          </CardContent>
          <TableContainer component={Paper} sx={{ width: '300' }}>
            <Table sx={{ minWidth: 100 }}>
              <TableBody sx={{ fontSize: '20px' }}>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{posData.securty}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">التدقيق الامني</TableCell>
              </TableBody>


              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{posData.book_numb}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">رقم الكتاب المرسل</TableCell>
              </TableBody>

              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{posData.date_book}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">تاريخ الكتاب المرسل</TableCell>
              </TableBody>

              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{posData.res_book}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">رقم الكتاب المستلم</TableCell>
              </TableBody>

              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{posData.date_book_res}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">تارخ الكتاب المستلم</TableCell>
              </TableBody>




            </Table>
          </TableContainer>
        </Card>


      </Box>
      <Box sx={{
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
        width: '114rem',
        height: '6rem',
        marginTop: '30px',
        position: 'relative',
        top: 'px'
      }} >


        <Button onClick={handleOpen} variant="outlined" sx={{ marginLeft: '700px', marginTop: '30px', fontWeight: 'bold', fontSize: '20px', }}>تعديل المعلومات <EditIcon></EditIcon></Button>
        <Button onClick={handleOpenDelete} variant="outlined" color="error" sx={{ marginLeft: '1000px', marginTop: '-80px', fontWeight: 'bold', fontSize: '20px', }}> حذف البيانات<DeleteIcon></DeleteIcon></Button>
        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleDelete}>
            <Typography id="modal-modal-title" variant="h6" sx={{ textAlign: 'center' }} component="h2">
              هل تريد حذف البيانات
            </Typography>
            <Button variant="outlined" onClick={handleDelete} sx={{ width: '200px', position: 'absolute', top: '100px', left: '90px', fontWeight: 'bold', fontSize: '20px' }} color="error">نعم <DeleteIcon></DeleteIcon></Button>
            <Button onClick={handleCloseDelete} sx={{ width: '200px', position: 'absolute', top: '100px', left: '410px', fontWeight: 'bold', fontSize: '20px', }} variant="outlined">لا</Button>

          </Box>
        </Modal>


      </Box>

      <Box sx={{
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
        width: '114rem',
        height: '6rem',
        marginTop: '30px',
        position: 'relative',
        top: 'px'
      }} >

        <Typography variant="h2" sx={{ marginLeft: '50rem', marginTop: '10px' }} gutterBottom>
          المرفقات
        </Typography>

      </Box>


      <TableContainer component={Paper} sx={{ width: '1820px', marginLeft: '13px' }}>



        <Table sx={{ minWidth: 100 }}>






          <TableBody>

            <TableCell component="th" scope="row">

              <Button onClick={handleOpenAtt}>المرفق</Button>
              <Modal
                open={openAtt}
                onClose={handleCloseAtt}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >



                <Box sx={style}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ textAlign: 'center' }}>حذف</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>تعديل</TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>اسم الملف</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {atta.map((e) =>
                          <TableRow>
                            <TableCell>
                              <Button onClick={() => handleOpenDeleteAttach(e.id)}><DeleteIcon></DeleteIcon></Button>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>

                              <Button onClick={() => handleOpenEdit(e.id)} ><EditIcon></EditIcon></Button>

                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              <a href={e.attachment.url}>{e.attachment.name}</a>
                            </TableCell>

                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>




                </Box>

              </Modal>
            </TableCell>
            <Modal
              open={openDeleteAttach}
              onClose={handleCloseDeleteAttach}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style2}>
                <Typography id="modal-modal-title" variant="h6" sx={{ textAlign: 'center' }} component="h2">
                  هل تريد حذف البيانات
                </Typography>
                <Button type='submit' variant="contained" onClick={handleDeleteAttachment} color="error" sx={{ marginTop: '30px', marginLeft: '460px', width: '150px' }}>حذف</Button>


              </Box>

            </Modal>

            <Modal
              open={openEdite}
              onClose={handleCloseEdit}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style2}>
                <form onSubmit={handleEdite}>
                  <Button type='submit' variant="contained" color="success" sx={{ marginTop: '30px', marginLeft: '260px' }}>رفع</Button>
                  <Button variant="contained" component="label" sx={{ marginTop: '30px', marginLeft: '30px' }}>
                    اختار الملف
                    <input
                      type="file"
                      className="form-control"
                      hidden
                      onChange={(e) => setAttachment(e.target.files[0])} />
                  </Button>
                </form>
              </Box>

            </Modal>



            <TableCell align="right"><Button variant="contained" color="success" sx={{ textAlign: 'right', marginRight: 'px', fontWeight: 'bold', fontSize: '20px', float: 'right', marginTop: 'px' }} onClick={handleOpenUpload}>اضافة مرفق<AttachmentIcon></AttachmentIcon></Button>
              <Modal
                open={openUpload}
                onClose={handleCloseUpload}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >



                <Box sx={style2}>
                  <form onSubmit={handleUpload}>
                    <Typeahead
                      style={{ marginTop: '20px' }}
                      placeholder="اسم نقطة البيع"
                      onChange={setPosTitle}
                      options={posUpload}
                      selected={posTite}

                    />

                    <Button type='submit' variant="contained" color="success" sx={{ marginTop: '30px', marginLeft: '260px' }}>رفع</Button>
                    <Button variant="contained" component="label" sx={{ marginTop: '30px', marginLeft: '30px' }}>
                      اختار الملف
                      <input
                        type="file"
                        className="form-control"
                        hidden
                        onChange={(e) => setAttach(e.target.files[0])} />
                    </Button>
                  </form>
                </Box>

              </Modal>

            </TableCell>
          </TableBody>

        </Table>
        <Snackbar open={snakeDelete} autoHideDuration={6000}>
          <Alert severity="error">{message}</Alert>
        </Snackbar>
        <Snackbar open={snakeEdite} autoHideDuration={6000}>
          <Alert severity="success">{message}</Alert>
        </Snackbar>
      </TableContainer>



    </div>
  )
}

export default PosDetails 