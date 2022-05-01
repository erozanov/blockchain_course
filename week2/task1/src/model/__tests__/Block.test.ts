import { Block } from '../Block';


describe('', () => {
  it('Then same data return same hash', async () => {
     const sameDataHash1 = Block.calculateHash(0, 0, 123123123, 'first block');
     const sameDataHash2 = Block.calculateHash(0, 0, 123123123, 'first block');
     const sameDataHash3 = Block.calculateHash(0, 0, 123123123, 'first block');
     expect(sameDataHash1).toEqual(sameDataHash2);
     expect(sameDataHash1).toEqual(sameDataHash3);
  })
  
})