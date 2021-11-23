import React, {useEffect, useState} from 'react'
import { getMovieShows } from '../api/api';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

export const schedules = ['MATINE', 'TANDA', 'NOCHE']
const MovieList  = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  useEffect(() => {
    getMovieShows().then((response) => {
      setList(response)
      console.log(response)
    })
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
        rooms[item.schedule].append(item.room);
      }
    })
    console.log(rooms)
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
    <div>
      <h1>DCCinema</h1>
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => navigate('/create')}
      >
        Registrar Película
      </Button>
      <ImageList sx={{ width: 500, height: 450 }}>
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
              {Shows(item.shows).map(show => <p>{show}</p>)}
            </div>}
          />
        </ImageListItem>
      ))}
    </ImageList>
    </div>
  )
}

export default MovieList;