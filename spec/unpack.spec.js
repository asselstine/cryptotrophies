import unpack from '@/unpack'

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

    expect(unpack(input)).toEqual({ type: 2 })

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

    expect(unpack(input)).toEqual({ type: 161 })
  })
})
