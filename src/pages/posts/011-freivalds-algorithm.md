---
title: 'Freivalds Algorithm'
subtitle: '행렬곱을 빠르게~'
date: 2019-04-29 09:21:00
author: 'hansol'
tags:
- algorithm
- freivalds algorithm
- randomized algorithm
---

# Freivalds' Algorithm

> n x n 행렬 A, B, C가 주어졌을 때 A x B = C 를 만족하는지 확률적으로 확인하는 알고리즘

<br />

### 그냥 푼다면...

직관적으로 `A x B = C`를 만족하는지 확인하려면 A와 B를 직접 곱하고 C와 같은지 확인하면 된다.

A, B, C를 100x100 행렬이라고 가정하고 C++로 곱해서 확인하면

```cpp
int A[100][100];
int B[100][100];
int C[100][100];

bool isSame = true;

for (int i=0; i < 100; i++) {
  for (int j=0; j < 100; j++) {
    int AB = 0;
    for (int k=0; k < 100; k++)
      AB += A[i][k] * B[k][j];
    if (AB != C[i][k]) {
      isSame = false;
      break;
    }
  }
  if(!isSame)
    break;
}

if(isSame)
  cout << "AxB == C" << endl;
else
  cout << "AxB != C" << endl;
```

위와 같은 방법으로 확인할 수 있을 것이다.

행렬의 사이즈가 n x n 이라면  $O(n^3)$의 시간복잡도를 가지게된다. 행렬의 크기가 커지면 상당히 많은 연산을 하게된다. 가장 많은 연산이 필요한 부분이 행렬곱 연산인데 행렬곱 연산을 개선한 [슈트라센 알고리즘](https://en.wikipedia.org/wiki/Strassen_algorithm) 도 대략 $O(n^{2.807})$의 시간이 소요되고, [코퍼스미스-위노그라드 알고리즘](https://en.wikipedia.org/wiki/Coppersmith–Winograd_algorithm)도 가장 개선한게 $O(n^{2.3728639})$라고 한다.

------

<br />

### Freivalds' algorithm을 사용한다면

프리발즈 알고리즘은 시간 복잡도를 높은 확률의 $O(n^2)$으로 줄이기 위해서 무작위 추출을 사용한다. 수학에서 높은 확률은 n이 무한대로 갈수록 1에 근접한다는 의미이다.  여기서 $O(kn^2)$ 만큼의 시간으로 알고리즘 실패 확률을 $2^{-k}$보다 작게 할 수 있다.

<br />

### Freivalds' algorithm

그럼 알고리즘이 어떻게 진행되는지 살펴보자.

<br />

#### 입력 

​	n x n 크기의 행렬 $A$, $B$, $C$

<br />

#### 출력

​	$A \times B = C$가 참이면 true, 아니면 false

<br />

#### 진행과정

1. 0아니면 1로 구성된 n x 1 크기의  랜덤 벡터 **r**을 만든다.
2. $A \times (B \times r) = C \times r$인지 확인한다. 다르면 `return false;`고 같으면 `return true;`이다.

위의 두 과정을 k번 반복하면 알고리즘이 실패 확률이 $\frac{1}{2^k}$ 이하가 되는 알고리즘이 된다.

<br />

#### 에러가 나는 경우

$$
A \times B = C \Longrightarrow A \times (B \times r) = C \times r
$$

우선 행렬은 결합 법칙이 성립하기 때문에 위와 같은 명제는 항상 참이다. 따라서 이를 대우한 아래 식도 참이된다.
$$
A \times (B \times r) \ne C \times r \Longrightarrow A \times B \ne C
$$
따라서 프리발즈 알고리즘이 `false`를 리턴한다면 $A \times B \ne C$인 건 확실하게 알 수 있다.

문제는 `true`를 리턴하는 경우인데 이 경우에도 $A \times B \ne C$일 가능성이 있다. 즉, $A \times B$와 $C$가 다른데 $A \times (B \times r) = C \times r$인 경우이다. 우변을 좌변으로 넘기고 분배 법칙이 성립하므로 묶어주면 $(AB - C)r = O$을 만족해야 한다. $AB-C$는 영행렬이 아니므로 $r$이 0이 아닌 부분을 0으로 만들어 주어야한다. 즉, $AB-C$의 0이 아닌 원소가 $r$에 곱해질때 $r$이 0이여야하고 $r$은 0 아니면 1이므로 $\frac{1}{2}$의 확률이고 $n$이 1 이상이므로 최종적인 확률은 $\frac{1}{2}$ 이하일 것이다. 따라서 $k$번 반복한다면 $\frac{1}{2^k}$보다 작아질 것이다. (이 부분이 정확한진 모르겠는데 최대한 이해한 수준에서 작성하였다.)

<br /><br />

### 📡 구현

A, B, C 배열 크기가 100x100 보다 작다고 가정하고 C++로 구현해 보았다.

```cpp
#include <cstdlib>
#include <ctime>

int n, m, k; // n*m 크기의 C 행렬, k*k 크기의 A, B 행렬
int A[100][100];
int B[100][100];
int C[100][100];

int r[100];

int Br[100];
int ABr[100];
int Cr[100];

// 0이나 1로 구성된 크기 k짜리 랜덤 배열을 생성
void generate_r() {
	srand((unsigned int)time(NULL));
	for (int i = 0; i < k; i++) {
		e[i] = rand() % 2;
	}
}

// A(Br) == Cr 인지 확인
bool freivalds() {
	// Br 계산
	for (int i = 0; i < k; i++) {
		int dot = 0;
		for (int j = 0; j < k; j++)
			dot += B[r + i][c + j] * r[j];
		Br[i] = dot;
	}

	// ABr 계산
	for (int i = 0; i < k; i++) {
		int dot = 0;
		for (int j = 0; j < k; j++)
			dot += A[i][j] * Br[j];
		ABr[i] = dot;
	}

	// Cr 계산
	for (int i = 0; i < k; i++) {
		int dot = 0;
		for (int j = 0; j < k; j++)
			dot += C[i][j] * r[j];
		Cr[i] = dot;
	}

	// ABr == Cr 인지 확인
	for (int i = 0; i < k; i++)
		if (ABr[i] != Cr[i])
			return false;
	return true;
}
```

이제 `freivalds`를 여러번 반복해서 확인해보면 된다.