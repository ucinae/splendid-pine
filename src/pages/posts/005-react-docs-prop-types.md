---
title: 'React Docs 4. Typechecking With PropTypes'
subtitle: 'PropTypes를 통한 type check'
date: 2019-04-11 11:00:00
author: 'hansol'
tags:
- react
- PropTypes
- docs
- translate
---

# React Docs으로 공부하는 React 4. PropTypes

> reactjs.org의 docs를 번역하며 공부한 내용을 정리한 글입니다.

# PropTypes

> Note: 
> React v15.5부터 React.PropsTypes가 다른 패키지로 옮겨졌다. 이제 [prop-types](<https://www.npmjs.com/package/prop-types>) 라이브러리를 사용해야한다.

앱이 커지면 타입 체크를 통해 많은 버그를 잡을 수 있다. [Flow](<https://flow.org/>)나 [TypeScript](<https://www.typescriptlang.org/>)를 사용해서 전체 어플리케이션 타입 체크를 하곤 하는데 그런 extensions를 사용하지 않고도 리액트는 타입 체크하는 기능을 가지고 있다. props의 타입 체크를 위해 `propTypes`를 사용하면 된다.

```jsx
import PropTypes from 'prop-types'

class Greeting extends React.Component {
  render() {
    return (
    	<h1>Hello, {this.props.name}</h1>
    )
  }
}

Greeting.propTypes = {
  name: PropTypes.string
}
```

`PropTypse`는 받을 데이터가 유효한지 확인하는 일련의 검사를 한다. 이 예에서는, `PropTypes.string`을 사용했다. 만약 잘못된 값이 prop으로 부터 전달된다면, JavaScript 콘솔에 경고가 뜰 것이다. 성능상의 이유로 `propTypes`는 개발 모드에서만 검사를 한다.



### PropTypes

PropTypes가 제공하는 여러 검사 방법을 사용한 예시

```jsx
import PropTypes from 'prop-types'

MyComponent.propTypes = {
  // prop을 특정 JS 타입으로 선언할 수 있다. 기본적으로 모두 다 선택적이다.
  optionalArray: PropTypes.array, // 배열
  optionalBool: PropTypes.bool, // 참/거짓
  optionalFunc: PropTypes.func, // 함수
  optionalNumber: PropTypes.number, // 숫자
  optionalObject: PropTypes.object, // 객체
  optionalString: PropTypes.string, // 문자열
  optionalSymbol: PropTypes.symbol, // 심벌
  
  // render할 수 있는 모든 것: 숫자, 문자열, elements, 이걸 포함하는 배열
  optionalNode: PropTypes.node,
  
  // React element
  optionalElement: PropTypes.element,
  
  // class의 인스턴스. JS의 instanceof 연산을 사용한다.
  optionalMessage: PropTypes.instanceOf(Message),
  
  // 특정 값 중 하나인지 확인
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),
  
  // 여러가지 타입이 될 수 있는 객체
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),
  
  // 특정 타입을 포함하는 배열
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
  
  // 특정 타입을 속성으로 가지는 객체
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),
  
  // 특정 모양을 가지는 객체
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
  
  // `isRequired` 체인을 통해 전달되지 않으면 경고를 뜨게 할 수도 있다.
  requiredFunc: PropTypes.func.isRequired,
  
  // 아무 값이나 꼭 필요
  requireAny: PropTypes.any.isRequired,
  
  // 특정 검사식을 만들 수도 잇다. 검증 실패 시 Error 객체를 리턴해야한다.
  // `console.warn`이나 throw를 사용하지 말 것 `oneOfType` 안에서 작동하지 않는다.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
      	'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      )
    }
  },
  
  // `arrayOf`나 `objectOf`를 사용한 검사식도 만들 수 있다.
  customArrayProp: PropTypes.arrayOf(
    function(propValue, key, componentName, location, propFullName)) {
    	if(!/matchme/.test(propValue[key])) {
    		return new Error(
        	'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
        )
  		}
    }
}
```



### Requiring Single Child

`PropTypes.element`를 사용하면 children으로 오진 하나의 child만 전달되게 할 수 있다.

```jsx
import PropTypes from 'prop-types'

class MyComponent extends React.Component {
  render() {
    // 오진 하나의 element만 있어야한다. 아니면 경고
    const children = this.props.children
    return (
    	<div>
      	{children}
      </div>
    )
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
}
```



### Default Prop Values

 `defaultProps`를 통해 `props`의 default 값을 정의 할 수있다.

```jsx
class Greeting extends React.Component {
  render() {
    return (
    	<h1>Hello, {this.props.name}</h1>
    )
  }
}

// default value 명시
Greeting.defaultProps = {
  name: 'Stranger'
}

// "Hello, Stranger"를 render하게 된다.
ReactDOM.render(
	<Greeting />,
  document.getElementById('example')
)
```

Babel의 [transform-class-properties](<https://babeljs.io/docs/en/babel-plugin-proposal-class-properties>)를 이용한다면 `defaultProps`를 React component 안에서 static property로 선언 가능하다. 이 문법은 확정된게 아니며 브라우저에서 동작하려면 컴파일 과정이 필요하다. 자세한 내용은 [class fields proposal](<https://github.com/tc39/proposal-class-fields>)를 참조.

```jsx
class Greeting extends React.Component {
  static defaultProps = {
    name: 'stranger'
  }

	render() {
  	return (
  		<div>Hello, {this.props.name}</div>
  	)
	}
}
```

