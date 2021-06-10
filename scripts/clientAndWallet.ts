import { LCDClient, MnemonicKey } from '@terra-money/terra.js';

const endpoint = "https://rpc.musselnet.cosmwasm.com";

// connect to a network
export const client = new LCDClient({
	// URL: 'https://tequila-fcd.terra.dev',
	// chainID: 'tequila-0004',
	URL: "https://bombay-fcd.terra.dev/",
	// URL: 'http://3.34.120.243:1317/',
	chainID: 'bombay-0007',
});

const mk = new MnemonicKey({
  mnemonic: "organ acquire steel tag kite rib remain blood company useful sting target minimum sign logic say royal broccoli glue powder zone rail extra smart",
});

export const wallet = client.wallet(mk);
// export const managerAddress = wallet.accountNumber();

