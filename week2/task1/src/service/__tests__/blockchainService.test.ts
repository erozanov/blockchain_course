import { BlockchainService } from '../blockchainService';
import { BlockService } from '../blockService';

describe('BlockChainService', () => {
  it('Then Initial state of blockchain', async () => {
    const blockchainService = new BlockchainService();
    const genesisBlock = BlockService.getGenesisBlock();
    expect(blockchainService.getBlockchainState()).toEqual([genesisBlock]);
  })

  it('Then added new block', async () => {
    const blockchainService = new BlockchainService();
    const nextBlock = blockchainService.mineBlock("testData");
    const state = blockchainService.getBlockchainState();
    expect(nextBlock).not.toBeNull;
    expect(state.length).toEqual(2);
  })
  
})