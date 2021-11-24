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
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ReservationForm = () => {
  const { movieId } = useParams();
  const [rooms, setRooms] = useState([])
  const [room, setRoom] = useState('')
  const [row, setRow] = useState('')
  const [seats, setSeats] = useState([])
  const [loading, setLoading] = useState(false)
  const [day, setDay] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    getMovieShows(movieId).then(data => {
      const movie = data.filter(movie => movie.movie_id === Number(movieId))
      const list = movie[0].shows.map(show =>  [show.room, show.show_id])
      setRooms(list)
    })
  }, [movieId])
  const handleSeats = ({target}) => {
    const {name} = target;
    if (seats.includes(name)) {
      setSeats(seats.filter(seat => seat !== name))
    }
    else {
      setSeats([...seats, name])
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const reservations = []
    seats.forEach(seat => {
      const payload = {
        show_id:room[1],
        row,
        seat,
        day
  
      }
      reservations.push(createReservation(payload))
    })
    Promise.all(reservations)
    .then(() => {
      setLoading(false)
      setSuccess(true)
      setRoom('')
      setRow('')
      setSeats([])
      setDay('')
    })
    .catch(() => {
      setLoading(false)
      setError(true)
    })
  }
  
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
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="dense">
          <InputLabel>Sala</InputLabel>
          <Select
            value={room}
            label="Sala"
            onChange={(e) => setRoom(e.target.value)}
          >
            {rooms.length && rooms.map(room => {
              return (
                <MenuItem value={room} key={`Sala ${room[0]}`}>{`Sala ${room[0]}`}</MenuItem>
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
                <MenuItem value={row} key={row}>{row}</MenuItem>
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
                  <Checkbox onChange={handleSeats} name={`${seat+1}`}/>
                }
                label={seat+1}
                labelPlacement="top"
              />
            )
          })}
        </FormGroup>
        <div style={{display:'flex',flexDirection:'column'}}>
          <TextField
              required
              id="day"
              label="Escríba el día de la función (YY-MM-DD)"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              margin="dense"
            />
          <LoadingButton loading={loading} variant="contained" type="submit">
              Reservar
          </LoadingButton>
        </div>
      </form>
      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={() => setError(false)}
      >
        <Alert onClose={() => setError(false)} severity="error" sx={{ width: '100%' }}>
          Ha ocurrido un error
        </Alert>
      </Snackbar>
      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Reserva Exitosa
        </Alert>
      </Snackbar>
    </Container>
    )
}

export default ReservationForm;