import axios from 'axios';

function findExactMatchName(collection, name) {
  return collection.find(el => el.name === name);
}

// с помощью Fetch API и swapi.co API получить следующие данные

// Климат на любой планете по её имени
// {planetName} – String
const getClimate = async function getClimate(planetName) {
  const res = await axios.get(`https://swapi.co/api/planets/?search=${planetName}`);
  const planets = res.data.results;
  const planet = findExactMatchName(planets, planetName);
  if (!planet) {
    throw new Error('There is no such planet in Star Wars Universe.');
  }
  return planet.climate;
};

// Получить информацию (Object) о любом персонаже по имени
// {name} – String
const getProfile = async function getProfile(name) {
  const res = await axios.get(`https://swapi.co/api/people/?search=${name}`);
  const people = res.data.results;
  const person = findExactMatchName(people, name);
  if (!person) {
    throw new Error('There is no such person in Star Wars Universe.');
  }
  return person;
};

// Получить список пилотов (имена в виде Array of Strings) космического корабля
// по его названию
// {starshipName} - String

const getPilots = async function getPilots(starshipName) {
  const res = await axios.get(`https://swapi.co/api/starships/?search=${starshipName}`);
  const starships = res.data.results;
  const starship = findExactMatchName(starships, starshipName);
  if (!starship) {
    throw new Error('There is no such starship in Star Wars Universe.');
  }
  const pilotsUrl = starship.pilots;
  const getPilotsNames = pilotsUrl.map(async pilotUrl => {
    const pilot = await axios.get(pilotUrl);
    const { name } = pilot.data;
    return name;
  });
  return Promise.all(getPilotsNames);
};

export default {
  getClimate,
  getProfile,
  getPilots,
};
