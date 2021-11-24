import React from 'react';
import { Routes as LibraryRoutes, Route } from 'react-router-dom';
import MovieList from '../components/movieList';
import MovieForm from '../components/movieForm';
import ReservationForm from '../components/reservationForm';
import Menu from '../components/menu';

const components = {
  'list': <MovieList/>,
  'form': <MovieForm/>,
  'reservation': <ReservationForm/>
}
const customeRoute = (component) => {
  return (
      <div>
        <Menu/>
        {components[component]}
      </div>
  )
}

const Routes = () => (
  <LibraryRoutes>
  <Route path="/" element={customeRoute('list')}/>
  <Route path="/create" element={customeRoute('form')}/>
  <Route path="/reservate/:movieId/:schedule" element={customeRoute('reservation')}/>
  </LibraryRoutes>
);

export default Routes;