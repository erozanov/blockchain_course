import { Block } from "../model/Block";
import { BlockService } from "./blockService";

export class BlockchainService {
  blockchain: [Block]
  constructor() {
    this.blockchain = [BlockService.getGenesisBlock()];
  }

  getBlockchainState(): [Block] {
     return this.blockchain;
  }

  mineBlock = (data: string): Block => {
    const latestBlock = this.getLatestBlock();
    const nextBlock = BlockService.generateNextBlock(data, latestBlock);
    this.addBlock(nextBlock);
    return
  }

  getLatestBlock = (): Block => this.blockchain[this.blockchain.length - 1];

  addBlock = (newBlock): void => {
    if (this.isValidNewBlock(newBlock, this.getLatestBlock())) {
        this.blockchain.push(newBlock);
    }
  }

  isValidNewBlock = (newBlock: Block, previousBlock: Block): boolean => {
    if (previousBlock.index + 1 !== newBlock.index) {
        console.log('invalid index');
        return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
        console.log('invalid previoushash');
        return false;
    } else if (BlockService.calculateHashForBlock(newBlock) !== newBlock.hash) {
        console.log(typeof (newBlock.hash) + ' ' + typeof BlockService.calculateHashForBlock(newBlock));
        console.log('invalid hash: ' + BlockService.calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
        return false;
    }
    return true;
  }
}