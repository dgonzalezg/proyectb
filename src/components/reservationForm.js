import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { getMovieShows, createReservation } from '../api/api';
import InputLabel from '@mui/material/InputLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import LoadingButton from '@mui/lab/LoadingButton';

const ReservationForm = () => {
  const { movieId } = useParams();
  const [rooms, setRooms] = useState([])
  const [room, setRoom] = useState('')
  const [row, setRow] = useState('')
  const [seat, setSeat] = useState('')
  const [loading, setLoading] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
    }
  }
  useEffect(() => {
    getMovieShows(movieId).then(data => {
      
      const movie = data.filter(movie => movie.movie_id === Number(movieId))
      console.log(movie)
      const list = movie[0].shows.map(show =>  `Sala ${show.room}`)
      setRooms(list)
    })
  }, [movieId])
  return (
    <Container
      maxWidth="lg"
      sx={{
        borderRadius: '1em',
        bgcolor: 'white',
        padding: '1em 0 1em 0',
        textAlign: 'left',
      }}
    >
      <form>
        <FormControl fullWidth margin="dense">
          <InputLabel>Sala</InputLabel>
          <Select
            value={room}
            label="Sala"
            onChange={(e) => setRoom(e.target.value)}
          >
            {rooms.length && rooms.map(room => {
              return (
                <MenuItem value={room[room.length-1]}>{room}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
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
        <FormGroup row={true}>
          <FormLabel component="legend">Asientos</FormLabel>
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
        </FormGroup>
        <LoadingButton loading={loading} variant="contained" type="submit">
            Reservar
        </LoadingButton>
      </form>
    </Container>
    )
}

export default ReservationForm;