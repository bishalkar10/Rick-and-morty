import styles from "../styles/navbar.module.css"
import Filter from "./Filter"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter, faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Navbar() {
  const [showFilter, setShowFilter] = useState(false) // if showFilter is true then show the Filter component else hide it
  // function to handle the click event on the filter button
  const handleClick = () => setShowFilter((prevShowFilter) => !prevShowFilter)

  return (
    <header>
      <nav className={styles.nav}> <h1>Rick&Morty</h1>
        <div
          onClick={handleClick}
          className={styles.filterButtonWrapper}>
          <FontAwesomeIcon
            className={styles.icon}
            icon={showFilter ? faX : faFilter}
          />
        </div>
        {showFilter && <Filter />}
      </nav>
    </header>
  )
}
