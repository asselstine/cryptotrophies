module.exports.errTypes = {revert: "revert", invalidOpcode: "invalid opcode", outOfGas: "out of gas", invalidJump: "invalid JUMP"};

module.exports.tryCatch = async function(promise, errType) {
  try {
    await promise;
    throw null;
  }
  catch (error) {
    assert(error, "Expected an error but did not get one");
    assert(error.message.includes(errType), "Expected an error containing '" + errType + "' but got '" + error.message + "' instead");
  }
};

export default async promise => {
  try {
    await promise;
    assert.fail('Expected revert not received');
  } catch (error) {
    const revertFound = error.message.search('revert') >= 0;
    assert(revertFound, `Expected "revert", got ${error} instead`);
  }
};
