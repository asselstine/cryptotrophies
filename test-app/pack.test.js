import pack from '@/pack'
import assert from 'assert'

describe('pack', () => {
  it('should pack stuff', () => {
    var output = '0x' + [
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

    assert.equal(pack(2), output)
  })
})
