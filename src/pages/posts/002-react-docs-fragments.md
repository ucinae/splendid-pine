---
title: 'React Docs 2. Fragments'
subtitle: '여러 elements를 한 컴포넌트에서 return 할 때 Fragments로 묶을 수 있다'
date: 2019-04-03 21:57:00
author: 'hansol'
tags:
- react
- fragment
- docs
---



# React Docs으로 공부하는 React 2. Fragments

> reactjs.org의 docs를 번역하며 공부한 내용을 정리한 글입니다.



## Fragments

> Fragments는 리액트에서 여러 elements를 하나의 component로 리턴하는 패턴이다.

```jsx
render() {
  return (
  	<React.Fragment>
    	<ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

---

### Motivation

보통 chilren 리스트를 한 컴포넌트로 리턴하는게 일반 패턴이다.

```jsx
class Table extends React.Component {
  render() {
    return (
    	<table>
      	<tr>
        	<Columns />
        </tr>
      </table>
    );
  }
}
```

`<Columns />`가 여러 `<td>`를 리턴해야  HTML이 유효해진다. 만약 `<Columns />`의 `render()`에서 parent로 div 태그가 쓰인다면 HTML의 결과는 유효하지 않게 된다.

```jsx
class Columns extends React.Component {
  render() {
    return (
    	<div>
      	<td>Hellow</td>
        <td>World</td>
      </div>
    );
  }
}
```

이러면 `<Table />`의 결과는 다음과 같다:

```jsx
<table>
	<tr>
  	<div>
    	<td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>
```

Fragments가 이 문제를 해결 할 수 있다.

---

### Usage

```jsx
class Columns extends React.Component {
  render() {
    return (
    	<React.Fragment>
      	<td>Hello</td>
        <td>World</td>
      </React.Fragment>
    )
  }
}
```

이렇게 Fragments를 사용하면 `<Table />`을 결과는 다음과 같다:

```jsx
<table>
	<tr>
  	<td>Hello</td>
    <td>World</td>
  </tr>
</table>
```



### Short Syntax

빈 태그로 줄여 사용 가능하다.

```jsx
class Columns extends React.Component {
  render() {
    return (
    	<>
      	<td>Hello</td>
      	<td>World</td>
      </>
    )
  }
}
```

keys나 attributes를 사용하지 않는다면 `<></>`를 사용 가능하다. 아직 모든 툴이 이걸 지원하진 않지만 그럴 땐 `<React.Fragment>`를 사용하면 된다.



### Keyed Fragments

`<React.Fragment>`를 사용해야 keys를 사용 가능하다.

```jsx
function Glossary(props) {
  return (
  	<dl>
      {props.items.map(item => {
        // Without the `key`, React will fire a key warning
        <React.Fragment key={item.id}>
        	<dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      })}
    </dl>
  );
}
```

























