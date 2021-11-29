import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {schedules} from './movieList';
import './form.css';
import LoadingButton from '@mui/lab/LoadingButton';
import Container from '@mui/material/Container';
import { createMovie, createShow } from '../api/api';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const MovieForm = () => {
  const [name, setName] = useState('')
  const [shows, setShows] = useState([])
  const [image, setImage] = useState('')
  const [end_day, setEndDay] = useState('')
  const [start_day, setStartDay] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleShows = ({target}) => {
    const {name} = target;
    const newShows = [...shows]
    if (newShows.includes(name)) {
      setShows(newShows.filter(show => show!== name))
    }
    else {
      newShows.push(name)
      setShows(newShows)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    const moviePayload = {
      name,
      image,
      start_day,
      end_day
    }
    createMovie(moviePayload).then(({movie_id}) => {
      const showsRequests = []
      shows.forEach(show => {
        const [schedule, room] = show.split('-')
        const showPayload = {
          schedule,
          room,
          movie_id
        }
        showsRequests.push(createShow(showPayload))
        Promise.all(showsRequests).then(() => setLoading(false)).catch(() => {
          setLoading(false)
          setSuccess(true)
        })
      })
    }).catch(() => {
      setLoading(false)
      setError(true)
    })
  }
  return (
    <Container
      maxWidth="md"
      sx={{
        borderRadius: '1em',
        bgcolor: 'white',
        padding: '1em 0 1em 0',
        textAlign: 'left',
        marginTop: '2em'
      }}
    >
      <form onSubmit={handleSubmit}>
      <TextField
          required
          id="name"
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="show-grid">
        {Array(3).fill(0).map((_,rowIndex) => {
          return (
            <div className="show-row" key={`row${rowIndex}`}>
              <p>{schedules[rowIndex]}</p>
              {Array(8).fill(0).map((_ ,colIndex) => {
                return (
                  <FormControlLabel
                  key={`col${colIndex}`}
                control={
                  <Checkbox onChange={handleShows} name={`${schedules[rowIndex]}-${colIndex+1}`} />
                }
                label={rowIndex ? '': colIndex+1}
                labelPlacement="top"
              />
                )
              })}
            </div>
            
          )
        })
        }
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:'1em'}}>
          <TextField
            required
            id="image"
            label="Imagen (URL)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <TextField
          required
          id="start_day"
          label="Fecha de estreno (YY-MM-DD)"
          value={start_day}
          onChange={(e) => setStartDay(e.target.value)}
        />
        <TextField
          required
          id="end_day"
          label="Fecha de término (YY-MM-DD)"
          value={end_day}
          onChange={(e) => setEndDay(e.target.value)}
        />
          <LoadingButton loading={loading} variant="contained" type="submit">
            Crear Película
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
          La Película se ha creado exitosamente
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default MovieForm;