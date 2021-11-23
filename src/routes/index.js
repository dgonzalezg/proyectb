import React from 'react';
import { Routes as LibraryRoutes, Route } from 'react-router-dom';
import MovieList from '../components/movieList';
import MovieForm from '../components/movieForm';

const Routes = () => (
  <LibraryRoutes>
    <Route exact path="/" element={<MovieList/>} />
    <Route exact path="/create" element={<MovieForm/>} />
  </LibraryRoutes>
);

export default Routes;