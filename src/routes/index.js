import React from 'react';
import { Routes as LibraryRoutes, Route } from 'react-router-dom';
import MovieList from '../components/movieList';
import MovieForm from '../components/movieForm';
import ReservationForm from '../components/reservationForm';

const Routes = () => (
  <LibraryRoutes>
    <Route exact path="/" element={<MovieList/>} />
    <Route exact path="/create" element={<MovieForm/>} />
    <Route exact path="/reservate/:movieId" element={<ReservationForm/>} />
  </LibraryRoutes>
);

export default Routes;