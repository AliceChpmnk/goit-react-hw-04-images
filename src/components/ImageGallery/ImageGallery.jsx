import React from 'react';
import {ImageGalleryItem} from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from '../../styles.module.css';

export function ImageGallery({query, pictures}) {
  return (
    <ul className={css.ImageGallery}>
        {pictures.map(({ id, webformatURL, largeImageURL }) => {
            return <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} alt={query} />
        })}
    </ul>
  )
}

ImageGallery.propTypes = {
        query: PropTypes.string.isRequired,
        pictures: PropTypes.array.isRequired,
}