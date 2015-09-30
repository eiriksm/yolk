const test = require(`tape`)
const Rx = require(`rx`)
const Yolk = require(`../../lib/yolk`)

function VaryingBaseChildrenFromProps (props) {
  const numbers = props.numbers.map(nums => {
    return nums.map(num => <li>{num}</li>)
  })

  return (
    <ul>
      {numbers}
    </ul>
  )
}

function VaryingWidgetChildrenFromProps (props) {
  const numbers = props.numbers.map(nums => {
    return nums.map(num => <Stub>{num}</Stub>)
  })

  return <div>{numbers}</div>
}

function Stub (props, children) {
  const handleClick = this.createEventHandler(() => 1, 0)
  const count = handleClick.scan((acc, next) => acc + next, 0)

  return <button id="stub" onClick={handleClick}>{children}{count}</button>
}

test(`renders a varying number of base children`, t => {
  t.plan(2)

  const numbersSubject = new Rx.BehaviorSubject(1)
  const numbersObservable = numbersSubject.scan((acc, next) => acc.concat(next), [])

  const component = <VaryingBaseChildrenFromProps numbers={numbersObservable} />
  const node = document.createElement(`div`)
  Yolk.render(component, node)

  t.equal(node.innerHTML, `<ul><li>1</li></ul>`)

  numbersSubject.onNext(2)
  numbersSubject.onNext(3)

  t.equal(node.innerHTML, `<ul><li>1</li><li>2</li><li>3</li></ul>`)
})

test(`renders a varying number of widget children`, t => {
  t.plan(3)

  const numbersSubject = new Rx.BehaviorSubject(1)
  const numbersObservable = numbersSubject.scan((acc, next) => acc.concat(next), [])

  const component = <VaryingWidgetChildrenFromProps numbers={numbersObservable} />
  const node = document.createElement(`div`)
  Yolk.render(component, node)

  t.equal(node.innerHTML, `<div><button id="stub">10</button></div>`)

  const stubDiv = node.querySelector(`#stub`)
  stubDiv.click()
  stubDiv.click()
  stubDiv.click()
  stubDiv.click()
  stubDiv.click()

  t.equal(node.innerHTML, `<div><button id="stub">15</button></div>`)

  numbersSubject.onNext(2)
  numbersSubject.onNext(3)

  t.equal(node.innerHTML, `<div><button id="stub">15</button><button id="stub">20</button><button id="stub">30</button></div>`)
})
