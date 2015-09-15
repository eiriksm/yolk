const transformProperties = require(`../../lib/transformProperties`)

describe(`transformProperties`, () => {
  it(`transforms props so that they will work correctly with virtual dom`, () => {
    const onClick = function onClick () {}

    const props = {
      className: `className`,
      id: `id`,
      acceptCharset: true,
      dataTag: true,
      dataOtherTag: true,
      action: `/`,
      rowSpan: 5,
      onClick: onClick,
      onmouseup: function onMouseUp () {},
      nonStandardAttr: true,
    }

    const transformedProps = {
      className: `className`,
      id: `id`,
      onclick: onClick,
      attributes: {
        action: `/`,
        rowspan: 5,
        'accept-charset': true,
        'data-tag': true,
        'data-other-tag': true,
      },
    }

    assert.deepEqual(transformProperties(props), transformedProps)
  })
})
