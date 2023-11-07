---
emoji: 🕹️
title: 🕹️ [백준] 소가 길을 건너간 이유 3 - 14469 | Silver 4
date: '2023-11-07 10:00:00'
author: 추교현
tags: 그리디
categories: 🕹️PS
---

[백준] 소가 길을 건너간 이유 3 - 14469 | Silver 4.@

---

## 문제 요약

[문제 링크](https://www.acmicpc.net/problem/14469)

- 도착 시간과 검문 시간을 바탕으로 N마리의 소가 농장에 입장하는 최소 시간 구하라

## 정답 코드

```python
N = int(input())
cows = []
for _ in range(N):
  end, ch = map(int, input().split())
  cows.append((end, ch))

cows.sort() # [1]
t = 0

for cow in cows:
  end, ch = cow # [2]
  if t >= end:
    t += ch
  elif t < end:
    t = end + ch

print(t)
```

## 풀이 및 배운 점

헉 10분만에 풀었다...🎉 기분이 아주 좋네요 :) 크게 어렵지 않은 그리디 문제였습니다.

[1] `end`를 기준으로 오름차순 정렬한다.

[2] `end`와 `t`를 비교하여 업데이트를 해준다.

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
