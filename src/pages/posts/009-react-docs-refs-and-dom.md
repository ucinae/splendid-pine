---
title: 'React Docs 5. Refs and the DOM'
subtitle: 'Refs 설명과 사용법'
date: 2019-04-19 12:12:00
author: 'hansol'
tags:
- react
- refs
- docs
- translate
---

# React Docs으로 공부하는 React 5. Refs and the DOM

> reactjs.org의 docs를 번역하며 공부한 내용을 정리한 글입니다.



# Refs and the DOM

> Refs는 DOM node에 접근하거나 render method로 생성된 React elements에 접근하는 방법을 제공한다.



일반적인 React 데이터흐름에서, props는 parent components에서 children components로 상호작용하는 유일한 방법이다. child를 수정하기 위해 새로운 props와 함께 다시 render할 것이다. 그러나 일반적인 dataflow가 아닌 부득이하게 child를 수정해야할 경우가 있기도 하다. 수정될 child는 React Component가 될 수도 있고 DOM element가 될 수도 있다. 두가지 경우 모두 React는 방법을 제공한다.

### Refs를 사용해야 할 때

refs를 사용할 좋은 경우가 있다.

* focus, text selection, media playback을 관리할 때
* 반드시 일어나는 애니메이션을 작동시킬 때
* third-party DOM 라이브러리와 통합할 때

declaratively(선언적으로?)하게 완료할 수 있는 모든 곳에는 refs 사용하는 것을 피하는게 좋다.

예를들어, `Dialog` component의 `open()`과 `close()` methods를 노출시키는 대신 `isOpen` prop으로 전달하는게 좋다.



### Refs를 많이 사용하지 마라

