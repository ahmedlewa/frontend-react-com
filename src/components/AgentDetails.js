import React, { useState, useEffect } from 'react'
import { Table, TableBody, Modal, Box, Typography, TableCell, Stack, Snackbar, Alert, TableContainer, TableHead, TextField, TableRow, Paper, Button } from '@mui/material'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Typeahead } from 'react-bootstrap-typeahead';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


function AgentDetails() {
  const [data, setData] = useState([])
  const [title, setTitle] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  const getAgent = async () => {
    const res = await axios.get('http://127.0.0.1:8000/agentlist/')
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
  const [empAgent, setEmpAgent] = useState('')
  const [agent, setAgent] = useState([])
  const [message, setMessage] = useState()
  const [snakOpen, setSnakOpen] = useState(false)

  const [search, setSearch] = useState('')


  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)


  const [openDelete, setOpenDelete] = useState(false)
  const handleOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)


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
  const getEmp = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/empagent/?emp_agent=${id}&search=${search}`)
    console.log(res.data)
    setData(res.data)
  }

  const handleDelete = async () => {
    await axios.delete(`http://127.0.0.1:8000/agents/${id}`)
  }

  const getTitle = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/agents/${id}`)
    console.log(res.data)
    setTitle(res.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formField = new FormData()
    formField.append('label', empName)
    formField.append('emp_birth', empBirth)
    formField.append('emp_mother', empMother)
    formField.append('emp_status', empStatus)
    formField.append('emp_dep', empDep)
    formField.append('emp_gov', empGov)
    formField.append('emp_address', empAddress)
    formField.append('emp_phone', empPhone)
    formField.append('emp_note', empNote)
    formField.append('emp_agent', empAgent[0].id)
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/empagent/',
      headers: { 'content-type': 'multipart/form-data' },
      data: formField
    })
    if (res.status === 201) {
      setMessage('تمت اضافة موظف')
      handleClose()
      setSnakOpen(true)

    } else {
      setMessage('حدث خطا')
      setSnakOpen(true)
    }

  }



  useEffect(() => {
    getEmp()
    getTitle()
    getAgent()
  }, [search])
  return (
    <div>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1500,
          p: 4,
          mb: 2,
          display: "flex",
          flexDirection: "column",
          height: 700,
          marginTop: '-90px',
          marginLeft: '80px'

        }}
      >
       <TextField
          label="بحث"
          type="search"
          variant="filled"
          id="outlined-search"
          onChange={(e) => setSearch(e.target.value)}
          sx={{}}


        />
       
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
            <Button variant="outlined" onClick={handleDelete} sx={{ width: '200px', position: 'absolute', top: '100px', left: '90px' }} color="error">نعم</Button>
            <Button onClick={handleCloseDelete} sx={{ width: '200px', position: 'absolute', top: '100px', left: '410px' }} variant="outlined">Primary</Button>

          </Box>
        </Modal>
        <Typography sx={{ fontWeight: 'bold', fontSize: '50px', textAlign: 'center' }}>{title.label}</Typography>
        <Button variant="outlined" color="success" sx={{ fontWeight: 'bold', fontSize: '20px', width: '150px',marginLeft:'1300px' }} onClick={handleOpen}>اضافة موظف<AddIcon></AddIcon></Button>









        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >

          <Box sx={style}>
            <form onSubmit={handleSubmit} >
              <div style={{ marginTop: '50px', marginLeft: '300px', width: '500px' }}>
                <TextField id="outlined-basic" label="اسم الموظف" variant="outlined" onChange={e => setEmpName(e.target.value)} />
              </div>
              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <TextField id="outlined-basic" label="تاريخ الميلاد" variant="outlined" onChange={e => setEmpBirth(e.target.value)} />
              </div>
              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <TextField id="outlined-basic" label="اسم الام" variant="outlined" onChange={e => setEmpMother(e.target.value)} />
              </div>

              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <TextField id="outlined-basic" sx={{ textAlign: 'right' }} label="القسم و المنصب" variant="outlined" onChange={e => setEmpDep(e.target.value)} />
              </div>
              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <select
                  style={{ width: '220px', height: '50px', textAlign: 'right' }} onChange={e => setEmpStatus(e.target.value)}>
                  <option label='الحالة الاجتماعية'></option>
                  <option>اعزب</option>
                  <option>متزوج</option>
                  <option>مطلق</option>
                  <option>ارمل</option>
                </select>
              </div>
              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <select

                  style={{ width: '220px', height: '50px', textAlign: 'right' }} onChange={e => setEmpGov(e.target.value)}>
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
                <TextField id="outlined-basic" label="العنوان" variant="outlined" onChange={e => setEmpAddress(e.target.value)} />
              </div>
              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <TextField id="outlined-basic" label="رقم الهاتف" variant="outlined" onChange={e => setEmpPhone(e.target.value)} />
              </div>
              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <TextField id="outlined-basic" label="الملاحظات" variant="outlined" onChange={e => setEmpNote(e.target.value)} />
              </div>
              <div>
                <Typeahead
                  style={{ marginTop: '20px' }}
                  placeholder="شركة الاتصال"
                  onChange={setEmpAgent}
                  options={agent}
                  selected={empAgent}
                />
              </div>
              <div>
                <Button type='submit' sx={{ marginTop: '20px', marginLeft: '370px' }} variant="contained" color="success">اضافة</Button>
              </div>

            </form>
          </Box>

        </Modal>

        </Box>

      <TableContainer sx={{ width: '1700px', marginLeft: '70px', marginTop: '300px' }} component={Paper}>
       

        <Table sx={{ minWidth: 650, marginTop: '' }} size="small" aria-label="a dense table">
          <TableHead sx={{ marginTop: '70px' }}>
            <TableRow sx={{ background: 'black', }}>
              <TableCell sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }} >الملاحظات</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>رقم الهاتف</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>العنوان</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>المحافظة</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>القسم والمنصب</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>الحالة الاجتماعية</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>اسم الام</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>تاريخ الميلاد</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>اسم الموظف</TableCell>
            </TableRow>
          </TableHead>
          {data.map((e) => (
            <TableBody>
              <TableRow onClick={() => navigate(`${e.id}`)} sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', '&:hover': { backgroundColor: 'gray' } }}>

                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>{e.emp_note}</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>{e.emp_phone}</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>{e.emp_address}</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>{e.emp_gov}</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>{e.emp_dep}</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>{e.emp_status}</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>{e.emp_mother}</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>{e.emp_birth}</TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>{e.label}</TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
        <Snackbar open={snakOpen} autoHideDuration={6000}>
          <Alert severity='success'>{message}</Alert>
        </Snackbar>
        <Snackbar open={snakOpen} autoHideDuration={6000}>
          <Alert severity='success'>{message}</Alert>
        </Snackbar>

      </TableContainer>

      <Button  onClick={handleOpenDelete} sx={{ fontWeight: 'bold', fontSize: '20px', width: '150px',marginLeft:'860px' }} variant="outlined" color="error">حذف الوكيل<DeleteIcon></DeleteIcon></Button>










    </div>
  )
}

export default AgentDetails