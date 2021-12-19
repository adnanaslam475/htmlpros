import React from 'react'
// import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Table from '@mui/material/Table';
import { enums } from '../constants';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';

interface TableData {
    _id: 'number | undefined',
    history: object
}

interface inputs {
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

function TableData() {
    const [getall, setgetall] = React.useState(0)
    const navigate = useNavigate()
    const [companies, setCompanies] = React.useState([] as any[])
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

    const onSelect = (id: any) => {
        navigate(`/${id}`, {
            state: {
                id,
            }
        })
    }

    return (
        <div>
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
                                console.log('row....', row)
                                return (
                                    <TableRow style={{ cursor: 'pointer' }}
                                        hover role="checkbox" onClick={() => onSelect(row._id)}
                                        tabIndex={- 1} key={i}>
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
                    autoComplete="off" >
                    {enums.map(({ name, id, placeholder, label, type }) => {
                        return (<div key={name}>
                            <TextField id={id} label={label} name={name}
                                onChange={handlechange}
                                placeholder={placeholder} value={inputs[name as keyof inputs]}
                                required variant="outlined" />
                        </div>)
                    }
                    )}
                    <Button onClick={submitHandler} type='submit'
                        variant='contained' color='primary' >Submit</Button>
                </Box>
            </form >
            }
        </div >
    )
}

export default TableData;