import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Button } from '@mui/material';
import { enums } from './constants';

function App() {


  const submitHandler = (e: any) => {
    e.preventDefault();
    axios.post('').then((res: any) => {
      console.log(res)
    }).catch(() => { console.log('error') })
  }

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 3 },
          }}
          noValidate
          autoComplete="off"
        >
          {enums.map(v => <div key={v.name}>
            <TextField id={v.id} label={v.label} name={v.name} onChange={() => ''}
              placeholder={v.placeholder} required variant="outlined" />
          </div>
          )}
          <Button type='submit' variant='contained' color='primary' >Submit</Button>
        </Box>
      </form>
    </div>
  );
}

export default App;
