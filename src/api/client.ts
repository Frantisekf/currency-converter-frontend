import { CONVERSION_API_BASE_URL } from '../utils/Constants';
import { type ConversionApiResponse, type MoneyType } from '../utils/types';

/**
 * Fetches the currency symbols from the API.
 *
 * @returns {Promise<ConversionApiResponse>} Promise that resolves with the API response.
 */
export const fetchCurrencySymbols = async (): Promise<ConversionApiResponse> => {
  try {
    const response = await fetch(`${CONVERSION_API_BASE_URL}/symbols`);
    const data: ConversionApiResponse = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Converts the specified amount from one currency to another.
 *
 * @param {MoneyType} currencyToConvert - Object containing the original amount, currency codes, and exchange rate.
 * @returns {Promise<ConversionApiResponse>} Promise that resolves with the API response.
 */
export const convertCurrency = async (
  currencyToConvert: MoneyType
): Promise<ConversionApiResponse> => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(currencyToConvert)
    };
    const request = await fetch(`${CONVERSION_API_BASE_URL}/convert`, requestOptions);
    const convertedRequest: ConversionApiResponse = await request.json();
    return convertedRequest;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Fetches all the conversion entries stored in the backend DB from the API.
 *
 * @returns {Promise<ConversionApiResponse>} Promise that resolves with the API response.
 */
export const getAllConversionEntries = async (): Promise<ConversionApiResponse> => {
  try {
    const response = await fetch(`${CONVERSION_API_BASE_URL}/get-all-converted-results`);
    const data: ConversionApiResponse = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
