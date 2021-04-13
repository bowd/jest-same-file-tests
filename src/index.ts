import stackTrace from 'stack-trace'

/*
 * This is an 80/20 solution to find if the tests
 * block was called from the first file that's in 
 * the current project that was required from
 * outside, which is presumably the file that
 * the jest executer has called.
 * 
 * There might be situations in which that's not the
 * case depending on individual setups which may
 * require more complex logic here.
 */
export const tests = (body: () => void) => {
  const cwd = process.cwd()
  const traces = stackTrace.parse(new Error()).filter((frame) => {
    return frame.getFileName().match(cwd) && !frame.getFileName().match("node_modules")
  })

  if (traces.length == 1) {
    body()
  }
}

/*
 * Call this to work around the limitation that all files
 * Jest picks up must declare a test.
 * If you want a source file without tests you
 * can either exclude it from the jest regexp matches
 * or add `tests.skip()` at the end of the file.
 */
tests.skip = () => {
  tests(() => {
    test.skip('', () => {})
  })
}