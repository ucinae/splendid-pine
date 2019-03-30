<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby로 시작하는 개발 블로그 만들기
</h1>

공부하는걸 매번 마크다운으로 정리하긴 했는데 막상 정리만 하고 나중에 다시 보는 일은 드물었다. 그리고 백업을 구글 드라이브에 하니 더욱 접근성이 떨어졌다. 그래서 정리한걸 블로그에 올리고 블로그를 계속 관리한다면 공부도 되고 백업도 되는 일석이조의 효과를 누릴 수 있을 것 같아 개발 블로그를 시작하게 되었다.

## 🌱 시작

블로그를 어디서 시작할지 알아보던 중 직접 블로그를 만들어 보면 공부도 되고 원하는대로 블로그를 꾸밀 수 있으니 직접 만들기로 했다. 직접 블로그를 만들어 볼 수 있는 Static Site Generator 중에 유명한 Jekyll이 있었는데 Ruby를 사용해야하고 나에게는 많이 생소했다. 그래도 github page에 올릴 수 있는 예제를 따라 블로그를 만들어 보았는데 내가 원하는대로 디자인하기에는 힘들었다. 그러다가 Gatsby를 알게 되었고 React를 이용하여 정적 사이트 제작이 가능해서 이건 공부해야겠다고 느끼게 되었다.

## 🎋 공부

Gatsby 공부는 공식 홈페이지([Gatsby](https://www.gatsbyjs.org/))의 Tutorial과 Docs를 보며 공부해본 뒤, 유튜브에 gatsby tutorial을 찾아가며 공부를 했다. 기존에 [React](https://reactjs.org/)는 어느정도 알고 있었는데 이번에 Gatsby를 공부하면서 다시 한번 기초부터 공부를 했다. 그리고 Gatsby에는 쿼리를 [GraphQL](https://graphql.org/)을 사용해서 GraphQL도 공부했다. 그밖에도 디자인을 하기위해 [SASS](https://sass-lang.com/)와 [Bulma](https://bulma.io/), [bootstrap](https://getbootstrap.com/)까지 공부할 수 있게 되었다.

## 🌴 개발

`gatsby-starter-default`를 사용해서 시작했다. 그리고 기본적인 베이스는 유튜브 채널 [Classed](https://www.youtube.com/playlist?list=PLMhAeHCz8S3_x-jXerCYnl7jftCSxQkPV)의 도움을 받았다.

디자인은 bulma를 사용하려다가 제대로 활용하지 못하는 것 같아 bootstrap으로 바꿨다. 그리고 몇몇 부분은 직접 sass로 디자인했다. 아직 디자인이 마음에 들진 않지만 계속 예쁘게 발전시켜 나가야겠다.

**프로젝트 파일**

`components` : 컴포넌트
`images` : 이미지
`pages` : 페이지들
`pages/posts` : 블로그 게시물
`styles` : SASS 디자인
`templates` : `gatsby-node.js`에서 노드로 만드는 페이지들

## 🌲 주제

일단 공부하는 것들 정리를 해서 블로그에 올린다는 계획을 가지고 있다. 지금 관심 분야인 웹, 모바일, 머신러닝 부분인데 공부하고 정리 할 때 마크다운으로 정리해서 포스팅 해야겠다. 

개발 관련 글 말고도 읽은 책이나 경험들을 올려야겠다.

## 🌳 미래

아직 많이 부족한 블로그지만 계속해서 발전시켜 나가야겠다. 특히 아직 구현되지 않은 검색 기능과 댓글 기능을 구현하고 추가로 에니메이션 효과를 군데군데 넣고 싶다. 그리고 나만의 로고도 만들어서 블로그 이름대신 활용할 계획이다.