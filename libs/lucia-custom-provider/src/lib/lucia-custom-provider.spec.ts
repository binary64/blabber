import { createAdapter } from 'lucia/dist/auth/adapter';
import { adapter } from './lucia-custom-provider';

describe('luciaCustomProvider', () => {
  it('should work', () => {
    expect(
      createAdapter(adapter('http://localhost:4200/api/graphql'))
    ).toBeDefined();
  });
});
