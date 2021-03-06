---
title: 'Prim algorithm'
subtitle: 'MST 구하는 방법 1'
date: 2019-05-09 22:52:00
author: 'hansol'
tags:
- algorithm
- prim algorithm
- MST
- graph
---

# Prim algorithm

>  MST(최소 신장 트리)를 효율적으로 구하는 방법 중 하나인 Prim algorithm(프림 알고리즘)에 대해 알아보자

<br />

## 🔨 언제? 그리고 왜?

모든 정점들이 연결되어 있고 사이클이 없는 형태의 **Edge에 가중치가 있는 무향 그래프**에서 최소 연결로 모든 Vertex를 포함하고 Edge 가중치의 합이 최소가 되는 **트리**를 찾고자 할 때 사용한다. 가장 적은 비용으로 모든 지점을 연결해야 하는 도로 연결 문제나 네트워크 구축, 전기 회로 설계를 효율적으로 해결할 수 있다.

<br />

## 🌏 전략

<br />

#### 준비:

일단 정점을 3가지 상태로 분류한다.

첫번째는 **Unseen**으로 아직 접근하지 못한 정점

두번째는 **Tree**로 MST에 포함된 정점

세번째는 **Fringe**(변두리)로 접근했고 아직 MST에 들어가지 못한 정점

이 3가지 상태를 가지고 맨 처음에는 전부 **Unseen** 상태에서 시작한다.

<br />

#### 상태 변화: 

임의로 시작 정점을 선택한다. 시작 정점은 바로 **Tree** 상태가 된다.

이제 시작 정점에 연결된 정점들을 돌며 검사한다.

만약 **Unseen** 상태라면 정점을 **Fringe** 상태로 넣으면서 두 가지 값을 같이 넣는다.

하나는 간선에 연결된 반대편 정점 번호이고,

다른 하나는 간선의 가중치이다.

**Fringe** 상태라면 기존에 가지고 있던 가중치와 비교하여 새 값이 작으면 업데이트하고 크면 그대로 간다.

**Tree** 상태라면 이미 MST에 포함되었으므로 건너뛴다.

<br />

#### 추가:

순회가 끝났으면 **Fringe** 중에 간선 가중치가 가장 작은 정점을 MST에 추가하고 **Tree** 상태로 바꾼다.

정점 추가에서 Greedy한 전략으로 진행된다.

<br />

#### 반복:

이제 새로 들어온 정점을 잡고 상태 변화 단계를 다시 진행하고 추가를 진행한다.

<br />

#### 끝:

모든 정점이 **Tree** 상태가 된다면(위 단계를 정점 수만큼 한다면) MST가 만들어진다.

<br /><br />

## 👨🏻‍🏫 예시

아래와 같은 그래프가 있다고 가정하고 정점 A에서 출발한다고 가정하고 과정을 살펴보면

<br />

![prim_graph](/prim_graph.png)

<br />

### 1. 이 상태에서 시작하고 A에 연결된 정점을 찾는다.
<br />

| Unseen     | B, C, D, E, F, G, H, I |
| ---------- | ---------------------- |
| **Fringe** |                        |
| **Tree**   | **A**                  |

<br />

**B** - unseen이므로 $ B_2^A $를 Fringe에 넣는다.

**F** - unseen이므로 $ F_7^A $를 Fringe에 넣는다.

**G** - unseen이므로 $ G_3^A $를 Fringe에 넣는다.

<br />

| Unseen     | C, D, E, H, I                   |
| ---------- | ------------------------------- |
| **Fringe** | $ B_2^A $, $ F_7^A $, $ G_3^A $ |
| **Tree**   | **A**                           |

<br />

​	Fringe에서 가중치가 가장 작은 **B**를 Tree에 넣는다.

<br />

| Unseen     | C, D, E, H, I        |
| ---------- | -------------------- |
| **Fringe** | $ F_7^A $, $ G_3^A $ |
| **Tree**   | **A**, $ B_2^A $     |

<br /><br />

### 2. **B**에서 연결된 정점을 찾는다.

<br />

**A** - Tree이므로 건너뛴다.

**C** - unseen이므로 $ C_4^B $를 Fringe에 넣는다.

**G** - Fringe이므로 기존에 있던 $ G_3^A $와 비교해서 가중치가 6으로 더 크므로 넘어간다.

