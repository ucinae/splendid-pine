---
title: 'Kruskal algorithm'
subtitle: 'MST 구하는 방법 2'
date: 2019-05-12 15:08:00
author: 'hansol'
tags:
- algorithm
- kruskal algorithm
- MST
- graph
---

# Kruskal algorithm

> MST(최소 신장 트리)를 효율적으로 구하는 방법 중 하나인 Kruskal algorithm(크루스칼 알고리즘)에 대해 알아보자

<br />

## 🔨 언제? 그리고 왜?

MST를 구하는 다른 방법인 Prim algorithm과 마찬가지로 **Edge에 가중치가 있는 무향 그래프**에서 최소 가중치로 모든 Vertex를 Edge로 연결한 서브 그래프를 찾을 때 사용한다. 크루스칼 알고리즘은 간선의 가중치 순서에 따라 진행하므로 간선을 저장할 간선 리스트가 있으면 사용하기 좋다.

<br />

## 🌏 전략

크루스칼 알고리즘은 Greedy algorithm으로 간선의 가중치가 작은 것부터 탐색한다.

1. 간선들을 오름차순으로 정렬한다.
2. 정렬된 간선 순서대로 양 끝 정점의 덩어리들이 같은 덩어리인지 확인한다.
   1. 같은 덩어리라면 그 간선은 MST에 들어가지 못하고 넘어간다.
   2. 다른 덩어리라면 그 간선은 MST에 추가되고 두 덩어리는 한 덩어리가 된다.
3. 간선을 n-1개 선택하면 그 간선들로 이루어진 MST가 완성된다.

여기서 덩어리를 구분할 방법이 필요한데 Union Find(Disjoint set이라고도 하는) 자료구조를 이용하면 된다.

<br />



## 👨🏻‍🏫 예시

아래와 같은 그래프가 있다고 가정하고 시작해보자.

![kruskal_graph](/kruskal_graph_0.png)

<br />

우선 모든 정점에 아이디를 부여한다.

그 다음 Edge List를 정렬해보면

$ \overline{FG} $, $ \overline{AB} $, $ \overline{EF} $, $ \overline{CG}$, $ \overline{BG} $, $ \overline{CD} $, $ \overline{AF} $, $ \overline{CF} $, $ \overline{AE} $, $ \overline{DF} $, $ \overline{DE} $ 이런 리스트가 생성된다.

이제 앞쪽부터 하나씩 검사를 시작하면 된다.

### 1. $ \overline{FG} $

F와 G가 다른 덩어리므로 MST에 추가한다. 

전체 가중치 **1** 증가시키고 F와 G는 같은 ID를 가지게된다.



### 2. $ \overline{AB} $

A와 B가 다른 덩어리이므로 MST에 추가한다.

전체 가중치가 **2** 증가하고 A, B는 같은 ID를 가지게 된다.



### 3. $ \overline{EF} $

E와 F가 다른 덩어리이므로 MST에 추가한다.

전체 가중치가 **3** 증가하고 E, F, G는 같은 ID를 가지게 된다.

<br/>

![kruskal_graph_2](/kruskal_graph_1.png)

<br/>

### 4. $ \overline{CG} $

C와 G가 다른 덩어리이므로 MST에 추가한다.

전체 가중치가 **5** 증가하고 C, E, F, G는 같은 ID를 가지게 된다.



### 5. $ \overline{BG} $

B와 G가 다른 덩어리이므로 MST에 추가한다.

전체 가중치가 **6** 증가하고 A, B, C, E, F, G는 같은 ID를 가지게 된다.



### 6. $ \overline{CD}  $

C와 D가 다른 덩어리이므로 MST에 추가한다.

전체 가중치가 **7** 증가하고 A, B, C, D, E, F, G는 같은 ID를 가지게 된다.

여기서 모든 정점이 연결되어서 그만해도 된다.(그래프 예제를 잘못 만들었다.)

그래도 계속 진행해보자.

<br />

![kruskal_graph_2](/kruskal_graph_2.png)

<br />

### 7. $ \overline{AF}  $

A와 F가 같은 덩이리이므로 넘어간다.



### 8. $ \overline{CF} $

C와 F가 같은 덩이리이므로 넘어간다.



### 9. $ \overline{AE} $

A와 E가 같은 덩이리이므로 넘어간다.



![kruskal_graph_03](/kruskal_graph_3.png)





### 3. $ \overline{DF } $

D와 F가 같은 덩이리이므로 넘어간다.



### 3. $ \overline{DE} $

D와 E가 같은 덩이리이므로 넘어간다.



![kruskal_graph](/kruskal_graph_4.png)

<br />

<br />

이런 방식으로 MST를 구하는 법이 Kruskal Algorithm이다.