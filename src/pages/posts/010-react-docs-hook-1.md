---
title: 'React Hook'
subtitle: 'Hook이란 무엇인가'
date: 2019-04-26 21:56:00
author: 'hansol'
tags:
- react
- docs
- hook
---

# React Hooks 1. 맛보기

<br />

## Hook란 무엇인가.

React 16.8 버전부터 사용 가능하게 된 react의 새로운 기능이다.

이제부터 hook을 이용해 `class` 없이도 `state`를 사용하거나 다른 React 특성을 사용할 수 있게 되었다.

물론 hook이 생겼다고 해서 `class`가 react에서 사라진다거나 기존의 React 지식이 바뀌는 것도 아니다. 대신 hook이 기존에 React concept에 대해 알고있는 것에 더 직관적인 API를 제공한다고한다.

그렇다면 hook이 왜 나오게 되었을까?

React Docs에서는 기존의 React에 다음과 같은 문제가 있다고 설명하고 있다.

<br />

##### 1. stateful logic을 컴포넌트 사이에서 재사용하기 어렵다.

React에서는 store에 접속하는 것과 같은 행동을 재사용할 때 `render props`나 `higher-order-components`를 이용해 해결해왔다. 그런데 이러한 패턴들은 사용하다 보면 wrapper가 엄청 많이 겹쳐지는 wrapper hell"이 나타나는 문제가 발생한다. wrapper들을 필터링 할 수도 있지만 근본적인 문제 해결이 필요했다.

hook을 이용해서 stateful logic을 컴포넌트에서 분리하고 독립적으로 재사용하면된다. Hook이 컴포넌트 계층을 바꾸지 않고 stateful logic을 재사용 가능하게 한다.

<br />

##### 2. 복잡한 컴포넌트는 이해하기 어렵다

컴포넌트가 초기에는 간단하지만 시간이 지날 수록 stateful logic이나 side effects가 많아진다. 그러면서 lifecycle method에 관련이 없는 logic들이 섞이게 된다.

이러한 문제를 해결하는데도 hook이 사용된다.

<br />

##### 3. class는 사람에게도 헷갈리고 컴퓨터에게도 헷갈린다.

javascript에서의 `this` 는 다른 언어에서와 다르다.  그래서 javascript의 class는 이해하기 어려운 점이 있다. 

그리고 class component가 최적화하는데 더 느린 경로로 가는 의도적이지 않은 패턴을 일으킨다.

이러한 문제를 hook이 해결 할 수 있다.

<br />

##### 결론 적으로 점차적으로 hook을 적용하면 될 것이다.

classes가 react에서 사라질 계획은 없기 때문에 기존의 class component를 사용해도 된다.

---

<br />

## Hooks 맛보기

<br />

### :pushpin: State Hook

```jsx
import React, { useState } from 'react';

function Example() {
  // "count"라는 state variable을 만든다.
  const [count, setCount] = useState(0);
  
  return (
  	<div>
    	<p>{count}번 클릭했음</p>
      <button onClick={() => setCount(count + 1)}>
      	클릭!
      </button>
    </div>
  )
}
```

여기서 `useState`가 *Hook*이다. 이제 React는 이 state를 rerender하더라도 보존하게 된다.

`useState`는 한 쌍을 리턴하는데 하나는 현재 상태 값이고, 다른 하나는 상태를 업데이트하는 함수다. 이 함수를 class component의 `this.setState`와 비슷하게 생각하면 된다.

`useState`에 들어가는 argument는 초기 state다. 위의 예에서는 0 값이 카운터의 초기값으로 들어갔다. 초기값은 처음 render될 때 사용된다.

<br />

#### 여러 state variable들 선언하기

```jsx
function ExampleWithManyStates() {
  // state variable들 여러개 선언
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
}
```

array destructuring 문법으로 `useState`를 이용해 만든 state variable들에게 다른 이름을 준다. 이 이름들은 `useState`의 한 부분이 아니다. 대신, React가 `useState`를 여러번 호출하면 매번 render할 때마다 똑같은 순서로 호출된다고 가정한다.

지금까지 살펴본 `useState` 말고도 React는 다양한 Hooks를 가지고있다. 추가로 직접 Hook을 만들 수도 있다.

<br />

## 🔍 Effect Hook

데이터를 가져오거나, 지켜보거나 React component에서 수동으로 DOM을 바구는 행위들을 "side effects"라고 하는데 이러한 행동들이 다른 컴포넌트에 영향을 주거나 컴포넌트가 render 되는 동안 끝나지 않을 수도 있기 때문이다.

Effect Hook인 `useEffect`는 function component에 side effects를 수행할 수 있게 해준다. 이는 React Class의 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`와 같은 역할을한다.

간단한 예제를 먼저 살펴보면

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  
  // componentDidMount나 componentDidUpdate와 비슷하다.
  useEffect(() => {
    // browser API를 사용해서 document title을 업데이트
    document.title = `${count}번 클릭함`;
  })
  
  return (
  	<div>
    	<p>{count}번 클릭함</p>
      <button onClick={() => setCount(count + 1)}>
      	클릭!
      </button>
    </div>
  )
}
```

`useEffect`를 호출할 때, DOM 변경을 완료하고 "effect" 함수를 실행한다. Effects는 component 안에 선언되어서 props나 state에 접근도 가능하다. 기본적으로 React는 첫 render를 포함해서 render 할 때마다  effects를 실행한다.

선택적으로 함수를  리턴해서 Effects를 정리 할 수도 있다.

```jsx
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

위의 예에서 React는 컴포넌트가 unmount될 때 `ChatAPI`를 unsubscribe할 것이다.

`useState`와 마찬가지로 여러개의 `useEffect`를 사용할 수 있다.

```jsx
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  // ...
```

---

<br />


## :v: Hooks의 두가지 규칙

* 최상위 level에서만 Hooks을 호출하자.
* React function components에서만 Hooks을 호출하자.

<br />

## :bulb: 직접 만드는 Hooks

`hoc`나 `render props`라는 다른 방법도 있지만 이런 방법들은 component tree를 복잡하게 한다.

아래와 같이 logic을 `useFriendStatus`라는 커스텀 Hook으로 빼내고

```jsx
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

아래처럼 argument `friendID`를 받아서 다른 두 컴포넌트에 사용가능하다.

```jsx
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

```jsx
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

<br />

## :electric_plug: 그밖의 자주 사용하는 Hooks들

`useContext`: React context를 subscribe하게 해줌

```jsx
function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
}
```

`useReducer`: reducer로 복잡한 local state를 관리하게 해줌

```jsx
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
}
```





대략적으로 Hook에 대해 React Doc을 보며 살펴보았다. 자세한 Hook 사용법과 성질은 차근차근 공부해서 정리해야 될 것 같다.