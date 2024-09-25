import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import Pagination from './Pagination';

function Movies({ handlewatchlist, handleremovewatchlist, watchlist }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [search, setSearch] = useState(""); // State for search input
  const [genre, setGenre] = useState(""); // State for genre filter
  const [genres, setGenres] = useState([]); // State for genres list

  // Fetch genres from API
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=cc92a66663969e890327e39c0b35cfb7&language=en-US`)
      .then(response => {
        setGenres(response.data.genres);
      });
  }, []);

  // Fetch movies based on page, search, and genre filter
  useEffect(() => {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=cc92a66663969e890327e39c0b35cfb7&language=en-US&page=${pageNo}`;
    if (search) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=cc92a66663969e890327e39c0b35cfb7&language=en-US&query=${search}&page=${pageNo}`;
    } else if (genre) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=cc92a66663969e890327e39c0b35cfb7&language=en-US&with_genres=${genre}&page=${pageNo}`;
    }
    axios.get(url).then(response => {
      setMovies(response.data.results);
    });
  }, [pageNo, search, genre]);

  const handlePrev = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPageNo(1); // Reset to the first page on new search
  };

  const handleFilter = (e) => {
    setGenre(e.target.value);
    setPageNo(1); // Reset to the first page on new filter
  };

  return (
    <div className='p-3 bg-white'>
      {/* Search and Filter Controls */}
      <div className='flex flex-col items-center mb-4'>
        <input
          type='text'
          placeholder='Search Movies'
          value={search}
          onChange={handleSearch}
          className='h-12 w-64 bg-gray-700 text-orange-500 rounded-lg shadow-md outline-none px-4 border border-gray-500 focus:border-gray-300 focus:ring-1 focus:ring-gray-500 mb-4'
        />
        <select
          value={genre}
          onChange={handleFilter}
          className='h-12 w-64 bg-gray-700 text-orange-500 rounded-lg shadow-md outline-none px-4 border border-gray-500 focus:border-gray-300 focus:ring-1 focus:ring-gray-500'
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>

      {/* Movie List */}
      <div className='m-5 text-2xl font-bold text-center text-white bg-orange-500'>Trending Movies</div>
      <div className='flex flex-row flex-wrap justify-around gap-5'>
        {movies.map(movieObj => (
          <MovieCard
            key={movieObj.id}
            movieObj={movieObj}
            poster_path={movieObj.poster_path}
            name={movieObj.original_title}
            handlewatchlist={handlewatchlist}
            handleremovewatchlist={handleremovewatchlist}
            watchlist={watchlist}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination pageNo={pageNo} handlePrev={handlePrev} handleNext={handleNext} />
    </div>
  );
}

export default Movies;