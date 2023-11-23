---
emoji: 🕹️
title: 🕹️ [프로그래머스] 성격 유형 검사하기 - 118666 | Level 1
date: '2023-11-23 15:00:00'
author: 추교현
tags: 해시
categories: 🕹️PS
---

[프로그래머스] 성격 유형 검사하기 - 118666 | Level 1 & 2022 카카오 인턴십 기출문제@

---

## 문제 요약

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/118666)

## 정답 코드

```python
def solution(survey, choices):
    answer = ""
    dict = {"R": 0, "T": 0, "C": 0, "F": 0, "J": 0, "M": 0, "A": 0, "N": 0}

    for i in range(len(survey)):
        if choices[i] > 4:
            dict[survey[i][1]] += choices[i] - 4
        elif choices[i] < 4:
            dict[survey[i][0]] += 4 - choices[i]

    answer += "R" if dict["R"] >= dict["T"] else "T"
    answer += "C" if dict["C"] >= dict["F"] else "F"
    answer += "J" if dict["J"] >= dict["M"] else "M"
    answer += "A" if dict["A"] >= dict["N"] else "N"

    return answer
```

## 풀이 및 배운 점

기가 막힙니다... 저의 더럽고 긴 코드가 더 명확하고 짧은 코드로 바뀌는 모습이 경이롭네요.

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
