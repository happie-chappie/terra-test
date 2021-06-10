import {
	LCDClient,
	getContractAddress,
	MsgExecuteContract,
	Coin, MsgStoreCode, MsgInstantiateContract, getCodeId, isTxError } from '@terra-money/terra.js';
import { client, wallet } from './clientAndWallet';
const fs = require("fs");

const initMsg = {
  "min_deposit_per_user": "100",
  "max_deposit_per_user": "10000",
  "max_number_of_users": "5",
  "denom": "ufrites",
  "initial_validators": [
		"terravaloper1vk20anceu6h9s00d27pjlvslz3avetkvnwmr35",
		"terravaloper1krj7amhhagjnyg2tkkuh6l0550y733jnjnnlzy",
		"terravaloper1kcux5ht2jslsyfzgs5wtfg4hx9dha8z4tes7xh",
		"terravaloper1062zkmnlqhcpwsryk5kjf345x6njzzksqk9ljl",
		"terravaloper12mcn4pj7d8yeff0xfedcthqe9gs3vwc2tn8sy2"
  ]
};

async function main(): Promise<void> {
	// const filepath = __dirname + "/../artifacts/stader_protocol_v0.wasm";
	const filepath = __dirname + "/../artifacts/delete.wasm";
  const storeCode = new MsgStoreCode(
    wallet.key.accAddress,
    fs.readFileSync(filepath).toString('base64')
  );

	// console.log(storeCode);


  const storeCodeTx = await wallet.createAndSignTx({
    msgs: [storeCode],
  });
	console.log(storeCodeTx);
  const storeCodeTxResult = await client.tx.broadcast(storeCodeTx);

	// console.log(storeCodeTxResult);
	// console.log(storeCodeTxResult.raw_log);
	console.log(storeCodeTxResult);

  if (isTxError(storeCodeTxResult)) {
    throw new Error(
      `store code failed. code: ${storeCodeTxResult.code}, codespace: ${storeCodeTxResult.codespace}, raw_log: ${storeCodeTxResult.raw_log}`
    );
  }
}

async function main2(): Promise<void> {
	const filepath = __dirname + "/../artifacts/delete.wasm";
  const storeCode = new MsgStoreCode(
    wallet.key.accAddress,
    fs.readFileSync(filepath).toString('base64')
  );
	console.log(wallet.key.accAddress);
  const storeCodeTx = await wallet.createAndSignTx({
    msgs: [storeCode],
  });
  const storeCodeTxResult = await client.tx.broadcast(storeCodeTx);

  console.log(storeCodeTxResult);

  if (isTxError(storeCodeTxResult)) {
    throw new Error(
      `store code failed. code: ${storeCodeTxResult.code}, codespace: ${storeCodeTxResult.codespace}, raw_log: ${storeCodeTxResult.raw_log}`
    );
  }

  const codeId = getCodeId(storeCodeTxResult);

  const instantiate = new MsgInstantiateContract(
    wallet.key.accAddress,
    wallet.key.accAddress,
    +codeId, // code ID
    { count: 0, }, // InitMsg
    { uluna: 10000000, ukrw: 1000000 } // init coins
  );

  const instantiateTx = await wallet.createAndSignTx({
    msgs: [instantiate],
  });
  const instantiateTxResult = await client.tx.broadcast(instantiateTx);

  console.log(instantiateTxResult);

  if (isTxError(instantiateTxResult)) {
    throw new Error(
      `instantiate failed. code: ${instantiateTxResult.code}, codespace: ${instantiateTxResult.codespace}, raw_log: ${instantiateTxResult.raw_log}`
    );
  }

  const contractAddress = getContractAddress(instantiateTxResult);

  const execute = new MsgExecuteContract(
    wallet.key.accAddress, // sender
    contractAddress, // contract address
    { increment: {} }, // handle msg
    { uluna: 100000 } // coins
  );
  const executeTx = await wallet.createAndSignTx({
    msgs: [execute],
  });
  const executeTxResult = await client.tx.broadcast(executeTx);
  console.log(executeTxResult);
}

main2().then(() => {
	console.log
},
	(err) => {
		// console.log(err.message)
		console.log(err);
	}
);
