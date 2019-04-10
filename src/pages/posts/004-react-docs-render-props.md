---
title: 'React Docs 3. Render Props'
subtitle: 'Render Props에 대해서'
date: 2019-04-10 11:00:00
author: 'hansol'
tags:
- react
- Render Props
- docs
---

# React Docs으로 공부하는 React 3. Render props

> reactjs.org의 docs를 번역하며 공부한 내용을 정리한 글입니다.



# Render Props

> "render prop"은 React Component 사이에 값이 function인 prop을 통해서 코드를 공유하는 기법이다.

`render`를 props로 가지는 component는 render하는 로직을 직접 구현하는 대신 React element를 리턴하는함수를 가지고 이를 사용한다.

```jsx
<DataProvider render={data => (
    <h1>Hello {data.target}</h1>
)}/>
```

[React Router](<https://reacttraining.com/react-router/web/api/Route/render-func>)나 [Downshift](<https://github.com/downshift-js/downshift>)가 render props 기법을 사용한다.

render props이 얼마나 유용하고 어떻게 작성하는지 알아보자.

----

## Cross-Cutting Concerns[^1]를 위한 Render Props

Component는 React에서 코드 재사용의 주된 단위다. 하지만 다른 컴포넌트와 상태나 행동을 어떻게 공유하는지 항상 명확한건 아니다.

예를 들어, 마우스 위치를 추적하는 아래 component를 보자.

```jsx
class MouseTracker extends React.Component {
  constructor(props) {
    super(props)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = { x: 0, y: 0 }
  }
  
  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }
  
  render () {
    return (
    	<div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        <h1>Move the mouse around!</h1>
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
      </div>
    )
  }
}
```

마우스 커서가 화면을 움직이면 component가 위치를 `<p>` 태그 안에 (x, y)로 보여준다.

이제 여기서 문제가 는 *'어떻게 이 행동을 다른 component에서 재사용할까?'* 이다. 다른말로, 다른 component가 커서 위치를 알고 싶을때 이 행동을 어떻게 캡슐화해서 쉽게 재사용할 수 있을까?

component가 React의 재사용 기본 단위이므로, 약간을 리팩토링을 통해 `<Mouse>` component를 어디서든 재사용할 수 있게 캡슐화해보자

```jsx
// <Mouse> 컴포넌트는 우리가 원하는 행동으로 캡슐화된다.
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = { x: 0, y: 0 }
  }
  
  handleMouseMove(evnet) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }
  
  render() {
    return (
    	<div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
      	{/* 어떻게 <p> 말고 다르게 render 할까? */}
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
      </div>
    )
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
    	<div>
      	<h1>Move the mouse around!</h1>
        <Mouse />
      </div>
    )
  }
}
```

이제 `<Mouse>` component에 `mousemove` 이벤트와 관련된 행동과 커서 위치를 (x, y)에 저장하는 기능이 캡슐화되었다. 하지만 재사용하기는 이르다.

`<Cat>` component에서 화면의 마우스를 따라가는 이미지를 render한다고 생각해보자. 그럼 아마 `<Cat mouse={{ x, y }}>` prop을 통해 이미지가 있어야할 위치를 확인할 것이다.

첫 방법으로 아래 코드와 같이 `<Mouse>`의 render method 안에서 `<Cat>`을 render한다.

```jsx
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
    	<img src="/cat.jpg" 
        style={{ position: 'absolute', left: mouse.x, top: mouse.y }}/>
    )
  }
}

class MouseWithCat extends React.Component {
  constructor(props) {
    super(props)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = { x: 0, y: 0 }
  }
  
  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }
  
  render() {
    return (
    	<div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
      	{/*
      		여기서는 <p>를 <Cat>으로 바꿀수는 있지만 이를 사용할 때마다 별도의 
      		<MouseWithSomethingElse> component를 만들어 줘야한다.
      		그래서 재사용 안하는 거나 다름 없다.
      	*/}
        <Cat mouse={this.state} />
      </div>
    )
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
    	<div>
      	<h1>Move the mouse around!</h1>
        <MouseWithCat />
      </div>
    )
  }
}
```

이러한 접근은 특정 상황에 작동하지만 매번 재사용하려는 우리의 목표를 충족시키진 못한다. 이제 매번 다른 상황에 마우스 위치를 알고 싶을때마다 특정 상황에 동작하는 component를 만들어야 한다.



이런 상황에 **render props**를 사용한다면 `<Mouse>` 안에서 `<Cat>`을 하드코딩하는 대신 효과적으로 render output을 바꿀수 있다. `<Mouse>`에게 function prop을 전달해 동적으로 render할걸 결정하는 방법이 render prop이다.

```jsx
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
    	<img src="/cat.jpg" 
        style={{ position: 'absolute', left: mouse.x, top: mouse.y }}/>
    )
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = { x: 0, y: 0 }
  }
  
  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }
  
  render() {
    return (
    	<div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
      	{/*
      		Mouse가 render할 것을 정적으로 주는 대신
      		render prop을 통해 동적으로 준다.
      	*/}
        {this.props.render(this.state)}
      </div>
    )
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
    	<div>
      	<h1>Move the mouse around!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
         )}/>
      </div>
    )
  }
}
```

이제 `render` 메소드가 특정 케이스에서 동작하도록 하드 코딩하는 대신 `render prop`에 `<Mouse>`가 render할 것을 동적으로 전달함으로써 효과적으로 `<Mouse>` component를 재사용 가능해졌다.

더 구체적으로, **render prop은 component가 무엇을 render할지 알려주는 function prop이다.**

이러한 기법은 특정 기능을 쉽게 공유하게 해준다. 기능을 구현하기 위해 component에게 무엇을 render할지를 render prop과 함께 전달해 주면 된다.

render props에 한가지 흥미로운 점은 대부분의 higer-order components를 render prop을 사용해서 구현 가능하다는 점이다. `<Mouse>` component를 사용하는 대신 HOC를 사용하고 싶으면 보통의 `<Mouse>` component와 render prop으로 구현 가능하다.

```jsx
// HOC를 사용하고 싶으면, regular component에 render prop을 달면 된다.
function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
      	<Mouse render={mouse => (
          <Component {...this.props} mouse={mouse} />
        )}/>
      )
    }
  }
}
```

render props를 사용하면 두 가지 패턴 모두 사용 가능하다.

[^1]: Cross-Cutting Concern은 핵심 기능이 아닌 중간중간 삽입되어야 될 기능, 관심을 말한다. 그래서 시스템의 나머지 부분으로부터 깨끗이 분해되지 못하는 경우가 있다.

---



### "render" 말고 다른 이름으로 render props 사용하기

이 패턴이 "render props"라고 불리기 때문에 "redner"라는 prop 이름 밖에 사용 못하는 것은 아니다. 사실, 아무function prop도 "render props"으로 사용 가능하다.

비록 예에서는 `render`를 사용하였지만 `children`으로 사용해도 괜찮다.

```jsx
<Mouse children={mouse => (
  	<p>The mouse position is {mouse.x}, {mouse.y}</p>
)}/>
```

`children` prop은 JSX element의 "attributes" 목록에 있을 필요 없이 바로 element 안에 작성 가능하다.

```jsx
<Mouse>
	{mouse => (
  	<p>The mouse position is {mouse.x}, {mouse.y}</p>
  )}
</Mouse>
```

이러한 테크닉은 [react-motion](<https://github.com/chenglou/react-motion>)에 사용되었다.

이러한 테크닉은 드물어서 이러한 API를 설계할 때 `propTypes`에 `children`은 함수형을 가지도록 명시하는게 좋다.

```jsx
Mouse.propTypes = {
  children: PropTypes.func.isRequired
}
```

---



## :warning: Caveats (경고)

**React.PureComponent와 render prop을 같이 사용할 때 주의!**

render prop을 사용하면 React.PureComponent를 사용하는 이점을 무효화시킬 수 있다. 왜냐하면 shallow prop comparison이 항상 새 props에 대해 `false`를 리턴하고 각 `render`가 render prop으로 새 값을 만들어내기 때문이다.

예로, 위의 `<Mouse>`  component를 PureComponent로 만들면 아래와 같을 것이다.

```jsx
class Mouse extends React.PureComponent {
  // Same implementation as above...
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>

        {/*
          이건 안좋다. `render`값이 render 될 때마다 다를 것이기 때문이다.
        */}
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```

이 예는 `<MouseTracker>`가 render 될 때마다 `<Mouse>`의 `render`로 넘어가는 prop에 새 함수를 생성해서PureComponent로 만든`<Mouse>`의 이점을 사라지게 한다.

이 문제를 해결하기 위해, prop을 instance method로 정의해야한다.

```jsx
class MouseTracker extends React.Component {
  // instance method로 정의해서 `this.renderTheCat`은 항상
  // render 될 때마다 같은 함수를 참조한다.
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    );
  }
}
```

prop를 정적으로 정의하지 못한다면(예를들어, component의 props나 state를 에워싸야 한다면) `<Mouse>`는 반드시 React.Component로 만들어야한다.