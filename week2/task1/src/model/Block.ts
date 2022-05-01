const CryptoJS = require('crypto-js');

export class Block {
  index: number;
  previousHash: string;
  timestamp: number;
  data: string;
  hash: string;
  constructor(index: number, previousHash: string, timestamp: number, data: string, hash: string) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash.toString();
  }

  static calculateHash = (index: number, previousHash: number, timestamp: number, data: string) => {
    const result = CryptoJS.SHA256(index + previousHash + timestamp + data);
    return result.toString();
  };
}