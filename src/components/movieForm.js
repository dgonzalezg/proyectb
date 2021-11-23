import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {schedules} from './movieList';
import './form.css';
import LoadingButton from '@mui/lab/LoadingButton';
import Container from '@mui/material/Container';
import { createMovie, createShow } from '../api/api';
const MovieForm = () => {
  const [name, setName] = useState('')
  const [shows, setShows] = useState([])
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const handleShows = ({target}) => {
    const {name} = target;
    console.log(name)
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
      image
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
        Promise.all(showsRequests).then(() => setLoading(false)).catch(() => setLoading(false))
      })
    }).catch(() => setLoading(false))
  }
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
        <div style={{display:'flex', 'flex-direction':'column', gap:'1em'}}>
          <TextField
            required
            id="image"
            label="Imagen (URL)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <LoadingButton loading={loading} variant="contained" type="submit">
            Crear Película
          </LoadingButton>
        </div>
      </form>
    </Container>
  )
}

export default MovieForm;