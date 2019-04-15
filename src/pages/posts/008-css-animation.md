---
title: 'CSS Transform and Animation'
subtitle: 'CSS 애니메이션 효과 사용하기'
date: 2019-04-15 12:10:00
author: 'hansol'
tags:
- css
- animation
- transform
- transition
---

# Animation Basic

## 기본 axis

**x-axis**: :arrow_right: 이 방향이 기본

**y-axis**: :arrow_down: 이 방향이 기본

**z-asix**:  모니터에서 눈 방향으로

플레밍의 왼손 법칙 방향으로 생각하면 된다. (엄지-Z, 검지-X, 중지-Y)



### transform-origin

원점의 위치 지정. 해당 위치로 원점이 설정되고 transform하는 기준 점이 된다.

```css
/* One-value syntax */
transform-origin: 2px;
transform-origin: bottom;

/* x-offset | y-offset */
transform-origin: 3cm 2px;

/* x-offset-keyword | y-offset */
transform-origin: left 2px;

/* x-offset-keyword | y-offset-keyword */
transform-origin: right top;

/* y-offset-keyword | x-offset-keyword */
transform-origin: top right;

/* x-offset | y-offset | z-offset */
transform-origin: 2px 30% 10px;

/* x-offset-keyword | y-offset | z-offset */
transform-origin: left 5px -3px;

/* x-offset-keyword | y-offset-keyword | z-offset */
transform-origin: right bottom 2cm;

/* y-offset-keyword | x-offset-keyword | z-offset */
transform-origin: bottom right 2cm;
```





## Transform

### 이동 시키기 - `transform: translate()`

축을 기준으로 평행 이동

```css
transform: translate(tx); /* 하나는 x축 */
transform: translate(tx, ty); /* 두개는 x, y축*/

/* 따로따로도 가능 */
transform: translateX(tx);
transform: translateY(ty);
```

### 확대, 축소 - `transform: scale()`

```css
transform: scale(s); /* 하나는 x, y 둘 다 scale */
transform: scale(sx, sy); /* 두개는 x scale, y scale */

/* 따로따로도 가능 */
transform: scaleX();
transform: scaleY();
```

### 회전시키기 - `transform: rotate()`

축을 기준으로 양수면 시계방향, 음수면 반시계 방향으로 회전

```css
transform: rotate(90deg); /* 90도 */
transform: rotate(0.25turn); /* 1/4 바퀴 */
transform: rotate(1rad); /* 1 라디안 */

/* 따로따로 */
transform: rotateX();
transform: rotateY();
transform: rotateZ();
```



## Transition

CSS 속성을 변경하는 속도를 조절하는 기능을 한다.

```css
transition: <property> <duration> <timing-function> <delay>;
```

**property** : transition이 적용될 CSS 속성. 해당 CSS 속성 변화를 조절하게 된다.

**duration** : transition이 일어나는 지속 시간. 단위는 ms나 s

**timing-function** : CSS 속성의 속도 변화율을 계산하는 함수 `ease`,  `linear`, `step-start` 등이 있다.

**delay** : transition 시작하기까지 delay하는 시간

예시) circle에 hover하면 배경색은 곧바로 1초동안 green에서 tomato로 바뀌고, transform은 1초 기다린 뒤 linear하게 0.5초 동안 360도 회전한다.

```css
.circle {
  /* ... */
  background: green;
  transition: background 1s, transform 0.5s linear 1s;
}

.circle:hover {
  background: tomato;
  transform: rotate(360deg);
}
```



## Keyframes

애니메이션 효과의 중간 상태들을 나타낸다.

기본적인 사용법

```css
@keyframes 키프레임이름 {
  from { } /* 시작 상태 */
  <percentage> { } /* 특정 퍼센트 지점 상태 25% { }, 50% { } 이렇게 사용 */
  to { } /* 끝 상태 */
}
```

키프레임을 정의하고 `animation-name: ` 속성에 지정해주면 된다.

```css
.클래스이름 {
  animation-name: 키프레임이름;
  animation-duration: 시간; /* 1s, 2s 등등*/
}
```

추가 설정

```css
animation-fill-mode: backwards; /* 실행될 애니메이션의 첫 상태 적용 */
animation-fill-mode: forwards; /* 실행된 애니메이션의 마지막 상태 유지 */
animation-fill-mode: both; /* 둘 다 */

animation-delay: 시간; /* 애니메이션 시작까지 delay */

animation-iteration-count: 숫자 또는 infinite; /* 애니메이션 반복 횟수 */

animation-direction: normal; /* from -> to */
animation-direction: reverse; /* to -> from */
animation-direction: alternate; /* from -> to / to -> from */
animation-direction: alternate-reverse; /* to -> from / from -> to */

animation-timing-function: ease, linear, ... 또는 cubic_bezier(); /* 속도 변화 설정 */
```

cubic_bezier() 쉽게 만들기 : [cubic-bezier](http://cubic-bezier.com/)

이 모든걸 `animation` property에 간단히 쓸 수 있다.

```css
animation: <animation-name> <animation-duration> <animation-timing-function> <animation-delay> <animation-iteration-count> <animation-direction> <animation-fill-mode> <animation-play-state>
```



