import React from 'react';
import { type CurrencyTableProps } from '../../utils/types';
import styles from './ConversionResultsTable.module.css';
import cx from 'classnames';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ISOStringToDate = (ISOString: string): string => {
  return new Date(ISOString).toLocaleString();
};

const ConversionResultsTable: React.FC<CurrencyTableProps> = ({ conversionEntries, isLoading }) => {
  if (isLoading || conversionEntries.length === 0) {
    return (
      <div className={styles.table}>
        <div className={cx(styles.row, styles.header)}>
          <div className={styles.cell}>Amount</div>
          <div className={styles.cell}>From</div>
          <div className={styles.cell}>To</div>
          <div className={styles.cell}>Result</div>
          <div className={styles.cell}>Timestamp</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <Skeleton count={10} />
            </SkeletonTheme>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.table}>
      <div className={cx(styles.row, styles.header)}>
        <div className={styles.cell}>Amount</div>
        <div className={styles.cell}>From</div>
        <div className={styles.cell}>To</div>
        <div className={styles.cell}>Result</div>
        <div className={styles.cell}>Timestamp</div>
      </div>
      {conversionEntries
        .map((entry) => (
          <div className={styles.row} key={entry.createdAt}>
            <div className={styles.cell}>{entry.originalAmount}</div>
            <div className={styles.cell}>{entry.from}</div>
            <div className={styles.cell}>{entry.to}</div>
            <div className={styles.cell}>{entry.destAmount}</div>
            <div className={styles.cell}>{ISOStringToDate(entry.createdAt)}</div>
          </div>
        ))
        .reverse()}
    </div>
  );
};

export default ConversionResultsTable;