app에서 어떤 일을 일어나게 하게끔 refs를 사용하려는 경향이 있다. 이러한 경우 시간을 가지고 state가 계층의 어느 component에 소유되어야 하는지 더 비판적으로 생각해봐야한다. 보통, "소유"되어야할 적절한 장소는 계층의 더 높은 레벨에 있다. [Lifting State Up](<https://reactjs.org/docs/lifting-state-up.html>) guide의 예시 참조.

> Note
>
> 아래의 예시는 업데이트된 React 16.3의 `React.createRef()` API를 사용한다. 더 이른 버전의 리액트를 사용하면 callback refs를 사용하길 추천한다.



### Refs 만들기

refs는 `React.createRef()`를 이용해 만들고 `ref` 속성을 통해 React Component에 붙인다. Refs는 component가 만들어질때 인스턴스 속성에 할당된어 component에 의해 참조되어 질 수 있다.

```jsx
class MyComopnent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```



### Refs에 접근하기

ref가 `render` 안에서 element로 전달 될 때, node에 대한 reference(참조)는 ref의 `current` 속성으로 접근 가능하다.

```jsx
const node = this.myRef.current;
```

ref의 값은 node의 type에 따라 달라진다.

* `ref` 속성이 HTML element일 경우 construcor 안에서 `React.createRef()`를 통해 만들어진 `ref`는 `current` 속성의 근원인 DOM element를 받는다.
* `ref` 속성이  custom class component일 경우 `ref` 객체는 해당 구성요소에 mounted된 instance를 `current`로 받는다.
* **`ref` 속성을 function component에 사용하지 못한다.** 왜냐하면 instances를 가지지 않기 때문이다.

아래에 3가지 경우의 예시를 보여준다.



#### DOM Element에 Ref 달기

```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // textInput이라는 DOM element ref를 만든다.
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }
  
  focusTextInput() {
    // 명백하게 text input에 focus할 때 raw DOM API를 사용한다.
    // Note: DOM node를 얻기 위해 "current"에 접근중이다.
    this.textInput.current.focus();
  }
  
  render() {
    // React에게 <input> ref를 우리가 constructor에서 만든 
    // `textInput`과 연결시키고 싶다고 전달한다.
    return (
    	<div>
      	<input
          type="text"
          ref={this.textInput} />
        
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput} />
      </div>
    );
  }
}
```

React는 component가 mount될 때 DOM element를 `current` 속성에 할당하고, unmount 되면 `null`을 할당 할 것이다. `ref`는 lifecycle methods인 `componentDidMount`나 `componentDidUpdate` 전에 업데이트 된다.



#### Class Component에 Ref 달기

mount된 다음 즉시 `CustomTextInput` 위를 클릭한 것 처럼 만들기 원한다면, ref를 사용해서 custom input에 접근하고 이것의 `focusTextInput` method를 직접 호출한다.

```jsx
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  
  componentDidMount() {
    this.textInput.current.focusTextInput();
  }
  
  render() {
    return (
    	<CustomTextInput ref={this.textInput} />
    )
  }
}
```

`CustomTextInput`이 class로 정의되어 있어야만 작동한다.

```jsx
class CustomTextInput extends React.Component {
  // ...
}
```



#### Function Components에서 refs

Function component에서는 refs를 사용하면 안된다. 왜냐하면 instances를 가지지 않기 때문이다.

```jsx
function MyFunctionComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // This will *not* work!
    return (
      <MyFunctionComponent ref={this.textInput} />
    );
  }
}
```

refs를 사용하고 싶으면 lifecycle과 state를 가지는 class component로 바꿔줘야 한다.

그런데 ref 속성을 function component 안의 DOM element나 class component에는 사용할 수 있다.

```jsx
function CustomTextInput(props) {
  // textInput은 반드시 여기 선언되어 참조할 수 있어야한다.
  let textInput = React.createRef();
  
  function handleClick() {
    textInput.current.focus();
  }
  
  return (
  	<div>
    	<input
        type="text"
        ref={textInput} />
      
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick} />
    </div>
  )
}
```



### Parent Components에 DOM refs 노출시키기

드문 경우에 child의 DOM node를 parent에서 접근하고 싶을 때가 있다. 이와 같은 경우는 보통 추천하지 않는데 왜냐하면 component의 encapsulation(캡슐화)를 깨기 때문이다. 하지만 종종 child DOM node의 사이즈나 위치를 측정하거나 focus를 줄 때 유용하다.

child component에 ref를 추가할 수 있지만 이건 DOM node가 아닌 component instance만 얻으므로 이상적인 해결책이 아니다. 추가로 function component에선 동작하지 않는다.

React 16.3 이상 버전을 사용한다면 `ref forwarding`을 사용하길 추천한다. Ref forwarding은 components가 어느 child component를 그들의 것으로 노출 시킬지 결정하게 해준다. `ref forwarding` 문서에서 더 자세한 예시를 볼 수 있다.

React 16.2 이하의 버전을 사용하거나 ref forwarding보다 더 유연한 방법이 필요하다면 [다른 접근법](<https://gist.github.com/gaearon/1a018a023347fe1c2476073330cc5509>)을 사용해서 명확히 ref를 다른 이름의 prop으로 전달한다.

가능하다면 DOM nodes를 노출하지 말자. 이러한 접근은 child component에 추가적인 코드를 필요로한다. 만약 child component 구현에 제어권이 없으면 마지막 방안은 `findDOMNode()`를 사용하는 것인데 이는 `StrictMode`에서 사용하지 못한다.



### Callback Refs

React는 "callback refs"라는 refs를 설정하는 더 자세한 다른 방법을 제공한다.

`createRef()`로 만든 `ref` 속성을 전달하는 대신 function을 전달한다. function은 argument로 React component나 HTML DOM element를 받고 어디서나 저장하고나 접근할 수 있다.

아래의 예는 instance property의 DOM node를 참조하는 `ref` callback 보통 패턴을 구현한 것이다.

```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    
    this.textInput = null;
    
    this.setTextInputRef = element => {
      this.textInput = element;
    };
    
    this.focusTextInput = () => {
      // raw DOM API를 사용한 text input에 Focus 한다.
      if (this.textInput) this.textInput.focus();
    }
  }
  
  componentDidMount() {
    // mount된 input에 자동 focus한다.
    this.focusTextInput();
  }
  
  render() {
    // `ref` callback을 instance field의 text input DOM element와 연결시키는데 사용한다.
    return (
    	<div>
      	<input
          type="text"
          ref={this.setTextInputRef} />
        <input
          type="button"
          value="Focus the text input" 
          onClick={this.focusTextInput} />
      </div>
    )
  }
}
```

React는 component가 mounts 될 때  `ref` callback을 호출하고, unmounts되면 null을 호출한다. Refs는 `componentDidMount`와 `componentDidUpdate` 전에 업데이트 되길 보장한다.

callback refs를 `React.createRef()`로 만든 objects refs 처럼 components 사이에 전달하는 것도 가능하다.

```jsx
function CustomTextInput(props) {
  return (
  	<div>
    	<input ref={props.inputRef} />
    </div>
  )
}

class Parent extends React.Component {
  render() {
    return (
    	<CustomTextInput
        inputRef={el => this.inputElement = el} />
    )
  }
}
```

위의 예에서 `Parent`는 ref callback을 `inputRef` prop으로 `CustomTextInput`에 전달한다. 그리고 `CustomTextInput`은 같은 callback을 `ref` prop으로 `<input>`에 전달한다. 즉, `Parent`의  `this.inputElement`는 `CustomTextInput`의 `<input>` element에 대응된다.



### Legacy API: String Refs

이전에 React로 작업을 했으면 `"textInput"` 같은 `ref` 속성이 string이고 DOM node에 `this.refs.textInput`으로 접근하는 옛날 API가 친근할 것이다. 이러한 방법은 [몇몇 이슈](<https://github.com/facebook/react/pull/8333#issuecomment-271648615>) 때문에 피해야한다. 미래의 버전에서는 삭제될 것이다.

> Note
>
> 현재 refs에 접근하는데 `this.refs.textInput`를 사요한다면 `callback pattern`이나 `createRef API`를 사용하길 추천한다.



### callback refs 경고

`ref` callback을 inline function으로 정의한다면 업데이트시 첫 번째는 `null`로 그리고 두 번째로 DOM element로 두 번 호출 될 것이다. React가 old ref와 new ref를 명확히 구분할 필요가 있기 때문에 새로운 function의 instance가 render 될 때마다 생성되기 때문이다. `ref` callback을 class의 bound method로 정의하면 이러한 문제를 피할 수 잇다. 하지만 대부분의 경우에 문제가 되지 않는다.

