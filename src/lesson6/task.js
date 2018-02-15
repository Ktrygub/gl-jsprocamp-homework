import axios from 'axios';

function findExactMatchName(collection, name) {
  return collection.find(el => el.name === name);
}

// с помощью Fetch API и swapi.co API получить следующие данные

// Климат на любой планете по её имени
// {planetName} – String
const getClimate = function getClimate(planetName) {
  return axios
    .get(`https://swapi.co/api/planets/?search=${planetName}`)
    .then(res => {
      // res.data.results contains array with planets partially matched with {planetName},
      // f.e. getClimate('tooine') will match with 'Dantooine' and 'Tatooine' planets.
      const planets = res.data.results;
      const planet = findExactMatchName(planets, planetName);
      if (!planet) {
        throw new Error('There is no such planet in Star Wars Universe.');
      }
      return planet.climate;
    })
    .catch(error => {
      throw error;
    });
};

// Получить информацию (Object) о любом персонаже по имени
// {name} – String
const getProfile = function getProfile(name) {
  return axios
    .get(`https://swapi.co/api/people/?search=${name}`)
    .then(res => {
      const people = res.data.results;
      const person = findExactMatchName(people, name);
      if (!person) {
        throw new Error('There is no such person in Star Wars Universe.');
      }
      return person;
    })
    .catch(error => {
      throw error;
    });
};

// Получить список пилотов (имена в виде Array of Strings) космического корабля
// по его названию
// {starshipName} - String

const getPilots = function getPilots(starshipName) {
  return axios
    .get(`https://swapi.co/api/starships/?search=${starshipName}`)
    .then(res => {
      const starships = res.data.results;
      const starship = findExactMatchName(starships, starshipName);
      if (!starship) {
        throw new Error('There is no such starship in Star Wars Universe.');
      }
      return starship.pilots;
    })
    .then(pilotsUrl => {
      const getPilotsNames = pilotsUrl.map(url => axios.get(url).then(res => res.data.name));
      return Promise.all(getPilotsNames);
    })
    .catch(error => {
      throw error;
    });
};

export default {
  getClimate,
  getProfile,
  getPilots,
};
