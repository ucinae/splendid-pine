---
title: 'Pandas를 사용한 Data Exploration'
subtitle: '일단 데이터 살펴보기'
date: 2019-05-28 11:05:00
author: 'hansol'
tags:
- data mining
- python
- pandas
---

# Pandas Data Exploration 기본

# Data Exploration 기본

#  Basic

```python
import pandas as pd
```

pandas를 사용한 데이터 분석 초반 과정을 요약 정리 해두었다.

<br />



## csv 파일 읽기

```python
데이터프레임 = pd.read_csv('파일명.csv')
```



<br />

<br />



## 🔭 Pandas로 데이터 살펴보기

#### 데이터 프레임 알아보기

```python
데이터프레임.head(숫자) # 앞에서 숫자만큼 데이터 보기 default=5
데이터프레임.tail(숫자) # 뒤에서 숫자만큼 데이터 보기 default=5
데이터프레임.sample(숫자) # 랜덤으로 숫자만큼 데이터 보기 default=1
```

3가지 방법으로 데이터의 내용을 알아볼 수 있다. Series에서도 사용 가능하다.

<br />

```python
데이터프레임.index # 인덱스 확인
데이터프레임.columns # 칼럼명 확인
데이터프레임.values # 내용물 numpy 확인
```

데이터 프레임에서 인덱스, 칼럼, 값배열 부분을 따로 볼 수 있다. `index`와 `values`는 Series에서도 사용 가능하다.

<br />

```python
데이터프레임.shape # 데이터 모양
데이터프레임.info() # rows 개수, columns 이름, 타입 등등의 정보
데이터프레임.describe() # 데이터의 개략적인 분포(개수, 최소, 최대, 평균, 퍼센트)
```

데이터의 기본적인 통계량을 빠르게 알아 볼 수 있다. `shape`와 `describe()`는 Series에서도 사용 가능하다.

<br />

### Missing Data 확인하기

```python
total = 데이터프레임.isnull().sum().sort_values(ascending=False)
percent = (데이터프레임.isnull().sum() / 데이터프레임.isnull().count()).sort_values(ascending=False)
missing_data = pd.concat([total, percent], axis=1, keys=['Total', 'Percent'])
missing_data.head(20)
```

Missing Data 20위까지 출력하기

<br />

### 🔬 Columns 자세히

```python
데이터프레임['칼럼명'].value_counts()
```

`Series`의 `value_counts()` 메서드로 칼럼의 값과 개수를 알 수 있다.



<br />

<br />

### 데이터 살펴볼 때 정리할 것

1. **변수명** - 어떤 값들이 있는지 살펴보기
2. **타입** - 값 그 자체가 수치를 나타내는 'numerical' 데이터와 값이 카테고리를 구분하는 'categorical' 데이터로 구분 가능하다.
3. **칼럼 구분** - 연관된 성질이나 관련 깊은 칼럼끼리 관계시키기
4. **예측** - 칼럼들을 살펴보며 결과와 관련 깊은 정도를 생각해 보기
5. **결론** - 예측 칼럼 중 실제로 영향을 미치는 칼럼 결정 짓기
6. **기타 특이사항** - Null 값 빈도, 특이값 등등 기록해두기



<br />

## Skewness와 Kurtosis

#### Skewness

비대칭도, 왜도. 확률밀도함수에서 **음수**일 경우 왼쪽으로 긴 꼬리를 가지고 값들이 오른쪽으로 치우쳐 있는 형태를 가지고, **양수**일 경우 오른쪽 부분에 긴 꼬리를 가지고 왼쪽에 데이터가 많이 분포해 있다.

`시리즈.skew()`로 구할 수 있다.

<br />

#### Kurtosis

첨도. 뾰족한 정도. 클 수록 중앙이 뾰족하다.

`시리즈.kurt()`로 구할 수 있다.





## ⚗️ Pandas로 데이터 조작하기

#### 새로운 칼럼 생성

```python
데이터프레임['새칼럼명1'] = 0 # 모든 값이 0인 새 칼럼 생성
데이터프레임['새칼럼명2'] = 데이터프레임['기존칼럼명'] * 2 # 기존 칼럼을 이용해 새 칼럼 생성
```

<br />

#### 데이터 삭제

```python
# '칼럼명'의 column 삭제한 데이터 프레임을 return
새데이터프레임 = 데이터프레임.drop('칼럼명', axis=1)

# 원본의 칼럼 삭제
데이터프레임.drop('칼럼명', axis=1, inplace=True)

# 원본의 행 삭제
데이터프레임.drop([0, 1, 2], axis=0, inplace=True) # 0, 1, 2행 삭제
```

