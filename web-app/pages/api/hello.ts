// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { getLatestCryptoHistory } from "@/utility/firestore_helper";
// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
// 	name: string;
// };
// const RESULT_OBJECT = [
// 	{
// 		"0xPolygon": {
// 			datetime: {
// 				seconds: 1677596247,
// 				nanoseconds: 99493000,
// 			},
// 			sub_sentiment: 0.36,
// 		},
// 	},
// 	{
// 		"1inch": {
// 			datetime: {
// 				seconds: 1677596270,
// 				nanoseconds: 10306000,
// 			},
// 			sub_sentiment: 0.24,
// 		},
// 	},
// 	{
// 		Aave_Official: {
// 			sub_sentiment: 0.12,
// 			datetime: {
// 				seconds: 1677596258,
// 				nanoseconds: 302491000,
// 			},
// 		},
// 	},
// 	{
// 		AlgorandOfficial: {
// 			sub_sentiment: 0.14,
// 			datetime: {
// 				seconds: 1677596216,
// 				nanoseconds: 155659000,
// 			},
// 		},
// 	},
// 	{
// 		Arweave: {
// 			datetime: {
// 				seconds: 1677596216,
// 				nanoseconds: 157017000,
// 			},
// 			sub_sentiment: 0.17,
// 		},
// 	},
// 	{
// 		Avax: {
// 			datetime: {
// 				seconds: 1677596283,
// 				nanoseconds: 352954000,
// 			},
// 			sub_sentiment: 0.34,
// 		},
// 	},
// 	{
// 		AxieInfinity: {
// 			datetime: {
// 				seconds: 1677596267,
// 				nanoseconds: 754729000,
// 			},
// 			sub_sentiment: 0.06,
// 		},
// 	},
// 	{
// 		BATProject: {
// 			datetime: {
// 				seconds: 1677596285,
// 				nanoseconds: 37171000,
// 			},
// 			sub_sentiment: 0,
// 		},
// 	},
// 	{
// 		BitcoinGoldHQ: {
// 			datetime: {
// 				seconds: 1677596254,
// 				nanoseconds: 815374000,
// 			},
// 			sub_sentiment: 0.41,
// 		},
// 	},
// 	{
// 		Bitcoincash: {
// 			sub_sentiment: 0.35,
// 			datetime: {
// 				seconds: 1677596320,
// 				nanoseconds: 371047000,
// 			},
// 		},
// 	},
// 	{
// 		BittorrentToken: {
// 			datetime: {
// 				seconds: 1677596315,
// 				nanoseconds: 562460000,
// 			},
// 			sub_sentiment: -0.07,
// 		},
// 	},
// 	{
// 		CasperCSPR: {
// 			datetime: {
// 				seconds: 1677596279,
// 				nanoseconds: 913056000,
// 			},
// 			sub_sentiment: 0.03,
// 		},
// 	},
// 	{
// 		CeloHQ: {
// 			datetime: {
// 				seconds: 1677596331,
// 				nanoseconds: 433714000,
// 			},
// 			sub_sentiment: 0.2,
// 		},
// 	},
// 	{
// 		Crypto_com: {
// 			datetime: {
// 				seconds: 1677596346,
// 				nanoseconds: 148386000,
// 			},
// 			sub_sentiment: -0.01,
// 		},
// 	},
// 	{
// 		CurveDAO: {
// 			datetime: {
// 				seconds: 1677596306,
// 				nanoseconds: 969156000,
// 			},
// 			sub_sentiment: 0.24,
// 		},
// 	},
// 	{
// 		EOS: {
// 			sub_sentiment: 0.48,
// 			datetime: {
// 				seconds: 1677596253,
// 				nanoseconds: 24600000,
// 			},
// 		},
// 	},
// 	{
// 		EnjinCoin: {
// 			datetime: {
// 				seconds: 1677596259,
// 				nanoseconds: 992715000,
// 			},
// 			sub_sentiment: 0.08,
// 		},
// 	},
// 	{
// 		EthereumClassic: {
// 			datetime: {
// 				seconds: 1677596309,
// 				nanoseconds: 361691000,
// 			},
// 			sub_sentiment: 0.26,
// 		},
// 	},
// 	{
// 		FantomFoundation: {
// 			datetime: {
// 				seconds: 1677596247,
// 				nanoseconds: 944779000,
// 			},
// 			sub_sentiment: 0.19,
// 		},
// 	},
// 	{
// 		FetchAI_Community: {
// 			sub_sentiment: 0.18,
// 			datetime: {
// 				seconds: 1677596223,
// 				nanoseconds: 14399000,
// 			},
// 		},
// 	},
// 	{
// 		Gemini: {
// 			sub_sentiment: -0.13,
// 			datetime: {
// 				seconds: 1677596228,
// 				nanoseconds: 717826000,
// 			},
// 		},
// 	},
// 	{
// 		GolemProject: {
// 			sub_sentiment: 0.24,
// 			datetime: {
// 				seconds: 1677596309,
// 				nanoseconds: 172472000,
// 			},
// 		},
// 	},
// 	{
// 		HeliumNetwork: {
// 			datetime: {
// 				seconds: 1677596229,
// 				nanoseconds: 707706000,
// 			},
// 			sub_sentiment: -0.16,
// 		},
// 	},
// 	{
// 		HuobiGlobal: {
// 			sub_sentiment: 0.46,
// 			datetime: {
// 				seconds: 1677596283,
// 				nanoseconds: 231532000,
// 			},
// 		},
// 	},
// 	{
// 		IoTex: {
// 			datetime: {
// 				seconds: 1677596273,
// 				nanoseconds: 137185000,
// 			},
// 			sub_sentiment: 0.34,
// 		},
// 	},
// 	{
// 		Iota: {
// 			datetime: {
// 				seconds: 1677596330,
// 				nanoseconds: 527287000,
// 			},
// 			sub_sentiment: 0.12,
// 		},
// 	},
// 	{
// 		MakerDAO: {
// 			datetime: {
// 				seconds: 1677596301,
// 				nanoseconds: 699421000,
// 			},
// 			sub_sentiment: 0.05,
// 		},
// 	},
// 	{
// 		MaskNetwork: {
// 			datetime: {
// 				seconds: 1677596319,
// 				nanoseconds: 883564000,
// 			},
// 			sub_sentiment: 0.24,
// 		},
// 	},
// 	{
// 		MinaProtocol: {
// 			sub_sentiment: 0.22,
// 			datetime: {
// 				seconds: 1677596309,
// 				nanoseconds: 705573000,
// 			},
// 		},
// 	},
// 	{
// 		NEO: {
// 			datetime: {
// 				seconds: 1677596216,
// 				nanoseconds: 156358000,
// 			},
// 			sub_sentiment: 0.2,
// 		},
// 	},
// 	{
// 		Qtum: {
// 			sub_sentiment: 0.14,
// 			datetime: {
// 				seconds: 1677596249,
// 				nanoseconds: 922580000,
// 			},
// 		},
// 	},
// 	{
// 		QuantNetwork: {
// 			sub_sentiment: 0.17,
// 			datetime: {
// 				seconds: 1677596228,
// 				nanoseconds: 129160000,
// 			},
// 		},
// 	},
// 	{
// 		Ravencoin: {
// 			datetime: {
// 				seconds: 1677596326,
// 				nanoseconds: 478224000,
// 			},
// 			sub_sentiment: 0.11,
// 		},
// 	},
// 	{
// 		SHIBArmy: {
// 			datetime: {
// 				seconds: 1677596304,
// 				nanoseconds: 171290000,
// 			},
// 			sub_sentiment: 0.09,
// 		},
// 	},
// 	{
// 		SingularityNet: {
// 			sub_sentiment: 0.09,
// 			datetime: {
// 				seconds: 1677596249,
// 				nanoseconds: 970479000,
// 			},
// 		},
// 	},
// 	{
// 		StepN: {
// 			sub_sentiment: 0.07,
// 			datetime: {
// 				seconds: 1677596293,
// 				nanoseconds: 847452000,
// 			},
// 		},
// 	},
// 	{
// 		SushiSwap: {
// 			datetime: {
// 				seconds: 1677596266,
// 				nanoseconds: 245866000,
// 			},
// 			sub_sentiment: -0.04,
// 		},
// 	},
// 	{
// 		Tronix: {
// 			datetime: {
// 				seconds: 1677596278,
// 				nanoseconds: 278704000,
// 			},
// 			sub_sentiment: 0.15,
// 		},
// 	},
// 	{
// 		Uniswap: {
// 			datetime: {
// 				seconds: 1677596288,
// 				nanoseconds: 344398000,
// 			},
// 			sub_sentiment: -0.08,
// 		},
// 	},
// 	{
// 		WOO_X: {
// 			sub_sentiment: 0.57,
// 			datetime: {
// 				seconds: 1677596310,
// 				nanoseconds: 158540000,
// 			},
// 		},
// 	},
// 	{
// 		Wavesplatform: {
// 			datetime: {
// 				seconds: 1677596283,
// 				nanoseconds: 398998000,
// 			},
// 			sub_sentiment: 0.15,
// 		},
// 	},
// 	{
// 		bitcoin: {
// 			datetime: {
// 				seconds: 1677596216,
// 				nanoseconds: 154835000,
// 			},
// 			sub_sentiment: 0.03,
// 		},
// 	},
// 	{
// 		bitfinex: {
// 			datetime: {
// 				seconds: 1677596304,
// 				nanoseconds: 223008000,
// 			},
// 			sub_sentiment: 0.22,
// 		},
// 	},
// 	{
// 		bnbchainofficial: {
// 			sub_sentiment: 0.35,
// 			datetime: {
// 				seconds: 1677596228,
// 				nanoseconds: 521442000,
// 			},
// 		},
// 	},
// 	{
// 		cardano: {
// 			sub_sentiment: 0.1,
// 			datetime: {
// 				seconds: 1677596241,
// 				nanoseconds: 9717000,
// 			},
// 		},
// 	},
// 	{
// 		chainlink: {
// 			datetime: {
// 				seconds: 1677596299,
// 				nanoseconds: 86750000,
// 			},
// 			sub_sentiment: 0.16,
// 		},
// 	},
// 	{
// 		chia: {
// 			sub_sentiment: 0.09,
// 			datetime: {
// 				seconds: 1677596288,
// 				nanoseconds: 750987000,
// 			},
// 		},
// 	},
// 	{
// 		cosmosnetwork: {
// 			datetime: {
// 				seconds: 1677596293,
// 				nanoseconds: 333862000,
// 			},
// 			sub_sentiment: 0.04,
// 		},
// 	},
// 	{
// 		dashpay: {
// 			datetime: {
// 				seconds: 1677596325,
// 				nanoseconds: 100680000,
// 			},
// 			sub_sentiment: 0.23,
// 		},
// 	},
// 	{
// 		decentraland: {
// 			sub_sentiment: 0.18,
// 			datetime: {
// 				seconds: 1677596242,
// 				nanoseconds: 632790000,
// 			},
// 		},
// 	},
// 	{
// 		decred: {
// 			datetime: {
// 				seconds: 1677596321,
// 				nanoseconds: 183797000,
// 			},
// 			sub_sentiment: 0.17,
// 		},
// 	},
// 	{
// 		dfinity: {
// 			sub_sentiment: 0.31,
// 			datetime: {
// 				seconds: 1677596233,
// 				nanoseconds: 274496000,
// 			},
// 		},
// 	},
// 	{
// 		dogecoin: {
// 			datetime: {
// 				seconds: 1677596252,
// 				nanoseconds: 249150000,
// 			},
// 			sub_sentiment: 0.44,
// 		},
// 	},
// 	{
// 		dot: {
// 			datetime: {
// 				seconds: 1677596263,
// 				nanoseconds: 59413000,
// 			},
// 			sub_sentiment: 0.11,
// 		},
// 	},
// 	{
// 		dydxprotocol: {
// 			sub_sentiment: 0,
// 			datetime: {
// 				seconds: 1677596289,
// 				nanoseconds: 912174000,
// 			},
// 		},
// 	},
// 	{
// 		ecash: {
// 			sub_sentiment: 0.4,
// 			datetime: {
// 				seconds: 1677596320,
// 				nanoseconds: 471978000,
// 			},
// 		},
// 	},
// 	{
// 		ethereum: {
// 			sub_sentiment: 0.01,
// 			datetime: {
// 				seconds: 1677596223,
// 				nanoseconds: 53873000,
// 			},
// 		},
// 	},
// 	{
// 		gnosisPM: {
// 			sub_sentiment: 0.2,
// 			datetime: {
// 				seconds: 1677596259,
// 				nanoseconds: 450041000,
// 			},
// 		},
// 	},
// 	{
// 		hedera: {
// 			datetime: {
// 				seconds: 1677596335,
// 				nanoseconds: 974593000,
// 			},
// 			sub_sentiment: 0,
// 		},
// 	},
// 	{
// 		holochain: {
// 			datetime: {
// 				seconds: 1677596315,
// 				nanoseconds: 285362000,
// 			},
// 			sub_sentiment: 0.28,
// 		},
// 	},
// 	{
// 		klaytn: {
// 			datetime: {
// 				seconds: 1677596234,
// 				nanoseconds: 194754000,
// 			},
// 			sub_sentiment: 0.12,
// 		},
// 	},
// 	{
// 		kucoin: {
// 			datetime: {
// 				seconds: 1677596288,
// 				nanoseconds: 350434000,
// 			},
// 			sub_sentiment: 0.07,
// 		},
// 	},
// 	{
// 		lidofinance: {
// 			sub_sentiment: 0.3,
// 			datetime: {
// 				seconds: 1677596341,
// 				nanoseconds: 86811000,
// 			},
// 		},
// 	},
// 	{
// 		litecoin: {
// 			datetime: {
// 				seconds: 1677596273,
// 				nanoseconds: 587990000,
// 			},
// 			sub_sentiment: 0.12,
// 		},
// 	},
// 	{
// 		livepeer: {
// 			datetime: {
// 				seconds: 1677596315,
// 				nanoseconds: 45134000,
// 			},
// 			sub_sentiment: 0.21,
// 		},
// 	},
// 	{
// 		loopringorg: {
// 			datetime: {
// 				seconds: 1677596254,
// 				nanoseconds: 721122000,
// 			},
// 			sub_sentiment: 0.06,
// 		},
// 	},
// 	{
// 		monero: {
// 			datetime: {
// 				seconds: 1677596314,
// 				nanoseconds: 853994000,
// 			},
// 			sub_sentiment: 0.09,
// 		},
// 	},
// 	{
// 		moonbeam: {
// 			datetime: {
// 				seconds: 1677596299,
// 				nanoseconds: 12519000,
// 			},
// 			sub_sentiment: 0.53,
// 		},
// 	},
// 	{
// 		nexo: {
// 			datetime: {
// 				seconds: 1677596275,
// 				nanoseconds: 104174000,
// 			},
// 			sub_sentiment: 0.01,
// 		},
// 	},
// 	{
// 		oceanprotocol: {
// 			datetime: {
// 				seconds: 1677596277,
// 				nanoseconds: 687907000,
// 			},
// 			sub_sentiment: 0.13,
// 		},
// 	},
// 	{
// 		okx: {
// 			datetime: {
// 				seconds: 1677596325,
// 				nanoseconds: 607813000,
// 			},
// 			sub_sentiment: 0.03,
// 		},
// 	},
// 	{
// 		ripple: {
// 			sub_sentiment: 0.05,
// 			datetime: {
// 				seconds: 1677596234,
// 				nanoseconds: 621994000,
// 			},
// 		},
// 	},
// 	{
// 		rocketpool: {
// 			sub_sentiment: -0.08,
// 			datetime: {
// 				seconds: 1677596244,
// 				nanoseconds: 909236000,
// 			},
// 		},
// 	},
// 	{
// 		solana: {
// 			sub_sentiment: 0,
// 			datetime: {
// 				seconds: 1677596257,
// 				nanoseconds: 220305000,
// 			},
// 		},
// 	},
// 	{
// 		stacks: {
// 			sub_sentiment: 0.28,
// 			datetime: {
// 				seconds: 1677596295,
// 				nanoseconds: 22317000,
// 			},
// 		},
// 	},
// 	{
// 		stellar: {
// 			datetime: {
// 				seconds: 1677596330,
// 				nanoseconds: 945386000,
// 			},
// 			sub_sentiment: 0.13,
// 		},
// 	},
// 	{
// 		synthetix_io: {
// 			datetime: {
// 				seconds: 1677596223,
// 				nanoseconds: 363406000,
// 			},
// 			sub_sentiment: 0.28,
// 		},
// 	},
// 	{
// 		terraluna: {
// 			datetime: {
// 				seconds: 1677596300,
// 				nanoseconds: 264348000,
// 			},
// 			sub_sentiment: -0.15,
// 		},
// 	},
// 	{
// 		tezos: {
// 			datetime: {
// 				seconds: 1677596272,
// 				nanoseconds: 735648000,
// 			},
// 			sub_sentiment: 0.25,
// 		},
// 	},
// 	{
// 		thegraph: {
// 			datetime: {
// 				seconds: 1677596237,
// 				nanoseconds: 951625000,
// 			},
// 			sub_sentiment: 0.19,
// 		},
// 	},
// 	{
// 		theta_network: {
// 			sub_sentiment: -0.04,
// 			datetime: {
// 				seconds: 1677596262,
// 				nanoseconds: 946268000,
// 			},
// 		},
// 	},
// 	{
// 		thorchain: {
// 			datetime: {
// 				seconds: 1677596239,
// 				nanoseconds: 793118000,
// 			},
// 			sub_sentiment: -0.06,
// 		},
// 	},
// 	{
// 		thresholdnetwork: {
// 			datetime: {
// 				seconds: 1677596235,
// 				nanoseconds: 42767000,
// 			},
// 			sub_sentiment: 0.1,
// 		},
// 	},
// 	{
// 		vechain: {
// 			datetime: {
// 				seconds: 1677596223,
// 				nanoseconds: 146947000,
// 			},
// 			sub_sentiment: 0.23,
// 		},
// 	},
// 	{
// 		xinfin: {
// 			datetime: {
// 				seconds: 1677596305,
// 				nanoseconds: 296625000,
// 			},
// 			sub_sentiment: 0.28,
// 		},
// 	},
// 	{
// 		zec: {
// 			sub_sentiment: 0.03,
// 			datetime: {
// 				seconds: 1677596295,
// 				nanoseconds: 8157000,
// 			},
// 		},
// 	},
// 	{
// 		zilliqa: {
// 			sub_sentiment: 0.3,
// 			datetime: {
// 				seconds: 1677596264,
// 				nanoseconds: 971124000,
// 			},
// 		},
// 	},
// ];

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
// 	getLatestCryptoHistory().then((data) => {
// 		return res.status(200).json({ data: data });
// 	});
// }
