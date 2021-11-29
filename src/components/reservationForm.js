import React, {useState, useEffect, Fragment} from 'react';
import { useParams } from "react-router-dom";
import { getMovieShows, createReservation, getReservations } from '../api/api';
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
  const { movieId, schedule } = useParams();
  const [rooms, setRooms] = useState([])
  const [room, setRoom] = useState('')
  const [row, setRow] = useState('')
  const [seats, setSeats] = useState([])
  const [loading, setLoading] = useState(false)
  const [day, setDay] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [reservations, setReservations] = useState([])
  const [preFill, setPreFill] = useState(true);

  useEffect(() => {
    getMovieShows(movieId).then(data => {
      const movie = data.filter(movie => movie.movie_id === Number(movieId))
      const list = movie[0].shows.filter(show => show.schedule === schedule)
      .map(show =>  [show.room, show.show_id])
      setRooms(list)
    })
  }, [movieId, schedule])
  const handleSeats = ({target}) => {
    const {name} = target;
    if (seats.includes(name)) {
      setSeats(seats.filter(seat => seat !== name))
    }
    else {
      setSeats([...seats, name])
    }
  }
  const handleRooms = () => {
    setPreFill(true)
    getReservations({
      show_id: room[1],
      date: day
    }).then((data) => {
      setReservations(data)
      setPreFill(false)
    })
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
  const rowA = reservations.filter(r => r.row === "A")
  const rowB = reservations.filter(r => r.row === "B")
  const rowC = reservations.filter(r => r.row === "C")
  const rowD = reservations.filter(r => r.row === "D")
  const freeSeats = (row) => {
    const occupied = row.map(r => r.seat)
    const free = [...Array(13).keys()].filter(seat => !occupied.includes(`${seat}`)).filter(seat => seat !== 0)
    if (free.length  === 12) {
      return 'Todos los asientos estan disponibles.'
    }
    return free.join(', ')
  }
  return (
    <Container
      maxWidth="lg"
      sx={{
        borderRadius: '1em',
        bgcolor: 'white',
        padding: '1em 0 1em 0',
        textAlign: 'left',
        marginTop: '2em'
      }}
    >
      {reservations.length  ? 
      <div>
        <h3>Asientos Libres</h3>
        <p>Fila A: {freeSeats(rowA)}</p>
        <p>Fila B: {freeSeats(rowB)}</p>
        <p>Fila C: {freeSeats(rowC)}</p>
        <p>Fila D: {freeSeats(rowD)}</p>
      </div>:
      <p>Todos los asientos estan disponibles</p>
      }
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="dense">
          <InputLabel>Sala</InputLabel>
          <Select
            value={room}
            label="Sala"
            onChange={(e) => setRoom(e.target.value)}
            id='Sala'
          >
            {rooms.length && rooms.map(room => {
              return (
                <MenuItem value={room} key={`Sala ${room[0]}`}>{`Sala ${room[0]}`}</MenuItem>
              )
            })}
          </Select>
          <TextField
              required
              id="day"
              label="Escríba el día de la función (YY-MM-DD)"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              margin="dense"
            />
            <LoadingButton loading={loading} variant="contained" onClick={handleRooms}>
              Ver disponibilidad
          </LoadingButton>
        </FormControl>
        {!preFill && 
        <Fragment>
        <FormControl fullWidth margin="dense">
          <InputLabel>Fila</InputLabel>
          <Select
            value={row}
            label="Fila"
            onChange={(e)=> setRow(e.target.value)}
            id='Fila'
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
          
          <LoadingButton loading={loading} variant="contained" type="submit">
              Reservar
          </LoadingButton>
        </div>
        </Fragment>}
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