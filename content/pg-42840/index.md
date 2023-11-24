---
emoji: 🕹️
title: 🕹️ [프로그래머스] 모의고사 - 42840 | Level 1
date: '2023-11-24 11:00:00'
author: 추교현
tags: 완전탐색
categories: 🕹️PS
---

[프로그래머스] 모의고사 - 42840 | Level 1.@

---

## 문제 요약

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/42840)

## 정답 코드

```python
def solution(answers):
    one_list = [1,2,3,4,5]
    two_list = [2,1,2,3,2,4,2,5]
    thr_list = [3,3,1,1,2,2,4,4,5,5]
    scores = [0, 0, 0]
    result = []

    for idx, answer in enumerate(answers):
        if answer == one_list[idx % len(one_list)]:
            score[0] += 1
        if answer == two_list[idx % len(two_list)]:
            score[1] += 1
        if answer == thr_list[idx % len(thr_list)]:
            score[2] += 1

    for idx, score in enumerate(scores):
        if score == max(scores):
            result.append(idx + 1)

    return result
```

## 풀이 및 배운 점

`one_list[idx % len(one_list)]` : 반복되는 패턴을 이런 식으로 해결할 수 있습니다.

`score == max(scores)` : 리스트인 scores에 max를 넣으면, 바로 최댓값을 리턴해 줍니다.

파이썬 풀이를 더 많이 보고 배우면 확실히 구현하는데, 시간이 많이 줄어들겠다는 생각이 듭니다.

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
