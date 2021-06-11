import { LCDClient, MnemonicKey } from '@terra-money/terra.js';

const endpoint = "https://rpc.musselnet.cosmwasm.com";

// connect to a network
export const client = new LCDClient({
	URL: "https://bombay-fcd.terra.dev/",
	chainID: 'bombay-0007',
	gasPrices: { uluna: 0.5 },
	gasAdjustment: 1.4
});

const mk = new MnemonicKey({
  mnemonic: "organ acquire steel tag kite rib remain blood company useful sting target minimum sign logic say royal broccoli glue powder zone rail extra smart",
});

export const wallet = client.wallet(mk);
// export const managerAddress = wallet.accountNumber();

