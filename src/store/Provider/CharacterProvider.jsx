import { useState } from "react";
import PropTypes from "prop-types";
import characterContext from "../context/charactersContext";

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  return (
    <characterContext.Provider value={{ characters, setCharacters }}>
      {children}
    </characterContext.Provider>
  );

}

CharacterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
