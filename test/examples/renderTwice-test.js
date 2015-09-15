/** @jsx Yolk.createElement */

const {createEventHandler, render} = Yolk

function Counter (props) {
  const handlePlus = createEventHandler(() => 1, 0)
  const count = handlePlus.scan((x, y) => x + y, 0).combineLatest(props.count, (a, b) => a + b)

  return (
    <div>
      <button id="plus" onClick={handlePlus}>+</button>
      <span>Count: {count}</span>
    </div>
  )
}

describe(`rendering to the same element twice does not recreate the widget`, () => {
  it(`only updates the props and or children`, () => {
    const component = <Counter count={0} />
    const node = document.createElement(`div`)
    render(component, node)

    assert.equal(node.innerHTML, `<div><button id="plus">+</button><span>Count: 0</span></div>`)

    const plus = node.querySelector(`#plus`)

    plus.click()
    plus.click()

    assert.equal(node.innerHTML, `<div><button id="plus">+</button><span>Count: 2</span></div>`)

    const newComponent = <Counter count={5} />

    render(newComponent, node)

    assert.equal(node.innerHTML, `<div><button id="plus">+</button><span>Count: 7</span></div>`)
  })
})
