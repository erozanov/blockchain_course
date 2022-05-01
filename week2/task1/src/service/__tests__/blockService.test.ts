import { Block } from '../../model/Block';
import { BlockService } from '../blockService';

describe('BlockService', () => {
  it('Then same data for block return same hash', async () => {
     const block = new Block(0, '0', 11100003, 'first block');
     const sameDataHash1 = BlockService.calculateHash(block);
     const sameDataHash2 = BlockService.calculateHash(block);
     const sameDataHash3 = BlockService.calculateHash(block);
     expect(sameDataHash1).toEqual(sameDataHash2);
     expect(sameDataHash1).toEqual(sameDataHash3);
  })

  it('Then different data for block return different hash', async () => {
    const block1 = new Block(0, '0', 11100003, 'first block');
    const block2 = new Block(0, '1', 11100003, 'first block');
    const sameDataHash1 = BlockService.calculateHash(block1);
    const sameDataHash2 = BlockService.calculateHash(block2);
    expect(sameDataHash1).not.toEqual(sameDataHash2);
  })
})

