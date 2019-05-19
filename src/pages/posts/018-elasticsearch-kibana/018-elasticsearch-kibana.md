---
title: 'Elasticsearch + Kibana로 데이터 분석하기'
subtitle: 'Elasticsearch, Kibana'
date: 2019-05-19 10:15:00
author: 'hansol'
tags:
- Elasticsearch
- Kibana
- data science
---

# Elasticsearch + Kibana로 데이터 분석하기

> Elasticsearch,  Kibana를 활용해 데이터 분석을 해보자.

<br />

## 1. 설치

[Elasticsearch](https://www.elastic.co/kr/) 홈페이지에서 모든 제품을 설치할 수 있다. 다운로드 받고 적절한 위치에 압축을 풀면 된다.

<br />

## 2. 데이터 다운로드

[DATA.GOV](https://www.data.gov/)에서 관심가는 데이터를 찾다가 [NCHS-Leading Causes of Death: United States](https://catalog.data.gov/dataset/age-adjusted-death-rates-for-the-top-10-leading-causes-of-death-united-states-2013)(미국 사망원인 데이터)를 csv 파일로 다운받았다.

<br />

## 3. 설정

### Elasticsearch

`config/elasticsearch.yaml` 파일을 수정한다. 수정 안하고 실행해도 가능한데 간단히 Cluster, Node, Paths 관련 설정만 바꿔주었다.

```yaml
# ---------------------------------- Cluster -----------------------------------
#
# cluster의 이름을 지정해준다:
cluster.name: data-cluster
#
# ------------------------------------ Node ------------------------------------
#
# node의 이름을 지정해준다:
node.name: node-1
#
# ----------------------------------- Paths ------------------------------------
#
# 데이터가 저장될 경로를 설정해준다:
path.data: ../path/to/causes_of_death/data
#
# 로그파일 저장될 경로를 설정한다:
path.logs: ../path/to/causes_of_death/logs
```

### Kibana

따로 설정을 해주지 않았다.

<br />

## 4. 실행

`elasticsearch`를 압축 푼 폴더에 가서 `bin/elasticsearch`로 실행시칸다.

`kibana`를 압축 푼 폴더에 가서  `bin/kibana`로 실행시킨다.

그리고 `localhost:5601`로 들어가면 된다.

<br />

## 5. 파일 import

100MB 이하의 파일은 Kibana로도 import 할 수 있어서 Kibana의 import 기능을 사용하였다. 만약 데이터 사이즈가 크다면 Logstash나 Beats를 이용해서 넣으면 된다.

데이터 import 는 Machine Learning 탭의 Import data로 들어가서 import 하면 된다. import 하고 칼럼의 이름을 변경시켜 주었다.

![import-csv](/csv-import.png)

그리고 인덱스는 `year`로 설정했다.

<br />

## 6. Discover

이제 discover 탭에서 쿼리를 날려서 데이터를 확인해 볼 수 있다. `KQL`라는 키바나 쿼리 언어를 사용하면 된다.

![kql](/kql.png)

이렇게 설정하면 2012년에 암으로 죽은 데이터만 필터링한다.

<br />

## 7. Visualize

간단한 Bar Chart를 그려보면

![Bar Chart](/barchart-setting.png)

Y 축으로 죽은 사람 수 합을 지정하고 X 축에 죽음 원인을 지정한 뒤  모든 이유는 Exclude 해주었다.

![barchart-result](/barchart-result.png)

이런 식으로 결과가 잘 나온다. 심장병과 암이 1, 2위를 하는걸 확인할 수 있다.

Pie Graph도 가능하고 그밖에도 다양한 그래프들이 많다.

![piegraph](/pie-graph.png)

<br />

## 8. 기타

그 밖에도 정말 다양한 기능들이 많은데 이러한 기능들로 Elasticsearch를 검색 엔진을 뛰어 넘어 정말 다양하게 활용할 수 있을 것 같다.



