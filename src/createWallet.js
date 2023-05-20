const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

const network = bitcoin.networks.testnet;
// const network = bitcoin.networks.bitcoin;

const path = `m/49'/1'/0'/0`;

try {
  let mnemonic = bip39.generateMnemonic();
  const seed = bip39.mnemonicToSeedSync(mnemonic);

  let root = bip32.fromSeed(seed, network);

  let account = root.derivePath(path);
  let node = account.derive(0).derive(0);

  let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
  }).address;

  console.log('Carteira gerada');
  console.log('Endereço: ', btcAddress);
  console.log('Chave Privada:', node.toWIF());
  console.log('Seed', mnemonic);
} catch (error) {
  console.error('An error occurred while generating the wallet:', error);
}
