---
title: 'React Hook 3. Effect Hook'
subtitle: 'componentDidMount + componentDidUpdate + componentWillUnmount = useEffect'
date: 2019-05-02 09:49:00
author: 'hansol'
tags:
- react
- docs
- hook
---

# React Hooks 3. Effect Hook

Effect Hook은 function component에서도 side effects를 할 수 있게 해준다.

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  
  // componentDidMount와 componentDidUpdate와 비슷하다.
  useEffect(() => {
    // browser API를 사용해서 제목을 업데이트한다.
    document.title = `카운터 ${count}번 클릭`;
  });
  
  return (
  	<div>
    	<p>카운터 {count}번 클릭</p>
      <button onClick={() => setCount(count + 1)}>
      	클릭
      </button>
    </div>
  );
}
```

기존에 `useState`를 사용한 예제에 document title을 클릭한 횟수를 포함한 메시지로 설정하는 기능을 추가하였다.

데이터를 불러오기, 변화 감지할 대상 설정하기(subscription), React components의 DOM을 직접 바꾸는 행동 등은 모두 side effects의 예들이다. 

* `useEffect`는 React class의 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`를 묶어놓은 것이라고 생각하면 된다.

<br />

## Effects without Cleanup

React가 DOM을 update하고나서 추가적인 코드수행을 원할때가 있는데 이런 상황에서 class와 hook의 차이를 알아보자

<br />

### Classes 사용한 예

Class component의 `render`는 React가 DOM을 업데이트하고 우리의 effects를 수행하기에는 너무 빨라서 side effects를 수행하지 못한다.

그래서 `componentDidMount`와 `componentDidUpdate`를 사용한다.

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  
  componentDidMount() {
    document.title = `카운터 ${this.state.count}번 클릭`;
  }
  
  componentDidUpdate() {
    document.title = `카운터 ${this.state.count}번 클릭`;
  }
  
  render() {
    return (
    	<div>
      	<p>카운터 {this.state.count}번 클릭</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        	클릭
        </button>
      </div>
    );
  }
}
```

예에서 볼 수 있듯이 두 lifecycle methods안에 중복되는 코드가 발생한다.

<br />

### Hooks를 사용한 예

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `카운터 ${count}번 클릭`;
  });
  
  return (
  	<div>
    	<p>카운터 {count}번 클릭</p>
      <button onClick={() => setCount(count + 1)}>
      	클릭
      </button>
    </div>
  );
}
```

**`useEffect`가 하는 일?** `useEffect`를 사용하므로써 React에게 render 과정 이후에 뭔가 필요하다고 알려준다. React는 내부의 "effect" 함수를 기억하고 있다가  DOM 업데이트가 수행된 뒤에 호출하게된다. 이런 기능을 가지고 document title을 설정하는것 말고도 데이터를 불러오거나 다른 필수 API를 호출할 수도 있다.

**왜 `useEffect`를 component 안에서 호출하는가?** `useEffect`를 component 안에 배치하면서 효과에 바로 쓰이는 state variable(위의 예에선 `count`)에 접근할수 있기 때문이다.

**`useEfect`는 render될 때마다 실행되는가?** Yes! 

<br />

### 🔍 자세한 설명

```jsx
function Example() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `카운터 ${count}번 클릭`;
  })
}
```

위의 예에서 `count` state variable을 만들고, React에게 effect를 사용한다고 전했다. 함수를 `useEffect`를 사용해서 전달했고, 이제 이 함수를 "effect"가 된다. effect 내에서 `document.title`을 설정하는데 같은 함수 scope 안에 있으므로항상 최신의 `count`를 읽어 들이게 된다. React가 component를 render할 때  effect를 사용한다는걸 알고 DOM 업데이트 후에 effect를 실행한다. 이러한 과정은 첫 render를 포함한 모든 render마다 일어난다.

`useEffect`로 전달하는 함수가 render 마다 다를수도 있는데 이건 의도된 것이다. 이렇게 함으로 effect가 사라지는 것에 걱정하지 않고 effect 내에서 `count`를 읽을수 있게 해준다. 매 re-render마다 다른 effect를 예약하고 이전의 것을 교체한다. 어떤면에서는 effect가 render의 한 부분처럼 작동한다.

---

<br />

## Effects with Cleanup

