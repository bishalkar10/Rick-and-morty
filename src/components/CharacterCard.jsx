import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../styles/characters.module.css';
import React from 'react';
// destructure the item object provided as prop and retrive id, name, image
const CharacterCard = ({ id, name, image }) => {
  return (
    <Link to={`/character/${id}`} className={styles.link}>
      <figure className={styles.characterCard}>
        <img src={image} alt={name} />
        <figcaption>{name}</figcaption>
      </figure>
    </Link>
  );
};

CharacterCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default CharacterCard;
