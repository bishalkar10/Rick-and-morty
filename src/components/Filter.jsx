import styles from "../styles/filter.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import FilterContext from "../store/context/filterContext";
import characterContext from '../store/context/charactersContext';
import React, { useState, useContext } from "react";

export default function Filter() {
  const { setCharacters } = useContext(characterContext)
  const { filters, setFilters, setPage } = useContext(FilterContext)
  const [localFilters, setLocalFilters] = useState(filters)
  const handleSubmit = (e) => {
    e.preventDefault();
    // trim the filter values before sumbission 
    const trimmedFilters = Object.keys(localFilters).reduce((acc, key) => {
      acc[key] = localFilters[key].trim()
      return acc
    }, {})
    // suppose we have applied a filter and and we are spamming the search button and then just return else
    // characters array will be empty and nothing will be there to render.
    if (trimmedFilters === filters) return

    // clear the array and apply the filters it will re-render the useEffect hook
    setCharacters([])
    setPage(1)
    setFilters(localFilters)
  };
  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <form className={styles.filterForm} onSubmit={handleSubmit}>
      <input
        data-testid="nameInput"
        className={styles.inputField}
        type="text"
        name="name"
        placeholder="Search by name"
        value={localFilters.name}
        onChange={handleInputChange}
      />
      <input
        data-testid="typeInput"
        placeholder="Search by type"
        className={styles.inputField}
        type="text"
        name="type"
        value={localFilters.type}
        onChange={handleInputChange}
      />
      <select
        data-testid="genderInput"
        name="gender"
        className={styles.inputField}
        value={localFilters.gender}
        onChange={handleInputChange}
      >
        <option value="">Gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>
      <select
        data-testid="speciesInput"
        name="species"
        className={styles.inputField}
        value={localFilters.species}
        onChange={handleInputChange}
      >
        <option value="">Species</option>
        <option value="human">Human</option>
        <option value="alien">Alien</option>
        <option value="robot">Robot</option>
        <option value="unknown">Unknown</option>
      </select>

      <select
        data-testid="statusInput"
        name="status"
        className={styles.inputField}
        value={localFilters.status}
        onChange={handleInputChange}
      >
        <option value="">Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <div className={styles.searchButtonWrapper}>
        <button
          data-testid="searchButton"
          onClick={handleSubmit}
          type="submit">
          <FontAwesomeIcon className={styles.icon} icon={faSearch} />
        </button>
      </div>
    </form>
  )
}
