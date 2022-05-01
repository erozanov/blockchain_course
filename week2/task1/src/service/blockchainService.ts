import { Block } from "../model/Block";
import { BlockService } from "./blockService";

export class BlockchainService {
  blockchain: [Block]
  constructor() {
    this.blockchain = [BlockService.getGenesisBlock()];
  }

  getBlockchainState() {
     return this.blockchain;
  }
}