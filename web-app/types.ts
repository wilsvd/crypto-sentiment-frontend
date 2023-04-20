import { cryptoDataT } from "./store/cryptoslice";

export type TablePropsT = {
	cryptoData: cryptoDataT[];
	watchlist: cryptoDataT[] | null;
};

export type Col = {
	[key: string]: string;
	key: string;
	label: string;
};

export type Cols = Col[];

export const columns: Cols = [
	{
		key: "favourite",
		label: "Favourite",
	},
	{
		key: "cryptocurrency",
		label: "Cryptocurrency",
	},
	{
		key: "sentiment",
		label: "Sentiment (-1 to 1)",
	},
];

export type Row = {
	[key: string]: any;
	key: string;
	favourite: boolean;
	cryptocurrency: string;
	sentiment: string;
};
export type Rows = Row[];
