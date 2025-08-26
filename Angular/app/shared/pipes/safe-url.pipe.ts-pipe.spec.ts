import { SafeUrlPipeTsPipe } from './safe-url.pipe.ts-pipe';

describe('SafeUrlPipeTsPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeUrlPipeTsPipe();
    expect(pipe).toBeTruthy();
  });
});
