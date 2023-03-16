import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import styles from './ErrorCard.module.css';

interface ErrorCardProps {
  error: Error | null;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ error }: ErrorCardProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (error != null) {
      setShow(true);
    }
  }, [error]);

  const handleClose = (): void => {
    setShow(false);
  };

  return (
    <div
      className={cx(styles.card, show && styles.show)}
      onAnimationEnd={() => {
        if (!show) {
          handleClose();
        }
      }}>
      <div className={styles.cardHeader}>
        <h3>Error</h3>
        <button className={styles.closeBtn} onClick={handleClose}>
          &times;
        </button>
      </div>
      <div className={styles.cardBody}>
        <p>{error?.message}</p>
      </div>
    </div>
  );
};

export default ErrorCard;
