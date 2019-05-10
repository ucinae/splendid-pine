---
title: 'Magenta 알아보기'
subtitle: 'Magenta.js 리액트에서 사용하기 위해 사용법 정리 중...'
date: 2019-04-04 12:18:00
author: 'hansol'
tags:
- magenta
- react
- test
---

# Magenta

<br />

## 설치 & 세팅

`npm i @magenta/music`으로 설치 후

`import * as mm from '@magenta/music';`으로 불러온다.

<br />

## 학습된 모델 불러오기

```javascript
const 뮤직모델 = new mm.MusicRNN('모델저장된url주소');
뮤직모델.initialize();
```

Magenta에는 몇가지 머신러닝 모델이 있는데 그 중 MusicRNN과 MusicVAE가 있다. 

**MusicRNN** : NoteSequence를 입력하면 입력 sequence와 같은 스타일로 연속된 sequence를 만들어준다.

**MusicVAE** : 두 개의 sequences를 보간해서 새로운 NoteSequence를 만든다.

<br />

## 모델 사용

<br />

### MusicRNN

MusicRNN의 `continueSequence` 메소드를 사용한다. 리턴 값으로 프로미스를 리턴한다.

```javascript
MusicRNN.continueSequence(
  	sequence:INoteSequence, steps:숫자, temperature?:숫자, chordProgression?:스트링[]
	) : Promise<INoteSequence>
```

```javascript
// 프로미스이므로 후처리
MusicRNN.continueSequence(시퀀스, 스탭, 온도)
	.then(r => r가지고 처리)
```

<br />

 #### 첫 번째 파라미터인 `INoteSequence` 만드는 법

`mm.sequences.quantizeNoteSequence`를 사용한다. 이러면 unquantized한 note도 quantized하게 바뀐다.

```javascript
quantizeNoteSequence(ns: INoteSequence, stepsPerQuarter: 숫자): NoteSequence
```

<br />

##### INoteSequence의 구조

```javascript
{
  	ticksPerQuarter: 숫자(220),
  	totalTime: 숫자(시드패턴길이/2),
    timeSignatures: [
      {
        time: 숫자(0),
        numerator: 숫자(4),
        denominator: 숫자(4)
      }  
    ],
    tempos: [
    	{
      	time: 숫자(0),
     		qpm: 숫자
      }
    ],
    notes: 노트배열
}
```

<br />

##### 노트배열의 구조

```javascript
// pitch는 음의 높이,종류
// startTime은 시작시간 endTime은 끝시간 둘 사이의 간격이 0.5 왜인지는 모르겠다. 1로 해도 되긴함
[
  { pitch: 숫자, startTime: 숫자, endTime: 숫자},
  { pitch: 숫자, startTime: 숫자, endTime: 숫자},
  { pitch: 숫자, startTime: 숫자, endTime: 숫자},
  ...
]
```

<br />

##### NoteSequence의 구조

```javascript
{
  controlChanges: [],
  keySignatures: [],
  notes: [], // 
  partInfos: [],
  pitchBends: [],
  quantizationInfo: { stepsPerQuater: 숫자},
  sectionAnnotations: [],
  tempos: [{ time: 숫자, qpm: 숫자 }],
  textAnnotations: [],
  ticksPerQuarter:숫자,
  timeSignatures: [{ time: 숫자, numerator: 숫자, denominator: 4 }],
  totalQuantizedSteps: 숫자,
  totalTime: 숫자
}
```

<br />

### unquantized와 quantized의 차이

**unquantized** - startTime과 endTime이 특정 숫자 간격(초)으로 정의된 notes,

```javascript
{
  notes: [
  	{ pitch: 60, startTime: 0.0, endTime: 0.5 },
	  //...
	],
  totalTime: 8
}
```

**quantized** - notes가 "steps"로 정의된 것. stepsPerQuarter로 한 quarter note당 steps를 몇 번 할지 정하면 됨.

```javascript
{
  notes: [
  	{ pitch: 36, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
  	//...
	],
	quantizationInfo: { stepsPerQuarter: 4 },
	tempos: [{ time: 0, qpm: 120 }],
  totalQuantizedSteps: 11
}
```

<br />

## continueSequence로 다음 sequence 만들기

```jsx
generateSequence = async () => {
    let cur_seq = this.state.results

    var predicted_sequence = await this.state.drumRNN.continueSequence(cur_seq, 16, 1).then(r => this.setState({ final: r }))
    console.log(predicted_sequence)
  }
```

일단 이런 식으로 하면 됨

<br />

## 문제

```jsx
  makeQuantizedNote = () => {
    const temp = mm.sequences.quantizeNoteSequence(
      {
        ticksPerQuarter: 220,
        totalTime: 8,
        timeSignatures: [
          {
            time: 0,
            numerator: 4,
            denominator: 4
          }
        ],
        tempos: [
          {
            time: 0,
            qpm: 120
          }
        ],
        notes: this.state.twinkle.notes
      },
      1
    )

    this.setState({
      results: temp
    })
  }

  generateMusic = () => {
    this.makeQuantizedNote()
    if(this.state.results) {
      console.log('empty')
    }
    console.log(this.state.results)
  }
```

이 상태에서 `generateMusic` 함수를 최초 실행하면 `this.state.results`에 { } 가 찍힌다. 근데 그 다음부터는 결과가 제대로 저장된다. 아마 함수가 끝나고 this.setState가 이뤄지는거 같다.



































































