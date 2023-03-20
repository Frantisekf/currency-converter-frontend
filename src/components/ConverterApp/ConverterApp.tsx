import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ErrorCard from '../ErrorComponent/ErrorCard';
import Loader from '../Loader/Loader';
import { fetchCurrencySymbols, convertCurrency, getAllConversionEntries } from '../../api/client';
import {
  type CurrencySymbolsType,
  type CurrencyOption,
  type ConversionEntry,
  type ConversionApiResponse
} from '../../utils/types';
import ConversionResultsTable from '../ConversionResultsTable/ConversionResultsTable';
import styles from './ConverterApp.module.css';
import cx from 'classnames';
import { findMostCommonPropertyValue } from '../../utils/helpers';

const ConverterApp: React.FC = () => {
  const [currencySymbols, setCurrencySymbols] = useState<CurrencyOption[]>([]);
  const [amount, setAmount] = useState<number | null>(null);
  const [originCurrency, setOriginCurrency] = useState<string>('');
  const [destCurrency, setDestCurrency] = useState<string>('');
  const [conversionResult, setConversionResult] = useState<number | null>(null);
  const [conversionResultsTable, setConversionResultsTable] = useState<ConversionEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mostPopularDestCurrency, setMostPopularDestCurrency] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    const isValidNumber = /^\d*\.?\d*$/.test(value);
    setAmount(isValidNumber ? (value === '' ? null : Number(value)) : null);
  };

  const handleOriginCurrencyChange = (selectedOption: CurrencyOption | null): void => {
    if (selectedOption != null) {
      setOriginCurrency(selectedOption.value);
    }
  };

  const handleDestCurrencyChange = (selectedOption: CurrencyOption | null): void => {
    if (selectedOption != null) {
      setDestCurrency(selectedOption.value);
    }
  };

  const handleSubmitConversion = async (): Promise<void> => {
    setLoading(true);
    try {
      const result: ConversionApiResponse = await convertCurrency({
        amount,
        from: originCurrency,
        to: destCurrency
      });
      const data: ConversionEntry = result.data as ConversionEntry;
      setConversionResult(data.destAmount);
      setAmount(null);
      setOriginCurrency('');
      setDestCurrency('');
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchCurrencyOptions = async (): Promise<void> => {
    try {
      const result = await fetchCurrencySymbols();
      const options: CurrencyOption[] = (result.data as CurrencySymbolsType[]).map(
        (currency: CurrencySymbolsType) => ({
          label: Object.values(currency)[0],
          value: Object.keys(currency)[0]
        })
      );
      setCurrencySymbols(options);
    } catch (error: any) {
      setError(error);
    }
  };

  const populateConversionTable = async (): Promise<void> => {
    try {
      const result = await getAllConversionEntries();
      setConversionResultsTable(result.data as ConversionEntry[]);
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    void fetchCurrencyOptions();
  }, []);

  useEffect(() => {
    void populateConversionTable();
  }, [conversionResult]);

  useEffect(() => {
    setMostPopularDestCurrency(findMostCommonPropertyValue(conversionResultsTable, 'to'));
  }, [conversionResultsTable]);

  // custom styles for react-select
  const customStyles = {
    control: (base: any) => ({
      ...base,
      width: '230px',
      minWidth: 'auto'
    }),

    placeholder: (base: any) => ({
      ...base,
      fontSize: '12px',
      color: 'grey'
    })
  };

  return (
    <>
      {error && <ErrorCard error={error} />}
      <div className={styles.root}>
        <h1 className={styles.mainHeader}>Currency Converter</h1>
        <div className={styles.converterInput}>
          <input
            type="number"
            min={0}
            value={amount ?? ''}
            placeholder="insert amount"
            onChange={handleAmountChange}></input>
          <span>from:</span>
          <Select
            options={currencySymbols}
            value={{ value: originCurrency, label: originCurrency }}
            className={styles.selectOverride}
            onChange={handleOriginCurrencyChange}
            isSearchable={true}
            styles={customStyles}
            placeholder={'type/select currency'}></Select>
          <span>to:</span>
          <Select
            value={{ value: destCurrency, label: destCurrency }}
            className={styles.selectOverride}
            options={currencySymbols}
            styles={customStyles}
            onChange={handleDestCurrencyChange}
            isSearchable={true}
            placeholder="type/select currency"></Select>
          <button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleSubmitConversion}
            disabled={amount == null || originCurrency === '' || destCurrency.length === 0}>
            Convert
          </button>
        </div>
        <div>Most popular destination currency: {mostPopularDestCurrency}</div>
        <div className={styles.conversionResult}>
          {loading ? (
            <Loader />
          ) : (
            <div className={cx(conversionResult != null ? '' : styles.hidden)}>
              Conversion result: {conversionResult}
            </div>
          )}
        </div>

        <ConversionResultsTable conversionEntries={conversionResultsTable} isLoading={isLoading} />
      </div>
    </>
  );
};

export default ConverterApp;
