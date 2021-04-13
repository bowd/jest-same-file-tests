# jest-same-file-tests

This plugin can be used to enable you to write your specs along side your code.

Example:

```typescript
// file: example/src/mult.ts
export const mul = (a: number, b: number) => {
  return a * b;
};


tests('mul', () => {
  it('multiplies 2 x 3 = 6', () => {
    expect(mul(2, 3)).toEqual(6)
  })
})
```

```typescript
// file: example/src/fact.ts
import { mul } from './mul'

export const fact = (_n: number) => {
  const n = Math.ceil(_n)
  if (n != _n) {
    throw Error("This function only supports integer values for n")
  }
  
  let result = 1
  for (let i = 2; i <= n; i ++) {
    result = mul(result, i)
  }

  return result
};

tests('fact', () => {
  it('calculates 4!', () => {
    expect(fact(4)).toEqual(1*2*3*4)
  })

  it('raises an error if a float is passed', () => {
    expect(() => fact(4.2)).toThrow(/This function only supports integer values/)
  })
})
```

If we didn't use the `tests` function and write `describe` blocks directly, when running a single file, the test runner would execute the tests for all the imported files. In the example above when running tests for `fact` the tests for `mul` would be run as well because `fact` imports `mul`.

## TODOs

- [ ] Inject `tests` global type nicely for Typescript support
- [ ] Figure out how to get Jest code coverage to work, currently files which tests are ignored.
- [ ] Figure out is there's a nicer way to work around the "Your test suite must contain at least one test". See comments in `src/index.ts`