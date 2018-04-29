import unpack from '#/unpack'

describe('unpack', () => {
  it('should unpack stuff', () => {
    var input = '0x' + [
      '02', '00',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000'
    ].join('')

    var unpacked = unpack(input)
    assert.equal(unpacked.type, 2)

    input = '0x' + [
      'a1', '00',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000'
    ].join('')

    assert.equal(unpack(input).type, 161)
  })
})
