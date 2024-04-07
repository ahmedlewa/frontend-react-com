import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, Button, Typography, TableContainer, TableHead, TableRow, Paper, Box, TextField, Modal, Card, CardContent, Snackbar, Alert } from '@mui/material'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Typeahead } from 'react-bootstrap-typeahead';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function EmpAgentDetails() {
  const { id } = useParams()
  const [data, setData] = useState([])


  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [openSnake, setOpenSnake] = useState(false)
  const [openSnakeDelete, setOpenSnakeDelete] = useState(false)
  const [message, setMessage] = useState('')




  const [openAtt, setOpenAtt] = useState(false);
  const handleOpenAtt = () => setOpenAtt(true);
  const handleCloseAtt = () => setOpenAtt(false);



  const [openDelete, setOpenDelete] = useState(false)
  const handleOpenDeleteData = () => setOpenDelete(true)
  const handleCloseDeleteData = () => setOpenDelete(false)



  const [openAttEdit, setOpenAttEdite] = useState(false);
  const handleOpenAttEdite = (id) => {
    setOpenAttEdite(true)
    setImageID(id)
  }
  const handleCloseAttEdite = () => setOpenAttEdite(false);

  const [openDeleteAttachment, setOpenDeleteAttachment] = useState(false)
  const handleOpenDelete = (id) => {
    setOpenDeleteAttachment(true)
    setImageID(id)
  }
  const handleCloseDeleteAttachment = () => setOpenDeleteAttachment(false)

  const [openUpload, setOpenUpload] = useState(false);
  const handleOpenUpload = () => setOpenUpload(true);
  const handleCloseUpload = () => setOpenUpload(false);

  const [empAgentTitle, setEmpAgentTitle] = useState('')
  const [attach, setAttach] = useState([])

  const [agent, setAgent] = useState('')

  const [attachment, setAttachment] = useState([])

  const [imageID, setImageID] = useState()

  const [editeAttachment, setEditeAttachment] = useState()


  const getData = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/empagent/${id}`)
    setData(res.data)
    setEmpName(res.data.emp_name)
    setEmpBirth(res.data.emp_birth)
    setEmpMother(res.data.emp_mother)
    setEmpStatus(res.data.emp_status)
    setEmpDep(res.data.emp_dep)
    setEmpGov(res.data.emp_gov)
    setEmpAddress(res.data.emp_address)
    setEmpPhone(res.data.emp_phone)
    setEmpNote(res.data.emp_note)
  }
  const getAtt = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/empagentatt/?employee=${id}`)
    setAttachment(res.data)
    console.log(res.data)
  }


  const deleteData = async () => {
    await axios.delete(`http://127.0.0.1:8000/empagent/${id}/`)
    setOpenSnakeDelete(true)
    setMessage('تم حذف البيانات')
    handleCloseDeleteData()

  
  }


  const DeleteAttachment = async () => {
    await axios.delete(`http://127.0.0.1:8000/empagentattedite/${imageID}/`)
  }


  const handleEditeAttachment = async (e) => {
    e.preventDefault()
    let formField = new FormData()
    formField.append('attachment', editeAttachment)
    formField.append('employee', id)
    await axios({
      method: 'PUT',
      url: `http://127.0.0.1:8000/empagentattedite/${imageID}/`,
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: formField,
    })
  }


  const handleUpload = async (e) => {
    e.preventDefault()
    let formField = new FormData()
    formField.append('attachment', attach)
    formField.append('employee', empAgentTitle[0].id)
    await axios({
      method: 'POST',
      url: `http://127.0.0.1:8000/empagentatt/`,
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: formField,
    })
  }


  const getEmpAgent = async () => {
    const res = await axios.get('http://127.0.0.1:8000/empagent/')
    setAgent(res.data)
    console.log(res.data);
  }

  const [empName, setEmpName] = useState('')
  const [empBirth, setEmpBirth] = useState('')
  const [empMother, setEmpMother] = useState('')
  const [empStatus, setEmpStatus] = useState('')
  const [empDep, setEmpDep] = useState('')
  const [empGov, setEmpGov] = useState('')
  const [empAddress, setEmpAddress] = useState('')
  const [empPhone, setEmpPhone] = useState('')
  const [empNote, setEmpNote] = useState('')




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


    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:8000/empagent/${id}/`,
      headers: { 'content-type': 'multipart/form-data' },
      data: formField,
    })
    if (res.status === 200) {
      setOpenSnake(true)
      setMessage('تم تعديل البيانات')
      handleClose()
    }


  }

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

  useEffect(() => {
    getData()
    getAtt()
    getEmpAgent()
  }, [])


  return (
    <div style={{ marginTop: '200px' }}>


      <Box sx={{
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
        width: '1846px',
        height: '6rem',
        marginTop: '-90px'
      }} >
        <Typography variant="h2" sx={{ marginLeft: '50rem', marginTop: '20px' }} gutterBottom>
          {data.label}
        </Typography>
      </Box>



      <Box
        sx={{
          bgcolor: 'background.paper',
          m: 1,
          border: 1,
          width: '1846px',
          height: '552px',
          marginLeft: '10px'
        }}
      >




        <Card sx={{ width: '1844px', height: '550px', }}>

          <TableContainer component={Paper} sx={{ width: '300' }}>
            <Table sx={{ minWidth: 100 }}>
              <TableBody sx={{ fontSize: '20px' }}>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{data.label}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">اسم الموظف</TableCell>
              </TableBody>
              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{data.emp_birth}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">تاريخ الميلاد</TableCell>
              </TableBody>

              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{data.emp_mother}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">اسم الام</TableCell>
              </TableBody>

              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{data.emp_status}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">الحالة الاجتماعية</TableCell>
              </TableBody>

              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{data.emp_dep}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">القسم والمنصب</TableCell>
              </TableBody>

              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{data.emp_gov}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">المحافظة</TableCell>
              </TableBody>

              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{data.emp_address}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">عنوان الموظف</TableCell>
              </TableBody>
              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{data.emp_phone}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">رقم الهاتف</TableCell>
              </TableBody>

              <TableBody>
                <TableCell sx={{ fontSize: '20px' }} component="th" scope="row">{data.emp_note}</TableCell>
                <TableCell sx={{ fontSize: '20px' }} align="right">الملاحظات</TableCell>
              </TableBody>
            </Table>
          </TableContainer>
          <Snackbar open={openSnake} autoHideDuration={6000} >
            <Alert severity="success" sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>

          <Snackbar open={openSnakeDelete} autoHideDuration={6000} >
            <Alert severity="error" sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
        </Card>


      </Box>
      <Box sx={{
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
        width: '1846px',
        height: '6rem',
        marginTop: ''
      }} >
        <Button sx={{ marginLeft: '700px', marginTop: '30px', fontWeight: 'bold', fontSize: '20px', }} onClick={handleOpen} variant="outlined" >تعديل المعلومات<EditIcon></EditIcon></Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >

          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginTop: '50px', marginLeft: '300px', width: '500px' }}>
                <TextField id="outlined-basic" value={empName} label="اسم صاحب النقطة" variant="outlined" onChange={(e) => setEmpName(e.target.value)} />
              </div>
              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <TextField id="outlined-basic" value={empBirth} label="تاريخ الميلاد" variant="outlined" onChange={(e) => setEmpBirth(e.target.value)} />
              </div>
              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <TextField id="outlined-basic" value={empMother} label="اسم الام" variant="outlined" onChange={(e) => setEmpMother(e.target.value)} />
              </div>
              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <select

                  style={{ width: '220px', height: '50px', textAlign: 'right' }} value={empGov} onChange={e => setEmpGov(e.target.value)}>
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
              </div>
              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <TextField id="outlined-basic" value={empAddress} label="العنوان" variant="outlined" onChange={(e) => setEmpAddress(e.target.value)} />
              </div>
              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <select

                  style={{ width: '220px', height: '50px', textAlign: 'right' }} value={empStatus} onChange={e => setEmpStatus(e.target.value)}>
                  <option label='المحافظة'></option>
                  <option>اعزب</option>
                  <option>متزوج</option>
                  <option>مطلق</option>
                  <option>ارمل</option>
                </select>
              </div>
              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <TextField id="outlined-basic" value={empDep} label="اسم النقطة" variant="outlined" onChange={(e) => setEmpDep(e.target.value)} />
              </div>
              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <TextField id="outlined-basic" value={empPhone} label="عنوان النقطة" variant="outlined" onChange={(e) => setEmpPhone(e.target.value)} />
              </div>
              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <TextField id="outlined-basic" value={empNote} label="التدقيق الامني" variant="outlined" onChange={(e) => setEmpNote(e.target.value)} />
              </div>



              <div>
                <Button type='submit' sx={{ marginTop: '20px', marginLeft: '370px' }} variant="contained" color="success">تعديل</Button>
              </div>
            </form>
          </Box>

        </Modal>
        <Button sx={{ marginLeft: '200px', marginTop: '30px', fontWeight: 'bold', fontSize: '20px', }} onClick={handleOpenDeleteData} color="error" variant="outlined">حذف البيانات <DeleteIcon></DeleteIcon></Button>
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
                        {attachment.map((item) => (
                          <TableRow>
                            <TableCell>
                              <Button onClick={() => handleOpenDelete(item.id)}><DeleteIcon></DeleteIcon></Button>
                            </TableCell >
                            <TableCell sx={{ textAlign: 'center' }}>
                              <Button onClick={() => handleOpenAttEdite(item.id)} ><EditIcon></EditIcon></Button>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              <a href={item.attachment.url}>{item.attachment.name}</a>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                </Box>

              </Modal>


            </TableCell>

            <TableCell align="right"><Button variant="contained" color="success" sx={{ textAlign: 'right', marginRight: 'px', fontWeight: 'bold', fontSize: '20px', float: 'right', marginTop: 'px' }} onClick={handleOpenUpload}>اضافة مرفق</Button>



              <Modal
                open={openAttEdit}
                onClose={handleCloseAttEdite}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >



                <Box sx={style2}>
                  <form onSubmit={handleEditeAttachment}>
                    <Button type='submit' variant="contained" color="success" sx={{ marginTop: '30px', marginLeft: '260px' }}>رفع</Button>
                    <Button variant="contained" component="label" sx={{ marginTop: '30px', marginLeft: '30px' }}>
                      اختار الملف
                      <input
                        type="file"
                        className="form-control"
                        hidden
                        onChange={(e) => setEditeAttachment(e.target.files[0])} />
                    </Button>
                  </form>
                </Box>

              </Modal>




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
                      onChange={setEmpAgentTitle}
                      options={agent}
                      selected={empAgentTitle}

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

              <Modal
                open={openDeleteAttachment}
                onClose={handleCloseDeleteAttachment}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style2}>
                  <Typography id="modal-modal-title" variant="h6" sx={{ textAlign: 'center' }} component="h2">
                    هل تريد حذف البيانات
                  </Typography>
                  <Button type='submit' variant="contained" onClick={DeleteAttachment} color="error" sx={{ marginTop: '30px', marginLeft: '460px', width: '150px' }}>حذف</Button>


                </Box>
              </Modal>


              <Modal
                open={openDelete}
                onClose={handleCloseDeleteData}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style2}>
                  <Typography id="modal-modal-title" variant="h6" sx={{ textAlign: 'center' }} component="h2">
                    هل تريد حذف البيانات
                  </Typography>
                  <Button type='submit' variant="contained" onClick={deleteData} color="error" sx={{ marginTop: '30px', marginLeft: '460px', width: '150px' }}>حذف</Button>


                </Box>

              </Modal>




            </TableCell>
          </TableBody>

        </Table>

      </TableContainer>



    </div>
  )
}

export default EmpAgentDetails