​	Fringe 중에 **G**가 가장 가중치가 작으므로 Tree로 간다.

| Unseen     | D, E, H, I                |
| ---------- | ------------------------- |
| **Fringe** | $ F_7^A $, $ C_4^B $      |
| **Tree**   | **A**, $B_2^A$, $ G_3^A $ |

<br /><br />

### 3. **G**에 연결된 정점을 찾는다.
<br />

**A** - Tree => 넘어간다

**B** - Tree => 넘어간다

**H** - Unseen => $H_3^G$를 Fringe에 넣는다.

**I** - Unseen => $I_1^G$를 Fringe에 넣는다.

​	Fringe 중에 가장 작은 $I_1^G$를 Tree에 넣는다.

| Unseen     | D, E                               |
| ---------- | ---------------------------------- |
| **Fringe** | $ F_7^A $, $ C_4^B $, $H_3^G$      |
| **Tree**   | **A**, $B_2^A$, $ G_3^A $, $I_1^G$ |

<br /><br />

### 4. **I**에 연결된 정점을 찾는다.
<br />

**E** - Unseen => $E_2^I$를 Fringe에 넣는다.

**F** - Fringe => $F_5^I$가 가중치가 더 작으므로 기존의 것과 교체된다.

**G** - Tree => 건너뛴다.

**H** - Fringe => $H_4^I$가 가중치가 더 크므로 건너뛴다.

​	**E**가 가중치가 가장 작으미 **E**를 Tree에 넣는다.

| Unseen     | D                                           |
| ---------- | ------------------------------------------- |
| **Fringe** | $ F_5^I $, $ C_4^B $, $H_3^G$               |
| **Tree**   | **A**, $B_2^A$, $ G_3^A $, $I_1^G$, $E_2^I$ |

<br /><br />

### 5. **E**에 연결된 정점을 찾는다.
<br />

**D** - Unseen => $D_1^E$를 Fringe에 넣는다.

**F** - Fringe => $F_6^E$가 가중치가 더 크므로 넘어간다.

**I** - Tree => 건너뛴다.

​	**D**를 Tree에 추가한다.

| Unseen     |                                                      |
| ---------- | ---------------------------------------------------- |
| **Fringe** | $ F_5^I $, $ C_4^B $, $H_3^G$                        |
| **Tree**   | **A**, $B_2^A$, $ G_3^A $, $I_1^G$, $E_2^I$, $D_1^E$ |

<br /><br />

### 6. **D**에 연결된 정점을 찾는다.
<br />

**C** - Fringe => $C_2^D$의 가중치가 더 작으므로 바꾼다.

**E** - Tree => 건너뛴다.

**H** - Fringe => $H_8^D$ 건너뛴다.

​	**C**를 Tree에 추가한다.

| Unseen     |                                                              |
| ---------- | ------------------------------------------------------------ |
| **Fringe** | $ F_5^I $, $H_3^G$                                           |
| **Tree**   | **A**, $B_2^A$, $ G_3^A $, $I_1^G$, $E_2^I$, $D_1^E$, $C_2^D$ |

<br /><br />

### 7. C에 연결된 정점을 찾는다.
<br />

**B** - Tree => 건너뛴다.

**D** - Tree => 건너뛴다.

**H** - Fringe => $H_2^C$ 더 작으므로 바꾼다.

​	**H**를 Tree에 추가한다.

| Fringe   | $ F_5^I $                                                    |
| -------- | ------------------------------------------------------------ |
| **Tree** | **A**, $B_2^A$, $ G_3^A $, $I_1^G$, $E_2^I$, $D_1^E$, $C_2^D$, $ H_2^C $ |

<br /><br />

### 8. H에 연결된 정점을 찾는다.
<br />

**C** - Tree => 건너뛴다.

**D** - Tree => 건너뛴다.

**G** - Tree => 건너뛴다.

**I** - Tree => 건너뛴다.

​	**F**를 Tree에 추가한다.

| Fringe   |                                                              |
| -------- | ------------------------------------------------------------ |
| **Tree** | **A**, $B_2^A$, $ G_3^A $, $I_1^G$, $E_2^I$, $D_1^E$, $C_2^D$, $ H_2^C $, $ F_5^I $ |

<br />

이렇게 완성된다.

![prim_after_graph](/prim_after_graph.png)











