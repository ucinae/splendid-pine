---
title: 'React Hook 2. State Hook'
subtitle: 'this.state를 대신할 state hook'
date: 2019-05-01 14:41:00
author: 'hansol'
tags:
- react
- docs
- hook
---

# React Hooks 2. State Hook

버튼을 누르면 count가 1 증가하는 예제를 통해 Hook과 Class를 비교해보자. 기능은 두 경우 모두 동일하다.

```jsx
import React, { useState } from 'react';

// Hook을 사용한 예제
function Example() {
  const [count, setCount] = useState(0);
  
  return (
  	<div>
    	<p>카운터 {count}번 클릭!</p>
      <button onClick={() => setCount(count + 1)}>
      	카운터 증가
      </button>
    </div>
  );
}
```

```jsx
import React, { Component } from 'react';

// Class를 사용한 예제
class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  
  render() {
    return (
    	<div>
      	<p>카운터 {this.state.count}번 클릭!</p>
        <button onClick={() => this.setState({ count: this.state.count +1 })}>
        	카운터 증가
        </button>
      </div>
    )
  }
}
```

---

<br />


## Function Components에서 Hooks

화살표 함수나 함수 선언문으로 만든 function component는 "stateless components"로 알려져있지만 이제 hook을 사용해 이 안에 React state를 사용할 수 있다. hook은 class안에선 동작하지 않으니 주의.

```jsx
const Example = (props) => {
  // 여기에 hook 사용 가능
  return <div />;
}
```

```jsx
function Example(props) {
  // 여기에 hook 사용 가능
  return <div />;
}
```

<br />

## useState

`useState`를 import해서 사용가능하다.

```jsx
import React, { useState } from 'react';

function Example() {
  // ...
}
```

`useState`는 function components에 React state를 추가해주는 기능을 가진다. Function component를 만들고 여기에 state가 필요하다고 느낄 때 class component로 교체하지않고 hook을 추가해서 state를 사용할 수 있다.

<br />

## State Variable 선언하기

Class로 0부터 시작하는 `count` state를 만든다면 `constructor`에서 `{ count: 0 }`으로 만들 수 있다.

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
}
```

하지만 Function component에는 `this`가 없기 때문에 `this.state`를 읽을 수 가 없다. 대신 `useState` Hook을 사용해서 component 안에 직접 만들어 준다.

```jsx
import React, { useState } from 'react';

function Example() {
  // count라고 부를 state variable을 만들었다.
  const [count, setCount] = useState(0);
}
```

`useState`는 state variable을 만드는 일을 한다. 변수 이름은 마음대로 정할 수 있고, 보통의 variable은 함수가 끝나면 없어지지만 state variable은 React에 의해 남아있는다.

`useState`에 argument로 들어가야하는 값은 초깃값이다. state variable을 더 사용하고 싶으면 여러번 `useState`를 호출하면 된다.

`useState`는 2개의 값을 리턴한다. 하나는 현재 state고 다른 하나는 state를 update하는 함수다.

<br />

#### State Variables 여러개 사용하기

```jsx
function ExampleWithManyState() {
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
}
```

이렇게 여러개로 만들면된다.

<br /><br />



## 📃 State 읽기

#### 클래스 컴포넌트의 경우

```jsx
<p>카운터 {this.state.count>번 클릭</p>
```

#### `count`에 바로 접근 가능

```jsx
<p>카운터 {count}번 클릭</p>
```

<br /><br />



## 📫 State Update하기

#### 클래스 컴포넌트인 경우

```jsx
<button onClick={() => this.setState({ count: this.state.count + 1 })}>
	클릭
</button>
```

Function에서 `setCount`와 `count`를 가지고 있으므로 `this`를 사용할 필요가 없다.

<br />

## 📝 정리

```jsx
import React, { useState } from 'react';
```

`useState` Hook을 import한다.



```jsx
const [변수이름, 함수이름] = useState(초깃값);
```

`useState`에 초깃값을 를 사용해서  호출하고 리턴되는 두 값에 이름을 붙여준다.



```jsx
<button onClick={() => 함수이름(새 값)}>
```

반응을 받으면(클릭과 같은) 새 값을 argument로 변화함수를 호출한다. 이러면 React는 "새 값"으로 컴포넌트를 re-render할 것이다.

























