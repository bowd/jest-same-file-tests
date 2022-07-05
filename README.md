# jest-same-file-tests

This plugin helps with writing your Jest tests along side your code, which is [common practice](https://doc.rust-lang.org/beta/rust-by-example/testing/unit_testing.html) in Rust, and the community seams enamored with the approach.

## Usage 

Install jest-same-file-tests using yarn:

```bash
yarn add --dev jest-same-file-tests
```

Or npm:

```bash
npm install --save-dev jest-same-file-tests
```

Add the function as a global to the a [jest setup file](https://jestjs.io/docs/configuration#setupfiles-array):

```js
const tests = require('jest-same-file-tests').tests
global.tests = tests
```

Adjust either [testMatch](https://jestjs.io/docs/configuration#testmatch-arraystring) or [testRegex](https://jestjs.io/docs/configuration#testregex-string--arraystring) to include regular source files:
```js
testMatch: ["**/*.[jt]s",],
testRegex: [".*\\.(ts|js)$",],
```

Invoke your test
- using npm: `npm test -- <file name w.o. extension>`
- using yarn: `yarn test <file name w.o. extension>`

** FIXME :
- Still fails with "Your test suite must contain at least one test." - there must be steps missing or wrong! **
- Once working, consider linking https://jestjs.io/docs/cli#running-from-the-command-line instead of duplicating CLI commands in "Invoke your test" step

> TypeScript support for injected global is in the TODO

### Example

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
- [ ] Strip tests from build elegantly
- [ ] Figure out how to get Jest code coverage to work, currently files which tests are ignored.
- [ ] Figure out is there's a nicer way to work around the "Your test suite must contain at least one test". See comments in `src/index.ts`