import { BlockchainService } from '../blockchainService';
import { BlockService } from '../blockService';

describe('BlockChainService', () => {
  it('Then Initial state of blockchain', async () => {
    const blockchainService = new BlockchainService();
    console.log(blockchainService.getBlockchainState())
     const genesisBlock = BlockService.getGenesisBlock();
     expect(blockchainService.getBlockchainState()).toEqual([genesisBlock]);
  })


})