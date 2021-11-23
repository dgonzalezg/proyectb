import React, {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';;


const ReservationForm = ({rooms}) => {
  const [room, setRoom] = useState('')
  const [row, setRow] = useState('')
  const [seat, setSeat] = useState('')
  return (
    <Container
      maxWidth="sm"
      sx={{
        borderRadius: '1em',
        bgcolor: 'white',
        padding: '1em 0 1em 0',
        textAlign: 'left',
      }}
    >
      <form>
        <FormControl fullWidth>
          <InputLabel>Sala</InputLabel>
          <Select
            labelId="demo-simple-select-label"

            value={room}
            label="Sala"
            onChange={(e) => setRow(e.target.value)}
          >
            {rooms.map(room => {
              return (
                <MenuItem value={room[-1]}>{room}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Fila</InputLabel>
          <Select
            value={row}
            label="Fila"
            onChange={(e)=> setRow(e.target.value)}
          >
            {['A','B','C','D'].map(row => {
              return (
                <MenuItem value={row}>{row}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
        {Array(12).fill(0).map((_ ,seat) => {
          return (
            <FormControlLabel
              key={`seat${seat}`}
              control={
                <Checkbox onChange={(e) => setSeat(e.target.name)} name={seat+1} />
              }
              label={seat+1}
              labelPlacement="top"
            />
          )
        })}
      </form>
    </Container>
    )
}

export default ReservationForm;