export const mul = (a: number, b: number) => {
  return a * b;
};


// @ts-ignore
tests('mul', () => {
  it('multiplies 2 x 3 = 6', () => {
    expect(mul(2, 3)).toEqual(6)
  })
})