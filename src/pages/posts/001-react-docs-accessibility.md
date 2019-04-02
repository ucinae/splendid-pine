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

# React Docs 시리즈 1

> 본 시리즈는 reactjs.org의 Docs 강의를 따라가며 공부한걸 정리한 내용입니다.

## Higher-Order Components

> higer-order component (HOC)는 리액트에서 컴포넌트를 재사용 하기 위한 방법 중 하나이다.



hoc는 컴포넌트를 받아서 새로운 컴포넌트를 return하는 함수다. 특정 상황에만 기능을 추가하거나, 여러 컴포넌트에 동일한 기능을 추가하고 싶을 때 사용하면 유용하다.

```react
const 강화된컴포넌트 = 하이오더컴포넌트(포장될컴포넌트);
```

그냥 컴포넌트가 `props`를 통해 UI를 변형시킨다면, HOC는 컴포넌트를 통해 컴포넌트를 변형시킨다.

HOC들은 Redux의 [`connect`](https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md#connect)나 Relay의 [`createFragmentContainer`](http://facebook.github.io/relay/docs/en/fragment-container.html) 같은 third-party 라이브러리다.



이 문서에서 HOC가 얼마나 유용하고 어떻게 자신의 HOC를 작성하는지 알아보자.



----



### HOC 사용에 있어서 Cross-Cutting Concerns[^1]

리액트에서 컴포넌트는 재사용되는 주된 단위이다. 하지만, 특정 패턴에서는 일반적인 컴포넌트가 쉽게 들어맞지 않는걸 느낄 수 있다. 

예를들어, `CommentList` 컴포넌트가 외부 데이터를 subscribe하며 댓글 리스트를 render하고 있는 상황을 보자.

```react
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

```react
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

```react
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

```react
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



