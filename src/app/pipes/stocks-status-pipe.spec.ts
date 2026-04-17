import { StocksStatusPipe } from './stocks-status-pipe';

describe('StocksStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new StocksStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
