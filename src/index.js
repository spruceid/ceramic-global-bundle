import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import CeramicClient from '@ceramicnetwork/http-client';
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { DID } from 'dids';
import KeyDidResolver from 'key-did-resolver';

export const initializeClient = (nodeUrl) => {
  const ceramic = new CeramicClient(nodeUrl);
  const resolver = {
    // ...KeyDidResolver.getResolver(),
    ...ThreeIdResolver.getResolver(ceramic)
  };
  const did = new DID({ resolver });

  ceramic.did = did;
  return ceramic;
};

export const authenticateEthAddress = async(ceramic, address) => {
  const threeIdConnect = new ThreeIdConnect();
  const authProvider = new EthereumAuthProvider(window.ethereum, address);

  await threeIdConnect.connect(authProvider);
  const provider = await threeIdConnect.getDidProvider();

  ceramic.did.setProvider(provider);
  await ceramic.did.authenticate();
};

const loadDocument = async(ceramic, {
  family = 'popp',
  tags = [
    'gitcoin',
    'PoPP',
    'ProofOfPersonhoodPassport',
    'VerifiableCredential',
    'DIDKit'
  ]
} = {
  family: 'popp', tags: [
    'gitcoin',
    'PoPP',
    'ProofOfPersonhoodPassport',
    'VerifiableCredential',
    'DIDKit'
  ]
}) => {
  const doc = await TileDocument.create(ceramic, null, {
    controllers: [ceramic.did.id],
    family,
    tags,
    deterministic: true
  });

  return doc;
};

export const readDocument = async(ceramic, options) => {
  const doc = await loadDocument(ceramic, options);

  return doc.content;
};

export const writeDocument = async(ceramic, value, options) => {
  const doc = await loadDocument(ceramic, options);

  await doc.update(value);
};

export const clearDocument = async(ceramic, options) => {
  const doc = await loadDocument(ceramic, options);

  await doc.update({});
};

export default {
  initializeClient,
  authenticateEthAddress,
  readDocument,
  writeDocument,
  clearDocument
};
