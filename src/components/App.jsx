import React, { useEffect, useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import css from '../styles.module.css';
import { Loader } from './Loader/Loader';
import { LoadMoreButton } from './Button/Button';
import * as API from 'services/pixabyApi';
import PropTypes from 'prop-types';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const PER_PAGE = 12;

export default function App() {
  const [query, setQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [islastPage, setIslastPage] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);


  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchImages = async (query, page) => {
      try {
        setStatus(Status.PENDING);
        const newPictures = await API.getPicturesByName(query, page);
        setPictures(state => [...state, ...newPictures.hits]);
        setTotal(newPictures.totalHits);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error.message);
        setStatus(Status.REJECTED);
      }
    };

    fetchImages(query, page);
    
  }, [query, page])

  useEffect(() => {
    if (page >= total / PER_PAGE || total < PER_PAGE) {
      setIslastPage(true);
    }
  }, [total, page])

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error])

  const onLoadMoreBtnClick = () => {
        setPage(page => page + 1);
  }
  
  const onSubmit = (query) => {
    setQuery(query);
    setPictures([]);
    setPage(1);
    setIslastPage(false);
  }

  return (
    <div className={css.App}>
        <Searchbar onSubmit={onSubmit} />
        {status === Status.REJECTED && <div>Oooops, something went wrong :( Try reloading the page.</div>}
        {(status === Status.RESOLVED && pictures.length === 0) && <div>Sorry, there are no images matching your search query. Please try again.</div>}
        {pictures.length > 0 && <ImageGallery pictures={pictures} query={ query } />}
        {status === Status.PENDING && <Loader />}
        {(pictures.length > 0 && status !== Status.PENDING && !islastPage) && <LoadMoreButton onClick={onLoadMoreBtnClick} />}
    </div>
  )
}

App.propTypes = {
  query: PropTypes.string,
}