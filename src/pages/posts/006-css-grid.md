---
title: 'CSS Grid Layout'
subtitle: 'CSS Grid Layout을 사용하여 영역 나누기'
date: 2019-04-12 10:04:00
author: 'hansol'
tags:
- css
- grid
- display
- layout
---

# :bar_chart: CSS Grid

### 기본 html 상태

기본 상태에서는 `<div>`가 탑처럼 쌓여있다. 여기서 grid를 사용하여 다양하게 위치를 변경시킬 수 있다.

```html
<div id="content">
  <div class="one">1</div>
  <div class="two">2</div>
  <div class="three">3</div>
  <div class="four">4</div>
  <div class="five">5</div>
  <div class="six">6</div>
  <div class="seven">7</div>
  <div class="eight">8</div>
  <div class="nine">9</div>
</div>
```



### grid 사용하기

`display: grid;`로 설정한다. 그리고 다른 설정을 하지 않았으므로 그대로 보여진다.

```css
#content {
  display: grid;
}
```



### :fork_and_knife: grid-template-columns

columns(열)에 대한 grid 설정을 한다. 

```css
#content {
  display: grid;
  grid-template-columns: 설정부분;
}
```

`설정부분`에 쓴 개수만큼 열이 생성되고 쓴 값만큼 공간을 차지한다.

몇가지 단위와 예를 들어보면

```css
#content {
  display: grid;
  /* 100px 크기 열이 2개 만들어져서 #content 안의 내용이 차례로 들어감 */
  grid-template-columns: 100px 100px;
}
```

```css
#content {
  display: grid;
  /* 전체 크기의 20%, 30%, 50% 만큼의 공간을 차지하는 열이 만들어져서 내용이 들어감 */
  grid-template-columns: 20% 30% 50%;
}
```

```css
#content {
  display: grid;
  /* fragment: 전체를 6으로 잡고 1, 2, 3 만큼으로 나눠져 내용이 들어감 */
  grid-template-columns: 1fr 2fr 3fr;
}
```

```css
#content {
  display: grid;
  /* 1fr 짜리를 4번 반복한다. */
  grid-template-columns: repeat(4, 1fr);
}
```

```css
#content {
  display: grid;
  /* 물론 이렇게 섞어서 사용해도 됨 */
  /* repeat(6, 1fr, 2fr)는 1fr 2fr이 3번 반복된다는 의미*/
  grid-template-columns: 20px repeat(3, 1fr, 2fr) 20px;
}
```

### :flashlight: grid-template-rows

rows에 대한 grid를 설정한다. 사용법은 `grid-template-columns`와 동일하다.

```css
#content {
  display: grid;
  /* 200px, 300px, 400px, 200px 크기의 rows를 만든다*/
  /* 내용불이 안 들어가더라도 공간은 차지한다. */
  grid-template-rows: 200px 300px 400px 200px;
}
```

```css
#content {
  display: grid;
  /* 최소 200px, 최대 자동으로 3개의 rows를 만든다. */
  grid-template-rows: repeat(3, minmax(200px, auto));
}
```





### grid-auto-columns, grid-auto-rows

자동으로 생성된 columns와 rows의 크기 설정.

```css
#content {
  display: grid;
  grid-auto-rows: auto; /* 내용물 포함할 정도로 높이 설정 */
}
```

```css
#content {
  display: grid;
  grid-auto-rows: 200px; /* 모든 row를 200px 높이로 설정 */
}
```

```css
#content {
  display: grid;
  grid-auto-rows: minmax(200px, auto); /* 최소를 200px, 최대를 auto로 설정 */
}
```



### :star: grid-auto 랑 grid-template의 차이점

`grid-template-columns`와 `grid-template-rows`는 columns와 rows를 직접 정의하는 것이고 이렇게 정의한 columns와 rows를 explicit grid라고 한다. 반면 grid가 콘텐츠에 맞게 알아서 만들어주는 columns와 rows는 implicit grid라고 하는데 이들의 크기를 지정하는건 `grid-auto-columns`와 `grid-auto-rows`를 사용한다.



### :triangular_ruler: gap

grid 사이의 여백 지정. 그냥 margin을 사용하면 grid 바깥에 margin이 생겨 뚱뚱하게 느껴진다. 그래서 gap을 사용하는게 깔끔하다. 옛날엔 `grid-gap`이였던거 같은데 `gap`으로 바뀌었다.

```css
#content {
  display: grid;
  gap: 10px; /* 상하좌우 10px 여백 주기 */
}
```

column과 row 사이에만 따로 여백주기도 가능하다.

```css
#content {
  display: grid;
  column-gap: 10px; /* columns 사이에 여백 주기 */
}
```

```css
#content {
  display: grid;
  row-gap: 10px; /* rows 사이에 여백 주기 */
}
```



## :straight_ruler: Grid Line

만들어진 grid에서 만들어지는 line(외곽선)들이다. 이를 이용해서 콘텐츠들을 원하는 위치에 배치할 수 있다.

### grid-column

column 위치 지정

```css
.one {
  /* 1번 grid column에서 시작해서 3번 grid column까지 영역 차지 */
  grid-column-start: 1;
  grid-column-end: 3;
}
```

```css
.two {
  /* 이렇게 한 번에 쓰는 것도 가능하다*/
  /* 앞이 start, 뒤가 end 구분은 / 로한다. */
  grid-column: 3 / 7;
}
```

```css
.three {
  /* span을 사용하면 현재 시작 위치에서 3칸 만큼 차지한다는 의미이다. */
  grid-column: span 3;
}
```



### grid-row

row 위치 지정. column과 사용법이 동일하다.

```css
.three {
  grid-row: 2 / 4;
}
```



## :construction: Grid Area

grid area는 영역에 이름을 붙이고 그영역이 차지하는 공간을 " " 안에 표현해서 위치를 잡는 방법이다. 예시를 들어보면

```css
.one {
  grid-area: one;
}
.two {
  grid-area: two;
}
.three {
  grid-area: three;
}
.four {
  grid-area: four;
}
```

이렇게 태그에 area 이름을 붙이고 이를 모두 포함하는 상위 태그에서 `grid-template-areas` property를 통해 위치를 지정한다. 그럼 해당 모양처럼 위치가 지정된다.

```css
#content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    "one one one one"
    "two two three three"
    "four four four four"
}
```



## Nested Grid

grid 만드는 것과 동일하게 grid 내부의 아이템 안에 만들면된다. 만들어도 상위 부모 요소의 grid와 아무런 관계가 없기 때문에 물려받는 것도 없다.



## Aligning & Justifying

grid로 표현되는 상위에서는 `align-items`와 `justify-items`를 이용해서 콘텐츠의 위치를 일괄적으로  조정한다. 반면, 아이템에서는 `align-self`와 `justify-self`를 사용해서 각 아이템의 위치를 grid 안에서 조정한다.









