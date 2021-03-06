import CryptoJS from 'crypto-js';
import { Block } from '../model/Block';

export class BlockService {

  static calculateHash = (index: number, previousHash: string, timestamp: number, data: string): string => {
    const result = CryptoJS.SHA256(index + previousHash + timestamp + data);
    return result.toString();
  }

  static calculateHashForBlock = (block: Block): string => {
    const result = this.calculateHash(block.index, block.previousHash, block.timestamp, block.data);
    return result;
  }

  static getGenesisBlock = (): Block => {
    return new Block(0, "0", 1651430148, "Genesis block", "36718b9960626f748e2fd59517c735e18dd10e3a2a92e720c0f540d816d0f82e");
  }

  static generateNextBlock = (blockData: string, latestBlock: Block): Block => {
    const previousBlock = latestBlock;
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = new Date().getTime() / 1000;
    const nextHash = this.calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
    return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
  }

}