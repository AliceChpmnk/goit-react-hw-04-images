import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from '../../styles.module.css';
import Modal from 'components/Modal/Modal';

export function ImageGalleryItem({webformatURL, alt, largeImageURL}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

  return (
    <li className={css.ImageGalleryItem}>
        <img src={webformatURL} alt={alt} className={css.ImageGalleryItem_image} onClick={openModal}/>
        {isModalOpen && <Modal onClose={closeModal}><img src={ largeImageURL } alt={alt} /></Modal>}
   </li>
  )
}

ImageGalleryItem.propTypes = {
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
    }