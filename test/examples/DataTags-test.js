const test = require(`tape`)
const Yolk = require(`../../lib/yolk`)

test(`using data tags`, t => {
  t.plan(1)

  const component = <div dataSomething={55} dataOtherReallyCoolThing="123123" />
  const node = document.createElement(`div`)
  Yolk.render(component, node)

  t.equal(node.innerHTML, `<div data-something="55" data-other-really-cool-thing="123123"></div>`)
})
