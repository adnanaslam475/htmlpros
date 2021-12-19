import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { enums } from '../constants'



interface inputs {
    // name: keyof typeof inputs,
    project_name: string,
    company_name: string,
    contact_email: string,
}
function Details({ }) {
    const params = useParams()
    const [inputs, setInputs] = React.useState({
        project_name: '',
        company_name: '',
        contact_email: '',
    })

    const getById = () => {
        axios.get(`http://localhost:8000/project/${params?.id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log('res...', res.data)
            const { project_name, company_name, contact_email } = res.data
            setInputs({ project_name, company_name, contact_email })
        }).catch(() => { console.log('errrrr') })
    }

    React.useEffect(() => {
        getById()
    }, [])

    const handlechange = (e: any) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }))
    }

    const save = (e: any) => {
        e.preventDefault();
        let data = JSON.stringify({ ...inputs })
        axios.put(`http://localhost:8000/project-update/${params?.id}`, { data }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log('updateddddd', res.data)
        }).catch(() => {
            console.log('patch not updateddddd')
        })
    }

    return (
        <div>
            {enums.map(({ name, id, placeholder, label, type }) => {
                return (<div style={{ margin: '20px' }} key={name}>
                    <TextField id={id} label={label}
                        value={inputs[name as keyof inputs]}
                        name={name} onChange={handlechange}
                        placeholder={placeholder} required variant="outlined" />
                </div>)
            }
            )}
            <Button onClick={save} variant='contained' type='button' >Save</Button>
        </div>
    )
}

export default Details
