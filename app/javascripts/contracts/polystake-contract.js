import { default as contract } from 'truffle-contract'
import polystakeArtifacts from '../../../build/contracts/Polystake.json'

const Polystake = contract(polystakeArtifacts)

export default function () {
  Polystake.setProvider(web3.currentProvider);
  return Polystake
}
