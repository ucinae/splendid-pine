---
title: 'React Docs 1. Higher-Order Components'
subtitle: 'HOC란 무엇이고 어떻게 사용하는가?'
date: 2019-04-02 11:18:00
author: 'hansol'
tags:
- react
- HOC
- docs
---

# React Docs으로 공부하는 React 1. Higher-Order Component

> 본 시리즈는 reactjs.org의 Docs 강의를 따라가며 공부한걸 정리한 내용입니다.

## Higher-Order Components

> higer-order component (HOC)는 리액트에서 컴포넌트를 재사용 하기 위한 방법 중 하나이다.



hoc는 컴포넌트를 받아서 새로운 컴포넌트를 return하는 함수다. 특정 상황에만 기능을 추가하거나, 여러 컴포넌트에 동일한 기능을 추가하고 싶을 때 사용하면 유용하다.

```jsx
const 강화된컴포넌트 = 하이오더컴포넌트(포장될컴포넌트);
```
그냥 컴포넌트가 `props`를 통해 UI를 변형시킨다면, HOC는 컴포넌트를 통해 컴포넌트를 변형시킨다.

HOC들은 Redux의 [`connect`](https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md#connect)나 Relay의 [`createFragmentContainer`](http://facebook.github.io/relay/docs/en/fragment-container.html) 같은 third-party 라이브러리다.



이 문서에서 HOC가 얼마나 유용하고 어떻게 자신의 HOC를 작성하는지 알아보자.



----



### HOC 사용에 있어서 Cross-Cutting Concerns[^1]

리액트에서 컴포넌트는 재사용되는 주된 단위이다. 하지만, 특정 패턴에서는 일반적인 컴포넌트가 쉽게 들어맞지 않는걸 느낄 수 있다. 

예를들어, `CommentList` 컴포넌트가 외부 데이터를 subscribe하며 댓글 리스트를 render하고 있는 상황을 보자.

```jsx
class CommentList extends React.Comopnent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource"는 전역에 있는 데이터다.
      comments: DataSource.getComments()
    };
  }
  
  componentDidMount() {
    // 변화를 subscribe 한다.
    DataSource.addChangeListener(this.handleChange);
  }
  
  componentWillUnmount() {
    // listener를 정리한다.
    DataSource.removeChangeListener(this.handleChange);
  }
  
  handleChange() {
    // 데이터 원본이 바뀌면 컴포넌트의 state를 업데이트한다.
    this.setState({
      comments: DataSource.getComments()
    });
  }
  
  render() {
    return (
    	<div>
        {this.state.comments.map((comment) => {
          <Comment comment={comment} key={comment.id} />
        })}
      </div>
    )
  }
}
```

나중에 이와 비슷한 패턴으로 blog post 하나를 subscribe하는 코드를 작성한다면 비슷한 패턴을 따르게 된다.

```jsx
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}
```

`CommentList`와 `BlogPost`는  `DataSource`에서 다른 메소드를 호출하고 다른 결과를 render하기 때문에 구분된다. 하지만 실행 과정은 거의 비슷하다.

**비슷한 점**

* mount 될 때 `DataSource`의 change listener를 추가한다.
* litener 내부에서 데이터 원본이 바귈 때마다 `setState`를 호출한다.
* unmount 될 때, change listener를 제거한다.

app의 크기가 커진다면 `DataSource`를 subscribe하고 `setState`를 요청하는 일이 계속 발행할 것이다. 그래서 이러한 로직을 한 장소에 정의하고 여러 컴포넌트에 공유하기 쉽도록 추상할 수 있으면 좋다. 이럴때 HOC를 사용하면 딱이다.



<!-- 이 부분 해석이 많이 어색하다 다시 볼것 -->

`DataSource`를 subscribe하는 `CommentList`나 `BlogPost`와 같은  컴포넌트를 만드는 함수를 작성할 수 있다. 그리고 이 함수는 prop으로부터 데이터를 받는 자식 컴포넌트를 argument로 가진다. 이제 이 함수를 `withSubscription`이라고 하자

<!-- -->

```jsx
const CommentListWithSubscription = withSubscription(
	CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
	BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);
```

`withSubscription`의 파라미터를 살펴보면, 첫 번째 파라미터는 wrapped compoenent(포장되어질 컴포넌트), 두 번째 파라미터는 `DataSource`나 현재의 props로부터 필요한 데이터를 가져오는 함수로 되어있다.

`CommentListWithSubscription`과 `BlogPostWithSubscription`이 render 될 때, `CommentList`와 `BlogPost`는 `DataSource`로부터 가장 최신 정보를 받아 `data` prop으로 전달해준다.

```jsx
// 이 함수는 컴포넌트를 입력받아 ...
function withSubscription(WrappedComponent, selectData) {
  // ... 다른 컴포넌트를 리턴한다
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }
    
    componentDidMount() {
      DataSource.addChangeListener(this.handleChange);
    }
    
    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }
    
    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }
    
    render() {
      // 최신 데이터로 wrapped compoenent를 render!!!
      // 추가적으로 다른 props도 전달 가능
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```

HOC가 입력 컴포넌트를 수정할 순 없고 동작의 복사 상속도 사용하지 않는다. 반변 HOC는 container comopnent를 감싸면서 구성된다. 그래서 HOC는 side-effects[^2]가 없는 순수 함수이다.

wrapped component가 container의 모든 props를 받고, 추가로 결과를 render 할 때 사용되는 `data`라는 새 prop도 받는다. HOC는 데이터가 어떻게 사용되는지 걱정하지 않고 wrapper component는 데이터가 어디서 왔는지 걱정하지 않는다.

`withSubscription`이 일반적인 함수이기 때문에 다른 argument들도 추가 가능하다. 예를들어,  wrapped component에서 HOC를 분리하기 위해 `data` prop의 이름을 변경 가능하게 만들수도 있다. 아니면 `shouldComponentUpdate`를 구성하거나 데이터 원본을 구성하는 argument도 받을 수 있다. 컴포넌트가 어떻게 정의되었는 HOC가 모든 컨트롤을 할 수 있기 때문에 가능하다.

component들과 마찬가지로 `withSubscription`과 wrapped compoenent의 관계도 props-base다. 이 점이  똑같은 props를 wrapper component에게 제공하기만 한다면 한 HOC에서 다른 HOC로 교체하는걸 쉽게 만든다.

[^1]: Cross-Cutting Concern은 핵심 기능이 아닌 중간중간 삽입되어야 될 기능, 관심을 말한다. 그래서 시스템의 나머지 부분으로부터 깨끗이 분해되지 못하는 경우가 있다.
[^2]: side-effects는 함수가 결과값 이외에 다른 상태를 변경시키는 걸 말한다.


---


## 원본 컴포넌트를 수정하지 말고 Composition을 사용

HOC 안에서 컴포넌트의 prototype을 수정하려는 유혹에서 벗어나야한다.

```jsx
function logProps(InputComponent) {
  InputComponent.prototype.componentWillReceiveProps = function(nextProps) {
    console.log('Current props: ', this.props);
    console.log('Next props: ', nextProps);
  };
  // original input을 리턴한다는 점에서 변이되었다는 것을 알 수 있다. 
  return InputComponent;
}

// Enhancedcomponent는 props를 받을때마다 로그를 찍는다.
const EnhancedComponent = logProps(InputComponent);
```

여기에 몇몇 문제가 있다.  문제 중 하나는 input component가 enhanced component에서 따로 재사용 될 수 없다. 더 결정적으로 `EnhancedComponent`에 다른 HOC를 사용하면 `componentWillReceiveProps`도 변형시킨다. 첫 번째 HOC의 기능이 무시된다. 이러한 HOC는 또한 function component로 역할을 하지 못하고 lifecycle methods를 가지지 않는다.

HOC를 변형하는 건 결함이 많은 추상화다. consumer는 다른 HOC와의 충돌을 피하고 자신이 어떻게 실행되는지 명확히 알아야한다.

mutation을 사용하는 대신, HOC는 container component 안에 있는 input component를 덮는 composition을 사용해야한다. 

```jsx
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    render() {
      // container 안에 input component를 wrap한다.
      return <WrappedComponrnt {...this.props} />;
    }
  }
}
```

이 HOC는 충돌을 일으키지 않으며 mutate 버전과 똑같은 기능을 한다. 이런 방식은 class component와 function component에도 작동한다. 그리고 순수 함수이기 때문에 자기 자신을 비롯한 다른 HOC와 결합할 수 있다.

아마 **container components**와 HOC 사이에 비슷한 점을 알 수 있을 것이다. Container components는 high-level과 low-level 사이의 책음을 분리시키는 전략 중 하나이다. Containers는 subscriptions와 state를 관리하고 rendering UI를 다루는 components에 props를 전달한다. HOC는 containers를 자신의 구현의 일부로 사용한다. HOC를 파라미터화된 container component로 생각할 수 있다.

---



## Convention: Wrapped Component를 사용해서 연관되지 않은 props 전달하기

HOC는 component에 특성을 추가한다. HOC로부터 return된 component는 wrapped component와 비슷한 itnerface를 가진다.

HOC는 구체적인 일에 관련되지 않은  props를 전달해야 한다. 대부분의 HOC는 다음과 같은 render method를 가지고 있다.

```jsx
render() {
  // HOC에 연관된 props만 걸러낸다.
  const { extraProp, ...passThroughProps } = this.props;
  
  // wrapped component에 props를 주입한다. 보통 state 값이거나 instance methods다.
  const injectedProp = someStateOrInstanceMethod;
  
  // wrapped component에 props로 전달한다.
  return (
  	<WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
     />
  );
}
```

이 Convention이 HOC가 유연하고 재사용 가능하도록 보장하는데 도움을 줄 것이다.

---



## Convention: 결합성 최대로

모든 HOC가 똑같이 생기진 않았다. 가끔은 wrapped component에 단 하나의 argument만 허용한다:

```jsx
const NavbarWithRouter = withRouter(Navbar);
```



보통, HOC는 추가적인 arguments를 받아들인다. 이 Relay 예에서 config 객체는 특정 컴포넌트의 data dependencies로 사용된다:

```jsx
const CommentWithRelay = Relay.createContainer(Comment, config);
```



HOC의 가장 보통의 특징은 다음과 같이 생겼다:

```jsx
// React Redux's `connect`
const ConnectedComponent = connect(commentSelector, commentActions)(CommentList);
```

이걸 분해해보면 무슨 일이 일어나는지 더 쉽게 보인다.

```jsx
// connect는 다른 함수를 리턴하는 함수이다.
const enhance = connect(commentListSelector, commentListActions);
// return된 함수는 Redux store에 연결된 컴포넌트를 리턴하는 HOC다. 
const ConnectedComment = enhance(CommentList);
```

다른 말로, `connect`는 HOC를 리턴하는 higer-order function이다.



이 양식은 혼란스럽고 불필요하지만 유용한 성질을 가지고 있다. `connect`에 의해 리턴되는 것과 같은 Single-argument HOC는 `Component => Component`라는 특성을 가진다. output 타입이 input 타입과 같은 함수들은 합성하기 매우 쉽다.

```jsx
// 이렇게 하는 대신
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))

// composition utility를 사용 가능하다
// compose(f, g, h)는 (...args) => f(g(h(...args)))와 같다
const enhance = compose(
	// 이것들은 둘다 single-argument HOC들이다.
  withRouter,
  connect(commentSelector)
)
const EnhancedComponent = enhance(WrappedComponent)
```

---



## Convention: 쉬운 디버깅을 위한 Display Name  wrap 하기

HOC로 생성된 container component는 [React Developer Tools](<https://github.com/facebook/react-devtools>)에 다른 컴포넌트와 동일하게 보인다. 디버딩을 위해 display name을 선택 가능하다.

가장 일반적인 테크닉은 display name을 wrapped component로 감싸는 것이다. 당신의 HOC 이름이  `withSubscription`이라면 display name `WithSubscription(CommentList)`를 사용해서 wrapped component의 display name은 `CommentList`다.

```jsx
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {/* .. */}
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```

---



## 경고

React를 처음 접하는 경우 HOC를 사용할 때 주의할 점



### HOC 내부에 render method를 사용하지 마라

React's diffing algorithm은 컴포넌트 구분을 할 때 존재하는 서브트리에서 업데이트 해야하는지 아니면 버리고 새로 mount 해야하는지로 결정한다. 만약 `render`로 반환된 컴포넌트가 이전에 render한 컴포넌트와 동일하다면, React는 재귀적으로 서브트리를 새것으로 업데이트한다. 만약 같지 않다면 이전 서브트리는 완전히 마운트되지 않는다.

보통, 여기에 대해 생각할 필요는 없다. 하지만 component의 render method에 HOC를 적용할 수 없다는 의미이므로 HOC에 문제를 준다.

```jsx
render() {
  // EnhancedComponent1 !== EnhancedComponent2일 때마다 새로운 버전의 EnhancedComponent가 생성된다
  const EnhancedComponent = enhance(MyComponent);
  // 이건 모든 서브트리에 매번 unmount/mount되는 문제를 야기한다.
  return <EnhancedComponent />;
}
```

문제는 단지 성능 뿐 아니라 children의 state를 잃을수도 있기 때문이다.

대신 component 정의 외부에 HOC를 적용해서 resulting component가 단 한번 생성되도록 만든다. 그럼 그것의 구분은 render되는 동안 지속된다.

HOC를 동적으로 적용하는 드문 상황에서도 컴포넌트 lifecycle methos 내부나 constructor에서 적용 가능하다.



### Static Methdos는 반드시 복사

때때로 static method를 react component에 정의하는게 유용하다. 예를들어 Relay containers는 GraphQL fragments를 구성하는데 용이한 `getFragment`라는 method를 드러낸다.

 원본 컴포넌트가 container 컴포넌트에 wrapped된 상태더라도 컴포넌트에 HOC를 적용한다면 그건 새로운 컴포넌트가 원본 컴포넌트의 static methods를 가지지 않는다는 의미이다.

```jsx
// static method 정의
WrappedComponent.staticMethod = function() {/* ... */}
// HOC 적용
const EnhancedComponent = enhance(WrappedComponent);

// enhanced component는 static method를 가지지 않는다.
typeof EnhancedComponent.staticMethod === 'undefined' // true
```

이 문제를 해결하기 위해 리턴하기 전에 메서드를 복사해야한다.

```jsx
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/* ... */}
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}
```

그러나, 이건 어떤 메소드가 복사를 필요로하는지 알아야한다. [hoist-non-react-statics](<https://github.com/mridgway/hoist-non-react-statics>)를 사용해서 자동으로 non-React static methods를 복사할 수 있다.

```jsx
import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}
```

다른 해결책은 static method를 자기 스스로부터 따로따로 export 하는 법이다.

```jsx
// Instead of...
MyComponent.someFunction = someFunction;
export default MyComponent;

// ...export the method separately...
export { someFunction };

// ...and in the consuming module, import both
import MyComponent, { someFunction } from './MyComponent.js';
```



### Refs는 전달할 수 없다.

HOC가 모든 props를 wrapped component에 전달할 수 있는 반면, refs는 적용되지 않는다. 왜냐하면 `refs`는 prop이 아니기 때문이다. 이건 React에 의해 특별히 다루어 진다. 만약 HOC의 결과로 나온 컴포넌트에 refs를 단다면 그 ref는 wrapped component가 아닌 가장 바깥의 container component를 참조할 것이다.


