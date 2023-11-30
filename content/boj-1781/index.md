---
emoji: 🕹️
title: 🕹️ [백준] 컵라면 - 1781 | Gold 2 (파이썬)
date: '2023-11-06 18:00:00'
author: 추교현
tags: 그리디
categories: 🕹️PS
---

[백준] 컵라면 - 1781 | Gold 2.@

---

## 문제 요약

[문제 링크](https://www.acmicpc.net/problem/1781)

- 데드라인, 컵라면 수를 입력으로 받는다.
- 데드라인 내에 받을 수 있는 컵라면 수를 구한다.
- 전형적인 그리디 문제 ([순회강연](https://scottxchoo.xyz/boj-2109/))

## 정답 코드

```python
from heapq import heappop, heappush

N = int(input())
pbs = []
for _ in range(N):
  dl, num = map(int, input().split())
  pbs.append((dl, num))

pbs.sort() # [1]
q = []

for pb in pbs:
  dl, num = pb
  heappush(q, num)

  if len(q) > dl: # [2]
    heappop(q)

print(sum(q))
```

## 풀이 및 배운 점

[1] 데드라인(`dl`)을 기준으로 오름차순 정렬한다.

[2] `q`의 크기보다 `dl`이 작다면, 데드라인 내에 풀지 못하는 문제가 있다는 것이기에 받을 수 있는 가장 작은 컵라면 수(`num`)를 빼낸다.

## 파이썬 문법

```python
from heapq import heappop, heappush

heap = [4, 1, 7, 3, 8, 5]
heappop(heap) # 가장 작은 값(index = 0)을 제거
```

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
