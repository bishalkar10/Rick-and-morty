import styles from '../styles/characters.module.css';
import CharacterCard from '../components/CharacterCard';
import { useContext, useEffect } from 'react';
import FilterContext from '../store/context/filterContext';
import characterContext from '../store/context/charactersContext';
import axios from 'axios';
import Navbar from '../components/Navbar';


export default function Characters() {
  const { filters, page, setPage } = useContext(FilterContext)
  const { characters, setCharacters } = useContext(characterContext);
  const characterMap = new Map(); // Map to store characters based on their IDs

  useEffect(() => {

    async function getMoreCharacters(callback, filters, page) {
      try {
        const url = `https://rickandmortyapi.com/api/character/`;
        const options = {
          params: {
            ...filters,
            page: page,
          },
          headers: {
            accept: "application/json",
          },
        };
        const res = await axios.get(url, options)
        // if the status is 200 then call the callback function and pass the data to it
        if (res.status === 200) {
          callback(res.data.results)
        }
        else if (res.status === 404) {
          throw Error("404 Not Found")
        }
        else {
          throw Error("Unknown Error")
        }
      } catch (error) {

        // handle the error and show it to user
        // console.log(error.message) 
      }
    }

    getMoreCharacters((newCharacters) => {
      setCharacters((prevCharacters) => [...prevCharacters, ...newCharacters]);
    }, filters, page)
  }, [filters, page])

  useEffect(() => {
    const handlePageEnd = () => setPage((prevPage) => prevPage + 1);

    let isLoading = false;

    // handlescrole funtionality
    function handleScroll() {
      if (isLoading) return;

      const scrollTop =
        document.documentElement?.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement?.scrollHeight || document.body.scrollHeight;
      const clientHeight =
        document.documentElement?.clientHeight || window.innerHeight;
      const scrollToBottom =
        Math.ceil(scrollTop + clientHeight + 200) >= scrollHeight;

      if (scrollToBottom) {
        isLoading = true;

        // call the handlePageEnd function and increase the page number by 1 and then set the isLoading to false after 1 second
        handlePageEnd();
        // now use the setTimeout function to set the isLoading to false after 1 second
        // for this whole 1 second the isLoading will be true and more api calls will not be made
        setTimeout(() => {
          isLoading = false;
        }, 1000);
      }
    }

    // add event listener to the window object to listen for scroll event and call the handleScroll function
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // filter out the characters which are already present in the characters array
  const uniqueNewCharacters = characters
    .filter((character) => !characterMap.has(character.id))
    .map((character) => {
      characterMap.set(character.id, character.name);
      return character;
    });

  const characterCards = uniqueNewCharacters.map((item) => {
    const { id } = item
    // returning CharacterCard which contains the character name and image as well as the character id as a path parameter
    return <CharacterCard key={id} {...item} />
  })

  return (
    <>
      <Navbar />
      <div className={styles.grid}>
        {characterCards}
      </div>
    </>
  )
}