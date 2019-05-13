---
title: 'Windows에서 Kafka 사용기'
subtitle: 'Hackday를 준비하며'
date: 2019-05-13 10:43:00
author: 'hansol'
tags:
- kafka
- apache
---

# Kafka 사용기

카프카를 사용해야할 일이 생겨서 카프카 공부를 시작했다. 생소한 부분이 많았지만 제대로만 쓸줄 안다면 정말 많은 일을 할 수 있을 것 같았다.

카프카의 개념을 이해하기 위해 여러 블로그의 도움을 많이 받았다.

[Kafka 이해하기](https://medium.com/@umanking/카프카에-대해서-이야기-하기전에-먼저-data에-대해서-이야기해보자-d2e3ca2f3c2)

[Apache Kafka(아파치 카프카) Intro](https://zzsza.github.io/data/2018/06/15/apache-kafka-intro/)

[[Kafka, 카프카] 아파치 카프카(Apache Kafka) 아키텍처 및 동작방식, 파티션 읽기 쓰기](https://engkimbs.tistory.com/691)

[Kafka 운영자가 말하는 처음 접하는 Kafka](https://www.popit.kr/kafka-운영자가-말하는-처음-접하는-kafka/)


<br/>
<br/>


## 공식 Quickstart 윈도우에서 따라하기

<br/>

#### 1단계: 설치

[Download](https://www.apache.org/dyn/closer.cgi?path=/kafka/2.2.0/kafka_2.12-2.2.0.tgz) 여기서 다운로드 받고 `kafka_2.xx-x.x.x.tgz` 파일을 원하는 위치에서 압축 풀면 설치가 끝난다.

<br />

#### 2단계: 서버 시작시키기

Kafka를 실행시키기 위해서 먼저 Zookeeper도 실행 시켜야한다. 일단은 Kafka에 들어있는 Zookeeper를 실행 시켰다.

**Zookeeper 서버 실행시키기**

![zookeeper-server-start](/zookeeper-server-start.png)

그러면 실행이된다.

![zookeeper-server](/zookeeper-server.png)

<br/>

**Kafka 서버 실행시키기**

![kafka-server-start](/kafka-server-start.png)

<br />
<br/>


#### 4단계: Topic 만들기

<br/>

![make-topic](/make-topic.png)

**만든 Topic list 보기**

![make-topic-result](/make-topic-result.png)

<br/>

#### 5, 6단계: Producer로 메시지 보내고 Consumer로 받기

console-producer 실행

![producer](/console-producer.png)

console-consumer 실행

![consumer](/console-consumer.png)

<br />
<br/>

**결과**

위쪽이 consumer이고 아래가 procducer다.

![consumer-producer](https://media.giphy.com/media/WTLcpQeGg20oeze2VK/giphy.gif)

<br/>
<br/>

## Node.js와 연결시키기

Node.js를 사용하여 Kafka를 사용해볼 예정이기에 간단한 예제를 진행해 보았다.

Node.js로 Producer도 만들수 있고 Consumer도 만들 수 있는데  `kafka-node`를 사용해서 Consumer를 만들어 보았다.

우선 `config.js`로 topic 이름과 server 주소를 저장해둔다.

```javascript
module.exports = {
  kafka_topic: 'test',
  kafka_server: 'localhost:2181',
}
```

그리고 Consumer를 만든다. Consumer의 생성자에 (client, payloads, options) 3가지 파라미터가 들어간다. `client`는 Kafka server에 연결시키는 부분이고, `payloads`는 배열로, topic 이름을 가지고 있는다. `options`에는 여러 설정이 있는데 자세한건 [Consumer](https://github.com/SOHU-Co/kafka-node/#consumer) 여기에 나와있다.

```javascript
const kafka = require('kafka-node');
const config = require('./config');

try {
  const Consumer = kafka.Consumer;
  const client = new kafka.KafkaClient(config.kafka_server);
  let consumer = new Consumer(
    client,
    [{ topic: config.kafka_topic, partition: 0 }],
    {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf8',
      fromOffset:false
    }
  );
  consumer.on('message', async function(message) {
    console.log(
      '새로운 메시지 -> ',
      message.value
    );
  })
  consumer.on('error', function(err) {
    console.log('error', err);
  })
}catch(e) {
  console.log(e);
}
```

이제 노드로 실행시키면 console-producer가 만들어낸 메시지를 node-consumer가 읽어 console.log로 찍어내는걸 볼 수 있다.

![node-condole](https://media.giphy.com/media/hQdZXzQqOs8SIp1Oag/giphy.gif)





## 추가로 알아볼것

`bin/windows/zookeeper-server-start.bat` 백그라운드 실행법 (-daemon)

이제 이걸로 어떻게 만들것인지...