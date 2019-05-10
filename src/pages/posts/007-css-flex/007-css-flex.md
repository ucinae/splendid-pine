---
title: 'CSS Flexbox Layout'
subtitle: 'CSS Flexbox Layout 사용하기'
date: 2019-04-14 12:07:00
author: 'hansol'
tags:
- css
- flexbox
- display
- layout
---

# Flexbox

<br />

### Flex 적용 시키기

**기본 상태**

```html
<div class="wrapper">
  <div class="flex-container">
    <div class="box one"></div>
    <div class="box two"></div>
  	<div class="box three"></div>
	</div>
</div>
```

```css
body {
  background: rgb(190, 190, 190); /* 진한 회색 */
}

.wrapper {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.box {
  height: 100px;
  min-width: 100px;
}
```

이런 html 상태에서 `.one`, `.two`, `.three`에 색만 지정해서 구분하면

<br />

![Alt text](/flexbox-01.png)

<br />

vertical 방향으로 쌓이게 된다.

```css
.flex-container {
  display: flex;
  background: #fff;
}
```

이 상태에서 `.flex-container`에 `display: flex;` 속성을 주면

<br />

![flexbox-02](/flexbox-02.png)

<br />
쌓이는 방향이 horizontal 방향으로 바뀐다.

<br />

## flex-basis

flex 항목의 크기를 결정한다. default로 `auto`로 설정되며 해당 태그가 가지는 크기로 설정된다. 만약 크기가 지정되지 않았다면 태그가 가지는 내용물의 크기가 flex-basis 값으로 사용된다. 따라서 `display: flex` 속성만 지정하면 flex 항목들이 각 내용물 크기만큼 공간을 차지하게 된다.

<br />

## flex-grow

주축 방향으로 차지하는 공간을 키우는 속성이다. 양수 값으로 지정하면 늘어나게 되고 여러 flex 항목들이 이 속성을 가지면 `flex-grow` 값의 비율에 따라 공간이 분배된다.

예제에서 flex 항목에 동일하게 `flex-grow` 값을 주면 동일한 비율로 전체 공간을 차지하게 된다.

```css
.one {
  flex-grow: 1;
}
.two {
  flex-grow: 1;
}
.three {
  flex-grow: 1;
}
```

<br />

![flexbox-03](/flexbox-03.png)

<br />

값을 다르게 주면 해당 값의 비율 만큼 공간을 가져간다.

```css
.one {
  flex-grow: 1;
}
.two {
  flex-grow: 2;
}
.three {
  flex-grow: 3;
}
```

<br />

![flexbox-04](/flexbox-04.png)

<br />

## flex-shrink

`flex-shrink`는 주축 방향으로 공간이 부족할때 flex 항목들이 줄이는 정도를 설정하는 속성이다. `flex-shrink` 값이 더 클수록 빠르게 줄어든다.

```css
.one {
  flex-shrink: 1;
}
.two {
  flex-shrink: 2;
}
.three {
  flex-shrink; 3;
}
```

<br />

![flexbox-05](/flexbox-05.png)

<br />

## flex-wrap

넘치는 영역을 다음 행으로 넘겨 나열하게 해준다.

```css
.flex-container {
  display: flex;
  background: #fff;
  flex-wrap: wrap; /* flex-wrap을 wrap으로한다 */
}
```

<br />

![flexbox-06](/flexbox-06.png)

---

<br />


## flex 간단히

`flex: grow shrink basis`으로 간단히 표현 가능하다.

```css
flex: 1 1 auto;
```

<br />

#### 더 간단히

```css
flex: initial; == flex: 0 1 auto;
flex: auto; == flex: 1 1 auto;
flex: none; == flex: 0 0 auto;
flex: 숫자; == flex: 숫자 1 0;
```

<br />

## flex-flow

기본 flex의 주축은 horizontal한 방향인데 바꾸려면 `flex-flow`를 속성을 설정하면 된다.

```css
flex-flow: column; /* column 방향이 주축이된다. */

flex-flow: row; /* default */

/* reverse를 통해 주축 방향을 반대로 할 수도 있다.*/
flex-flow: column-reverse;
flex-flow: row-reverse;
```

<br />

## align-items & justify-content

`align-items`는 cross-axis를 기준으로 정렬하고

`justify-content`는 main-axis를 기준으로 정렬한다.