어떤 상황에서는 외부 데이터를 subscription 해야할 경우가 있다. 이럴 경우 clean up을 통해 메모리 누수를 막는게 중요하다. 친구가 온라인 상태인지 알려주는 `ChatAPI`를 사용한 예제를 통해 class와 Hook을 비교해 보자.

<br />

### Classes 사용 예

class에서는 `componentDidMount`에서 subscription하고 `componentWillUnmount`에서 clean한다.

```jsx
class FiendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null }
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }
  
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
    	this.props.friend.id,
      this.handleStatusChange
    );
  }
  
  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
    	this.props.friend.id,
      this.handleStatusChange
    );
  }
  
  render() {
    if (this.state.isOnline == null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}
```

`componentDidMount`와 `componentWillUnmount`는 서로 연관되어 있다. Lifecycle methods는 개념적으로 연관된 로직을 분리시킨다.

<br />

### Hooks 사용 예

`useEffect` 내에서 함수를 return하면 React가 clean up할 시간에 이를 실행한다.

```jsx
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);
  
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    
    ChatAPI.subscribeToFiendStatus(props.friend.id, handleStatusChange);
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  
  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

**왜 effect에서 함수를 return하는가?** effects의 선택적인 cleanup 매커니즘이다. 모든 effect는 함수를 리턴할 수 있고, 이를 통해 subscription을 추가하고 제거하는 로직을 가깝게 붙여 놓을 수 있다. 물론 전부 같은 effect의 한 부분이다.

**정확히 언제 React가 effect를 clean up하는가?** React는 component가 unmount될 때 cleanup을 수행한다. 그러나 앞서 살펴본 바에 의하면 effect는 한 번만 실행되는 것이 아니라 render 때마다 실행된다. 이게 React가 다음 effect를 실행하기 이전에 이전 effect를 clean up하는 이유이다.

---

<br />

## 🛁 정리

<br />

**Cleanup이 필요한 경우**

```jsx
useEffect(() => {
  // mount시 or update시 할 것
  return () => {
    // unmount시 할 것
  }
})
```


**Cleanup이 필요 없는 경우**

```jsx
useEffect(() => {
  // mount, update시 할 것
})
```

---

<br />

## :pushpin: Effects 사용 팁

<br />

#### Tip : 개념을 분리하기 위해 여러 Effects를 사용해라

Class component를 상요해서 위에서 사용한 두가지 예제를 하나로 합쳐본다면 다음과 같을 것이다.

```jsx
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `카운터 ${this.state.count}번 클릭`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `카운터 ${this.state.count}번 클릭`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...
```

`document.title`이 `componentDidMount`와 `componentDidUpdate`로 나눠지고, subscription 로직도 `componentDidMount`와 `componentWillUnmount`로 나눠진다. 그리고 `componentDidMount`에는 두가지 일을 하는 코드가 같이 있다.

이를 Hooks을 사용한다면 state hook을 여러개 사용하듯이 effect도 여러개 사용 가능하다. 이를 활용해 관계 없는 로직을 다른 effects로 분리시킬 수 있다.

```jsx
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `카운터 ${count}번 클릭`;
  });
  
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```

Hook을 사용해 lifecycle 이름이 아닌 수행중인 작업 기반으로 코드를 분리할 수 있다. React는 모든 effect를 지정한 순서대로 적용한다.

<br />

#### Tip : Effects를 skip해서 최적화하기

어떤 경우에는 매번 render 할 때마다 effect를 실행하는건 성능 문제를 야기한다. Class component에서는 이런 문제를 `prevProps`와 `prevState`를 사용해서 해결한다.

```jsx
componentDidUpdate(prevProps, prevState) {
  if(prevState.count !== this.state.count) {
    document.title = `카운터 ${this.state.count}번 클릭`;
  }
}
```

이러한 기능을 사용하기 위해서 `useEffect`의 두 번째 argument로 배열을 전달하면 된다.

```jsx
useEffect(() => {
  document.title = `카운터 ${count}번 클릭`;
}, [count]); // count가 다를때만 실행된다.
```

`[count]`를 전달하는 의미는 배열안의 `count` 값이 effect 안의 `count` 값과 같으면 skip한다는 의미고 다르면 실행한다는 의미다. 이건 cleanup을 사용할 때도 똑같이 적용된다.

```jsx
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  
  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // props.friend.id가 바뀔때만 re-subscribe
```





















