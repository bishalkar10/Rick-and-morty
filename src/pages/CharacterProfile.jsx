import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import styles from '../styles/characterProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function CharacterProfile() {
  const { id } = useParams() // retrive the id from the path parameter
  const [characterDetails, setCharacterDetails] = useState({
    name: "",
    species: "",
    gender: "",
    origin: "",
    location: "",
    image: "",
    dimension: "",
    amountOfResidents: "",
    episodeList: [],
  })
  const [showEpisodeList, setShowEpisodeList] = useState(false);

  const toggleEpisodeList = () => {
    setShowEpisodeList(!showEpisodeList);
  };
  // use useEffect hook to fetch data from the https://rickandmortyapi.com/api/character/${id} and then get the location.url and make another fetch request to get amount of residents from that location
  useEffect(() => {
    // function to get the episode name from the url
    async function getEpisodeName(url) {
      const response = await fetch(url)
      const data = await response.json()
      const { name } = data // destructuring the name from the data object
      return name // return the name of the episode
    }

    // function to get the location details from the url
    async function getLocationDetails(url) {
      const response = await fetch(url)
      const data = await response.json()
      const { name, dimension, residents } = data
      const amountOfResidents = residents.length // get the length of the residents array
      return { name, dimension, amountOfResidents }
    }

    async function fetchCharacter() {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
      const data = await response.json()
      const { name: characterName, species, gender, origin, location, image, episode } = data;
      const { url: locationURL } = location;

      // we are making 2 api calls concurrently using Promise.all()
      // * 1st Promise.all() - we are destructuring the data from the response of the first api call and then destructuring the name, dimension, and amountOfResidents from the data object
      // * 2nd Promise.all() - we are making another api call to get the episode name from the url and then we are using Promise.all() to make all the api calls concurrently and they return a single string object which we are storing in episodeList
      const [{ name: locationName, dimension, amountOfResidents }, episodeList] = await Promise.all([getLocationDetails(locationURL), Promise.all(episode.map((url) => getEpisodeName(url)))])
      // update the characterDetails state with the data we got from the api calls
      setCharacterDetails({
        name: characterName,
        species: species,
        gender: gender,
        origin: origin.name,
        location: locationName,
        image: image,
        dimension: dimension,
        amountOfResidents: amountOfResidents,
        episodeList: episodeList
      })
    }
    fetchCharacter()
    // this useEffect hook will only run and id is never going to change but we are including it due to es-lint warnings
  }, [id])

  return (
    <div className={styles.characterProfile}>

      <div className={styles.characterInfo}>
        <img className={styles.image} src={characterDetails.image} alt={characterDetails.name} />
        <h1>{characterDetails.name}</h1>
        <div className={styles.info}>Species : <span> {characterDetails.species}</span></div>
        <div className={styles.info}>Gender : <span> {characterDetails.gender}</span></div>
        <div className={styles.info}>Origin : <span>{characterDetails.origin}</span></div>
        <div className={styles.info}>Location : <span>{characterDetails.location}</span></div>
        <div className={styles.info}>Dimension : <span>{characterDetails.dimension}</span> </div>
        <div className={styles.info}>Amount of Residents : <span> {characterDetails.amountOfResidents}</span></div>
      </div>
      <button className={styles.toggleButton} onClick={toggleEpisodeList}>Episodes
        <FontAwesomeIcon icon={faAngleRight} className={showEpisodeList ? styles.rotateDown : styles.rotateBack} />
      </button>
      {showEpisodeList && (
        <ul className={styles.unorderedList}>
          {characterDetails.episodeList.map((episode, index) => (
            <li key={index}>{episode}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
