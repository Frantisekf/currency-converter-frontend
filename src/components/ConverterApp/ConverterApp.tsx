import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { fetchCurrencySymbols, convertCurrency, getAllConversionEntries } from '../../api/client';
import {
  type CurrencySymbolsType,
  type CurrencyOption,
  type ConversionEntry,
  type ConversionApiResponse
} from '../../utils/types';
import ConversionResultsTable from '../ConversionResultsTable/ConversionResultsTable';
import styles from './ConverterApp.module.css';

const ConverterApp: React.FC = () => {
  const [currencySymbols, setCurrencySymbols] = useState<CurrencyOption[]>([]);
  const [amount, setAmount] = useState<number | null>(null);
  const [originCurrency, setOriginCurrency] = useState<string>('');
  const [destCurrency, setDestCurrency] = useState<string>('');
  const [conversionResult, setConversionResult] = useState<number | null>(null);
  const [conversionResultsTable, setConversionResultsTable] = useState<ConversionEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error(error);
    }
  };

  const populateConversionTable = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const result = await getAllConversionEntries();
      setConversionResultsTable(result.data as ConversionEntry[]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchCurrencyOptions();
  }, []);

  useEffect(() => {
    void populateConversionTable();
  }, [conversionResult]);

  // custom styles for react-select
  const customStyles = {
    control: (base: any) => ({
      ...base,
      width: '230px',
      minWidth: '230'
    }),

    placeholder: (base: any) => ({
      ...base,
      fontSize: '12px',
      color: 'grey'
    })
  };

  return (
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
          onChange={handleOriginCurrencyChange}
          isSearchable={true}
          styles={customStyles}
          placeholder={'type/select currency'}></Select>
        <span>to:</span>
        <Select
          value={{ value: destCurrency, label: destCurrency }}
          options={currencySymbols}
          styles={customStyles}
          onChange={handleDestCurrencyChange}
          isSearchable={true}
          placeholder="type/select currency"></Select>
        <button
          onClick={() => handleSubmitConversion}
          disabled={!amount || !originCurrency || !destCurrency}>
          Convert
        </button>
      </div>
      <div className={styles.conversionResult}>{conversionResult}Result </div>

      <ConversionResultsTable conversionEntries={conversionResultsTable} isLoading={isLoading} />
    </div>
  );
};

export default ConverterApp;
