import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { enums } from './constants';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface App {
  project_name: string,
  company_name: string,
  contact_email: string,

}
interface Column {
  id: 'project_name' | 'company_name' | 'contact_email';
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'project_name', label: 'project_name', minWidth: 10, maxWidth: 50, },
  { id: 'company_name', label: 'company_name', minWidth: 10, maxWidth: 50, },
  { id: 'contact_email', label: 'contact_email', minWidth: 10, maxWidth: 50, }
];

function App() {
  const [getall, setgetall] = React.useState(0)
  const [companies, setCompanies] = React.useState([])
  const [inputs, setInputs] = React.useState({
    project_name: '',
    company_name: '',
    contact_email: '',
  })

  const submitHandler = (e: any) => {
    e.preventDefault();
    let data = JSON.stringify({ ...inputs })
    axios.post('http://localhost:8000/project', { data }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res: any) => {
      console.log('posted...', res.data)
    }).catch(() => { console.log('error') })
  }
  const getHandler = () => {
    axios.get('http://localhost:8000/projects', {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res: any) => {
      console.log('getit........', res.data)
      setCompanies(res.data)
    }).catch(() => { console.log('error') })
  }

  React.useEffect(() => {
    getHandler();
  }, [])

  const handlechange = (e: any) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="App" >
      <Button onClick={() => setgetall(0)}>Add Company</Button>
      <Button onClick={() => setgetall(1)}>Get All Companies</Button>
      {getall == 1 ? <div> < Paper sx={{ width: '50%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }} >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper ></div> : <form>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 3 },
          }}
          noValidate
          autoComplete="off"
        >
          {enums.map(v => <div key={v.name}>
            <TextField id={v.id} label={v.label} name={v.name} onChange={handlechange}
              placeholder={v.placeholder} required variant="outlined" />
          </div>
          )}
          <Button onClick={submitHandler} type='submit'
            variant='contained' color='primary' >Submit</Button>
        </Box>
      </form >}
    </div >
  );
}

export default App;
