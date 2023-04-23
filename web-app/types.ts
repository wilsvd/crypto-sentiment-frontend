import { CryptoData } from "./store/cryptoslice";

/**
 * The type for the props of the CryptoTable component.
 *
 * @typedef {Object} TablePropsT
 * @property {CryptoData[]} cryptoData - An array of CryptoData objects.
 * @property {CryptoData[] | null} watchlist - An optional array of CryptoData objects representing the watchlist.
 */
export type TablePropsT = {
	cryptoData: CryptoData[];
	watchlist: CryptoData[] | null;
};

/**
 * Represents a column in the CryptoTable component.
 *
 * @typedef {Object} Col
 * @property {string} key - The unique key for the column.
 * @property {string} label - The label to be displayed in the column header.
 */
export type Col = {
	[key: string]: string;
	key: string;
	label: string;
};

/**
 * An array of column objects used to define the columns in the CryptoTable component.
 *
 * @typedef {Col[]} Cols
 */
export type Cols = Col[];

/**
 * Represents a row in the CryptoTable component.
 *
 * @typedef {Object} Row
 * @property {string} key - The unique key for the row.
 * @property {boolean} favourite - A boolean value indicating whether the crypto is in the watchlist.
 * @property {string} cryptocurrency - The name of the cryptocurrency.
 * @property {string} sentiment - A string representing the sentiment score of the cryptocurrency.
 */
export type Row = {
	[key: string]: any;
	key: string;
	favourite: boolean;
	cryptocurrency: string;
	sentiment: string;
};

/**
 * An array of row objects used to define the rows in the CryptoTable component.
 *
 * @typedef {Row[]} Rows
 */
export type Rows = Row[];
