import React, { useEffect } from 'react';
import css from '../../styles.module.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({onClose, children}) {
  
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {

    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
    // eslint-disable-next-line
  }, [])

  return createPortal(
      <div className={css.Overlay} onClick={ handleBackdropClick }>
          <div className={css.Modal}>
              {children}
          </div>
      </div>, modalRoot,
    )
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  }