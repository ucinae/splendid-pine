---
title: 'Apriori algorithm'
subtitle: '맥주를 산 사람은 기저귀도 산다?!'
date: 2019-05-07 09:14:00
author: 'hansol'
tags:
- algorithm
- apriori algorithm
---

# Apriori algorithm



### :green_book: 사전 지식

Apriori algorithm을 알기전에 **연관 규칙 분석(Association Rule)**을 알 필요가 있다. 연관 규칙 분석은 데이터 셋에서 빈번하게 발생하는 아이템 셋을 통해 연관 관계를 알아내는 알고리즘이다. 간단히 X가 일어나면 Y가 일어난다고 추론하는 분석이다. 예를 들어, transaction data에서 씨리얼을 산 사람들이 우유도 같이 많이 샀다면 어느 사람이 씨리얼을 살 경우 우유도 살 가능성이 높다고 추론하는 식이다.

연관 규칙 분석의 분석을 하는데 사용되는 개념을 정리해보면

#### Antecedent(조건절)

"씨리얼을 산다면 우유도 산다"에서 "씨리얼을 산다면"에 해당하는 부분이다.

#### Consequent(결과절)

"씨리얼을 산다면 우유도 산다"에서 "우유도 산다"에 해당하는 부분이다.

#### Itemset(아이템셋)

antecedent와 consequent 상황 발생에 들어있는 아이템 집합이다.

"씨리얼을 산다면 우유도 산다"의 itemset은 antecedent의 `{씨리얼}`셋과 consequent의 `{우유}` 셋이다.

여기서 antecedent의 itemset과 consequent의 itemset에 겹치는게 있으면 안된다.(교집합이 없어야 한다.)

#### support(지지도)

$X \Rightarrow Y$이고, $X, Y$가 itemset일 때, 전체 데이터 중에 $X, Y$를 동시에 포함하는 데이터의 수이다.

#### Confidence(신뢰도)

$X \Rightarrow Y$이고, $X, Y$가 itemset일 때, $X$를 포함하는 데이터 중에 $X, Y$를 동시에 포함하는 데이터의 수이다.

-------



### :cloud_with_rain: 필요성

그렇다면 빈번하게 발생하는 아이템셋을 어떻게 찾을 것인가가 문제가 된다. 발생하는 아이템들의 모든 부분 집합을 다 구해야 되는데 그러면 복잡도가 너무 커져서 사용할 수가 없다. 그래서 효율적으로 의미있는 서브셋들을 구하는 알고리즘이 필요한데 그것이 바로 **Apriori algorithm**이다.



### :rainbow: 원리

알고리즘에 대해 알기전에 원리부터 알아보면 **apriori principle**이란 어느 itemset이 빈번하게 발생한다면 그 itemset의 모든 subset들은 반드시 빈번하게 발생해야 한다는 원리이다. 이를 수식으로 써본다면
$$
\forall X, Y : (X \subseteq Y) \Rightarrow support(X) \ge support(Y)
$$
이 식을 다시 말로 설명하면 "모든 itemset X, Y에 대해서 X가 Y에 포함된다면 (부분집합이라면) X의 support는 Y의 support보다 크거나 같다."가 된다.



## Apriori algorithm

그럼 이제 알고리즘 과정을 살펴보자.

apriori algorithm은 두 단계로 구성된다.

1. **Join 단계**

   ​	join 단계에서는 현재 아이템셋으로 생성될 수 있는 크기 1 증가한 아이템셋을 join으로 만든다.

2. **Prune 단계**

   ​	join 단계에서 만들어진 아이템셋들 중 크기 하나 작은 모든 서브셋이 빈번하지 않다면 쳐낸다.

글로 적어보니 이해하기 힘든데 Pseudo-code로 살펴보면

#### Apriori algorithm Pseudo-code

$C_k$ : 크기 k짜리 가능성 있는 아이템셋

$L_k$ : 크기 k짜리 최소 지지도를 넘는 아이템셋

$L_1$ = {아이템 하나짜리 서브셋들}

**for**(k = 1; $L_k$ != $\oslash$; k++)

​	$C_{k+1}$ = $L_k$로부터 join 과정으로 만들기

​	모든 $C_{k+1}$의 $support$구하기

​	$L_{k+1}$ = $C_{k+1}$ 중 최소 지지도 넘는 서브셋만 $L_{k+1}$에 추가

**end**

**return** 모든 $L$;



마지막으로 예시 하나를 들어 설명 해보면 개발자의 기술 스택을 담은 데이터가 있다고 가정해보자. 그리고 연관 분석을 통해 어느 언어를 알면 어느 언어도 알지(상관이 있을지 모르겠지만) 분석해보자.

| id   | stack                 |
| ---- | --------------------- |
| 1    | c++, java, javascript |
| 2    | python, java, go      |
| 3    | c++, python, java, go |
| 4    | python, go            |

최소 지지도를 2로 가정하고 apriori algorithm을 시작해서 처음  $C_1$을 만들면

| itemset        | support |
| -------------- | ------- |
| { c++ }        | 2       |
| { python }     | 3       |
| { java }       | 3       |
| { javascript } | 1       |
| { go }         | 3       |

여기서 javascript를 사용하는 사람은 1명이므로 최소지지도에 걸려 prune된다. 그럼 $L_1$에는 javascript를 제외한 4 아이템셋만 남고 join 단계를 거치면 아래와 같이 구해진다.

| itemset          | support |
| ---------------- | ------- |
| { c++, python }  | 1       |
| { c++, java }    | 2       |
| { c++, go }      | 1       |
| { python, java } | 2       |
| { python, go }   | 3       |
| { java, go }     | 2       |

prune으로 {c++, python}과 {c++, go}를 쳐낸뒤 다음으로 join을 하면 결과는 다음과 같다.

| itemset              | support |
| -------------------- | ------- |
| { python, java, go } | 2       |

이렇게 Apriori algorithm으로 빈발 항복 집합을 구한 뒤에 이를 이용해 **연관 규칙 분석**을 하면 된다.



































