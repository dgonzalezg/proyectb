import axios from "axios";

const url = process.env.REACT_APP_URL

export const getMovieShows = async () => {
  const {data} = await axios.get(`${url}/shows/by-movie`)
  return data;
}

export const createMovie = async (payload) => {
  const {data} = await axios.post(`${url}/movies`, payload)
  return data;
}

export const createShow = async (payload) => {
  const {data} = await axios.post(`${url}/shows`, payload)
  return data;
}

export const createReservation = async (payload) => {
  const {data} = await axios.post(`${url}/reservations`, payload)
  return data;
}