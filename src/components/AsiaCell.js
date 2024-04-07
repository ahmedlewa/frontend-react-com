import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Table, TableBody, TableCell, Button, Typography, TableContainer, TableHead, TableRow, Paper, Box, TextField, Modal, Snackbar, Alert } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typeahead } from 'react-bootstrap-typeahead';

function AsiaCell() {
  const [data, setData] = useState([])
  const { id } = useParams()
  const [nextUrl, setNextUrl] = useState()
  const [previousUrl, setPreviousUrl] = useState()
  const [search, setSearch] = useState('')
  const [govFilter, setGovFilter] = useState('')
  const [coms, setComs] = useState('')
  const navigate = useNavigate()
  console.log(id);

  const [agentName, setAgentName] = useState('')
  const [agentOwner, setAgentOwner] = useState('')
  const [agentGove, setAgentGov] = useState('')
  const [agentAddress, setAgentAddress] = useState('')
  const [agentPhone, setAgentPhone] = useState('')
  const [agentNote, setAgentNote] = useState('')
  const [agentCom, setAgentCom] = useState('')

  const [openSnake, setOpenSnak] = useState(false)
  const [message, setMessage] = useState('')




  const [openSnakeError, setOpenSnakError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    let formField = new FormData()
    formField.append('label', agentName)
    formField.append('agent_owner', agentOwner)
    formField.append('agents_gov', agentGove)
    formField.append('agent_address', agentAddress)
    formField.append('agent_phone', agentPhone)
    formField.append('agent_note', agentNote)
    formField.append('agent_com', agentCom[0].id)
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/agents/',
      headers: { 'content-type': 'multipart/form-data' },
      data: formField
    })
    if (res.status === 201) {
      setMessage('تمت اضافة وكيل')
      setOpenSnak(true)
      handleClose()
    } else {
      setErrorMessage('حدث خطا')
      setOpenSnakError(true)
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
    const res = await axios.get(`http://127.0.0.1:8000/agents/?agent_com=${id}&agents_gov=${govFilter}&search=${search}`)
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
          width: 1500,
          p: 4,
          mb: 2,
          display: "flex",
          flexDirection: "column",
          height: 700,
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
              <div style={{ marginTop: '50px', marginLeft: '300px', width: '500px' }}>
                <TextField id="outlined-basic" label="اسم الوكيل" onChange={e => setAgentName(e.target.value)} variant="outlined" />
              </div>
              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <TextField id="outlined-basic" label="اسم صاحب الوكالة" variant="outlined" onChange={e => setAgentOwner(e.target.value)} />
              </div>
              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <select onChange={e => setAgentGov(e.target.value)}
                  style={{ width: '220px', height: '50px', textAlign: 'right' }}>
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
              </div>
              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <TextField id="outlined-basic" sx={{ textAlign: 'right' }} onChange={e => setAgentAddress(e.target.value)} label="العنوان" variant="outlined" />
              </div>
              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <TextField id="outlined-basic" label="رقم الهاتف" variant="outlined" onChange={e => setAgentPhone} />
              </div>
              <div style={{ marginTop: '20px', marginLeft: '300px' }}>
                <TextField id="outlined-basic" label="الملاحظات" variant="outlined" onChange={e => setAgentNote(e.target.value)} />
              </div>
              <div>
                <Typeahead
                  style={{ marginTop: '20px' }}
                  placeholder="شركة الاتصال"
                  onChange={setAgentCom}
                  options={coms}
                  selected={agentCom}

                />
              </div>
              <div>
                <Button type='submit' sx={{ marginTop: '20px', marginLeft: '370px' }} variant="contained" color="success">اضافة</Button>
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



        <Typography sx={{ fontWeight: 'bold', fontSize: '50px', marginLeft: '600px', marginTop: '-65px' }}>الوكلاء</Typography>

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
                <TableCell sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>اسم الوكالة</TableCell>
                <TableCell sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>اسم صاحب الوكالة</TableCell>
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
                  onClick={() => navigate(`${e.id}`)}
                >
                  <TableCell sx={{ textAlign: 'center' }}>{e.label}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{e.agent_owner}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{e.agents_gov}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Snackbar open={openSnake} autoHideDuration={6000}>
            <Alert severity="success" >{message}</Alert>
          </Snackbar>
          <Snackbar open={openSnakeError} autoHideDuration={6000}>
            <Alert severity="error" >{errorMessage}</Alert>
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

export default AsiaCell