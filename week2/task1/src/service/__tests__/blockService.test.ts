import { Block } from '../../model/Block';
import { BlockService } from '../blockService';

describe('BlockService', () => {
  it('Then same data for block return same hash', async () => {
     const block = new Block(0, '0', 11100003, 'first block');
     const sameDataHash1 = BlockService.calculateHash(0, '0', 11100003, 'first block');
     const sameDataHash2 = BlockService.calculateHash(0, '0', 11100003, 'first block');
     const sameDataHash3 = BlockService.calculateHash(0, '0', 11100003, 'first block');
     expect(sameDataHash1).toEqual(sameDataHash2);
     expect(sameDataHash1).toEqual(sameDataHash3);
  })

  it('Then different data for block return different hash', async () => {
    const block1 = new Block(0, '0', 11100003, 'first block');
    const block2 = new Block(0, '1', 11100003, 'first block');
    const sameDataHash1 = BlockService.calculateHash(0, '0', 11100003, 'first block');
    const sameDataHash2 = BlockService.calculateHash(0, '1', 11100003, 'first block');
    expect(sameDataHash1).not.toEqual(sameDataHash2);
  })
})

