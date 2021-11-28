import React, {useEffect, useState} from 'react'
import { getMovieShows } from '../api/api';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

export const schedules = ['MATINE', 'TANDA', 'NOCHE']
const MovieList  = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    getMovieShows().then((response) => {
      setList(response)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])
  const Shows = (shows) => {
    const rooms = {}
    const subtitle = []
    shows.forEach((item) => {
      const roomsList = rooms[item.schedule]
      if (!roomsList) {
        rooms[item.schedule] = [item.room]
      }
      else {
        rooms[item.schedule].push(item.room);
      }
    })

    schedules.forEach(schedule=> {
      if (rooms[schedule]) {
        subtitle.push(`${schedule}: ${rooms[schedule].map(room => `SALA${room}`).join(',')}`)
      }
    })
    return (
        subtitle

    )
  }
  return (
    <Container
      maxWidth="sm"
      sx={{
        borderRadius: '1em',
        bgcolor: 'wheat',
        padding: '1em 0 1em 0',
        textAlign: 'cener',
        marginTop: '2em',
      }}
    >
      <h1 id="title">DCCinema</h1>
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => navigate('/create')}
      >
        Registrar Película
      </Button>
      {!loading ? <ImageList sx={{ width: 500, height: 700 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Cartelera</ListSubheader>
      </ImageListItem>
      {list.map((item) => (
        <ImageListItem key={item.image}>
          <img
            src={item.image}
            srcSet={item.image}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.name}
            subtitle={
            <div>
              {Shows(item.shows).map(show => 
              <p key={show} className="show" onClick={() => navigate(`/reservate/${item.movie_id}/${show.split(':')[0]}`)}>
                {show}
                </p>)}
            </div>}
          />
        </ImageListItem>
      ))}
    </ImageList>
    : <CircularProgress/>
    }
    </Container>
  )
}

export default MovieList;