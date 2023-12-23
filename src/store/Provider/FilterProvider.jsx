import { useState } from 'react';
import PropTypes from 'prop-types';
import FilterContext from "../context/filterContext";

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    gender: '',
    species: '',
    type: '',
  });

  const [page, setPage] = useState(1);

  return (
    <FilterContext.Provider value={{ filters, setFilters, page, setPage }}>
      {children}
    </FilterContext.Provider>
  );
  // validate props 
};

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};