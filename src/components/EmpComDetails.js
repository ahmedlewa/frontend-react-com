import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, Button, Typography, TableContainer, TableHead, TableRow, Paper, Box, TextField, Modal, Card } from '@mui/material'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Typeahead } from 'react-bootstrap-typeahead';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
function EmpComDetails() {
  const { id } = useParams()
  const [data, setData] = useState([])
  const [users, setUsers] = useState()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)


  const [openAttachment, setOpenAttachment] = useState(false)
  const handleOpenAttachment = () => setOpenAttachment(true)
  const handleCloseAttachment = () => setOpenAttachment(false)


  


  const [openAttachmentList, setOpenAttachmentList] = useState(false)
  const handleOpenAttachmentList = () => setOpenAttachmentList(true)
  const handleCloseAttachmentList = () => setOpenAttachmentList(false)



  const [attachmentEdite, setAttachmentEdite] = useState(false)
  const handleOpenAttachmentEdite = (id) => {
    setAttachmentEdite(true)
    setImageID(id)
  }
  const handleCloseAttachmentEdite = () => setAttachmentEdite(false)




  const [empName, setEmpName] = useState('')
  const [empBirth, setEmpBirth] = useState('')
  const [empMother, setEmpMother] = useState('')
  const [empStatus, setEmpStatus] = useState('')
  const [empDep, setEmpDep] = useState('')
  const [empGov, setEmpGov] = useState('')
  const [empAddress, setEmpAddress] = useState('')
  const [empPhone, setEmpPhone] = useState('')
  const [empNote, setEmpNote] = useState('')
  const [imageID, setImageID] = useState()

  const [attachList, setAttachList] = useState([])


  const [attachment, setAttachment] = useState()
  const [comEmp, setComEmp] = useState()


  const handleSubmit = async (e) => {
    e.preventDefault()
    let formFeild = new FormData()
    formFeild.append('label', empName)
    formFeild.append('emp_birth', empBirth)
    formFeild.append('emp_mother', empMother)
    formFeild.append('emp_status', empStatus)
    formFeild.append('emp_dep', empDep)
    formFeild.append('emp_gov', empGov)
    formFeild.append('emp_address', empAddress)
    formFeild.append('emp_phone', empPhone)
    formFeild.append('emp_note', empNote)
    const res = await axios({
      method: 'PUT',
      url: `http://127.0.0.1:8000/empcom/${id}/`,
      headers: { 'content-type': 'multipart/form-data' },
      data: formFeild,
    })
    if (res.status === 200) {

    }

  }


  const handleSubmitAttachment = async (e) => {
    e.preventDefault()
    let formFeild = new FormData()
    formFeild.append('attachment', attachment)
    formFeild.append('com_emp', comEmp[0].id)
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:8000/empcomatt/`,
      headers: { 'content-type': 'multipart/form-data' },
      data: formFeild,
    })
    if (res.status === 200) {

    }

  }



  const handleSubmitAttachmentEdite = async (e) => {
    e.preventDefault()
    let formFeild = new FormData()
    formFeild.append('attachment', attachment)
    formFeild.append('com_emp', id)
    const res = await axios({
      method: 'PUT',
      url: `http://127.0.0.1:8000/empcomatt/${imageID}/`,
      headers: { 'content-type': 'multipart/form-data' },
      data: formFeild,
    })
    if (res.status === 200) {

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

  const getUpdate = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/empcom/${id}/`)
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



  const getData = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/empcom/${id}/`)
    setData(res.data)
  }




  const getAttachment = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/empcomatt/?com_emp=${id}`)
    setAttachList(res.data)
  }

  const getUsers = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/empcomall/`)
    setUsers(res.data)
    console.log(res.data)
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

  useEffect(() => {
    getData()
    getUpdate()
    getUsers()
    getAttachment()
  }, [])


  return (
    <div style={{ marginTop: '200px' }}>


      <Box sx={{
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
        width: '1800px',
        height: '6rem',
        marginTop: '-90px',
        marginLeft: '30px'
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
          width: '1800px',
          height: '552px',
          marginLeft: '30px'
        }}
      >




        <Card sx={{ width: '1797px', height: '550px', }}>

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
        </Card>


      </Box>
      <Box sx={{
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
        width: '1800px',
        height: '6rem',
        marginTop: '',
        marginLeft: '30px'
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
                  <option label='الحالة الاجتماعية'></option>
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
        <Button sx={{ marginLeft: '1000px', marginTop: '-80px', fontWeight: 'bold', fontSize: '20px', }} color='error' variant="outlined">حذف البيانات<DeleteIcon></DeleteIcon></Button>
      </Box>
      <Box sx={{
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
        width: '1800px',
        height: '6rem',
        marginTop: '',
        marginLeft: '30px'
      }} >
        <Button variant="contained" color="success" sx={{ textAlign: 'right', marginRight: '40px', fontWeight: 'bold', fontSize: '20px', float: 'right', marginTop: '20px' }} onClick={handleOpenAttachment}  >اضافة مرفق</Button>

        <Modal
          open={openAttachment}
          onClose={handleCloseAttachment}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >



          <Box sx={style2}>
            <form onSubmit={handleSubmitAttachment} >
              <Typeahead
                style={{ marginTop: '20px' }}
                placeholder="اسم الموظف"
                options={users}
                onChange={setComEmp}
                selected={comEmp}
              />

              <Button type='submit' variant="contained" color="success" sx={{ marginTop: '30px', marginLeft: '260px' }}>رفع</Button>
              <Button variant="contained" component="label" sx={{ marginTop: '30px', marginLeft: '30px' }}>
                اختار الملف
                <input
                  type="file"
                  className="form-control"
                  hidden
                  onChange={(e) => setAttachment(e.target.files[0])}
                />
              </Button>
            </form>
          </Box>

        </Modal>

        <Button variant="contained" sx={{ textAlign: 'right', marginRight: '40px', fontWeight: 'bold', fontSize: '20px', marginLeft: '30px', marginTop: '20px' }} onClick={handleOpenAttachmentList}>المرفق</Button>
        <Modal
          open={openAttachmentList}
          onClose={handleCloseAttachmentList}
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
                  {attachList.map(e =>

                    <TableRow>
                      <TableCell>
                        <Button ><DeleteIcon></DeleteIcon></Button>
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>

                        <Button onClick={()=>handleOpenAttachmentEdite(e.id)} ><EditIcon></EditIcon></Button>
                        <Modal
                          open={attachmentEdite}
                          onClose={handleCloseAttachmentEdite}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style2}>
                            <form onSubmit={handleSubmitAttachmentEdite}>
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
      </Box>
    </div>
  )
}

export default EmpComDetails