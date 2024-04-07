import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, Button, Typography, TableContainer, TableHead, TableRow, Box, Table, TableBody, TableCell } from '@mui/material/';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
function Search() {

  const [search, setSearch] = useState('')
  const [getPos, setGetPos] = useState([])
  const [getEmpCom, setGetEmpCom] = useState([])
  const [getEmpAgent, setGetEmpAgent] = useState([])
  const [loading, setLoading] = useState(false)


  const searchSubmite = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('search', search)
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/view/',
      data: formData
    })
    setGetPos(res.data.results.POS)
    setGetEmpCom(res.data.results.EmpCom)
    setGetEmpAgent(res.data.results.EmpAgent)
  }


  const navigate = useNavigate()



  // {fun1? = und : func2}

  console.log(getPos)
  console.log(getEmpCom)
  console.log(getEmpAgent);

  useEffect(() => {


  }, [])
  return (loading ? (<div>isLoading</div>) :
    <div >
      <form onSubmit={searchSubmite}>
        <TextField sx={{ marginTop: '70px', marginLeft: '100px', width: '1600px' }} id="outlined-basic" label="بحث" variant="outlined" onChange={e => (setSearch(e.target.value))} />

        <Button sx={{ marginLeft: '900px', width: '100px', marginTop: '20px', fontWeight: 'bold', fontSize: '20px', }} type='submit' variant="contained">بحث<SearchIcon></SearchIcon></Button>
      </form>


      <Box sx={{
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
        width: '1600px',
        height: '6rem',
        marginTop: '50px',
        marginLeft: '100px'
      }} >
        <Typography variant="h2" sx={{ marginLeft: '700px', marginTop: '20px' }} gutterBottom>
          موظفي الوكالة
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: 'background.paper',
          m: 1,
          border: 1,
          width: '1600px',
          height: '320px',
          overflow: "hidden",
          overflowY: "scroll",
          marginLeft: '100px'
        }}
      >
        <TableContainer>
          <Table>
            <TableHead sx={{ background: 'black' }}>

              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>اسم الموظف</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>اسم الشركة</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>تاريخ الميلاد</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>اسم الام</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>الحالة الاجتماعية</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>القسم</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>المحافظة</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>العنوان</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>رقم الهاتف</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>الملاحظات</TableCell>
              </TableRow>

            </TableHead>
            <TableBody>
              {getEmpAgent === undefined ? <p style={{ float: 'right' }}></p> : getEmpAgent.map((e) =>

                <TableRow
                  onClick={() => navigate(`${e.id}-empagent`)}
                  key={e.label}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', '&:hover': { backgroundColor: 'gray' } }}
                >

                  <TableCell>{e.label}</TableCell>
                  <TableCell>{e.emp_agent.agent_name}</TableCell>
                  <TableCell>{e.emp_birth}</TableCell>
                  <TableCell>{e.emp_mother}</TableCell>
                  <TableCell>{e.emp_status}</TableCell>
                  <TableCell>{e.emp_dep}</TableCell>
                  <TableCell>{e.emp_gov}</TableCell>
                  <TableCell>{e.emp_address}</TableCell>
                  <TableCell>{e.emp_phone}</TableCell>
                  <TableCell>{e.emp_note}</TableCell>
                </TableRow>


              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
        width: '1600px',
        height: '6rem',
        marginTop: '50px',
        marginLeft: '100px'
      }} >
        <Typography variant="h2" sx={{ marginLeft: '700px', marginTop: '20px' }} gutterBottom>
          موظفي الشركات
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          m: 1,
          border: 1,
          width: '1600px',
          height: '320px',
          marginLeft: '100px',
          overflowY: "scroll",
          marginLeft: '100px'
        }}
      >

        <TableContainer>
          <Table>
            <TableHead sx={{ background: 'black' }}>

              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>اسم الموظف</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>اسم الشركة</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>تاريخ الميلاد</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>اسم الام</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>الحالة الاجتماعية</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>القسم</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>المحافظة</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>العنوان</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>رقم الهاتف</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>الملاحظات</TableCell>
              </TableRow>

            </TableHead>
            <TableBody>
              {getEmpCom === undefined ? <p style={{ float: 'right' }}></p> : getEmpCom.map((e) =>

                <TableRow
                  onClick={() => navigate(`${e.id}-empcom`)}
                  key={e.emp_name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', '&:hover': { backgroundColor: 'gray' } }}
                >

                  <TableCell>{e.emp_name}</TableCell>
                  <TableCell>{e.emp_com.com_name}</TableCell>
                  <TableCell>{e.emp_birth}</TableCell>
                  <TableCell>{e.emp_mother}</TableCell>
                  <TableCell>{e.emp_status}</TableCell>
                  <TableCell>{e.emp_dep}</TableCell>
                  <TableCell>{e.emp_gov}</TableCell>
                  <TableCell>{e.emp_address}</TableCell>
                  <TableCell>{e.emp_phone}</TableCell>
                  <TableCell>{e.emp_note}</TableCell>
                </TableRow>


              )}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>
      <Box sx={{
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
        width: '1600px',
        height: '6rem',
        marginTop: '50px',
        marginLeft: '100px'
      }} >
        <Typography variant="h2" sx={{ marginLeft: '700px', marginTop: '20px' }} gutterBottom>
          اصحاب نقاط البيع
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: 'background.paper',
          m: 1,
          border: 1,
          width: '1600px',
          height: '320px',
          marginLeft: '100px',
          overflowY: "scroll",
          marginLeft: '100px'
        }}
      >
        <TableContainer>
          <Table>
            <TableHead sx={{ background: 'black' }}>

              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>اسم صاحب النقطة</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>اسم النقطة</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>تاريخ الميلاد</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>اسم الام</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>المحافظة</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>العنوان</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>عنوان نقطة البيع</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>رقم الهاتف</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>تدقيق الامني</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>رقم الكتاب الوارد</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>تاريخ الكتاب الوارد</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>رقم الكتاب الصادر</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>تاريخ الكتاب الصادر</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>وكيل اسيا سيل</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>وكيل كورك</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>وكيل زين العراق</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>رقم تفعيل اسياسيل</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>رقم التفعيل كورك</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>رقم تفعيل زين العراق</TableCell>
              </TableRow>

            </TableHead>
            <TableBody>
              {getPos === undefined ? <p style={{ float: 'right' }}></p> : getPos.map((e) =>

                <TableRow
                  onClick={() => navigate(`${e.id}-posdetails`)}
                  key={e.owner_name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', '&:hover': { backgroundColor: 'gray' } }}
                >

                  <TableCell>{e.owner_name}</TableCell>
                  <TableCell>{e.label}</TableCell>
                  <TableCell>{e.date_birth}</TableCell>
                  <TableCell>{e.mother_name}</TableCell>
                  <TableCell>{e.gov}</TableCell>
                  <TableCell>{e.address}</TableCell>
                  <TableCell>{e.pos_address}</TableCell>
                  <TableCell>{e.number_phone}</TableCell>
                  <TableCell>{e.securty}</TableCell>
                  <TableCell>{e.book_numb}</TableCell>
                  <TableCell>{e.date_book}</TableCell>
                  <TableCell>{e.res_book}</TableCell>
                  <TableCell>{e.date_book_res}</TableCell>
                  <TableCell>{e.asia_agent}</TableCell>
                  <TableCell>{e.korek_agent}</TableCell>

                  <TableCell>{e.zain_agent}</TableCell>
                  <TableCell>{e.asia_active}</TableCell>
                  <TableCell>{e.korek_active}</TableCell>
                  <TableCell>{e.zain_active}</TableCell>
                </TableRow>


              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>


      <div>

      </div>


    </div>
  )
}

export default Search