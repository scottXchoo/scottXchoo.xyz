---
emoji: 🕹️
title: 🕹️ [백준] 톱니바퀴 (2) - 15662 | Gold 5
date: '2023-11-21 10:30:00'
author: 추교현
tags: 구현 시뮬레이션
categories: 🕹️PS
---

[백준] 톱니바퀴 (2) - 15662 | Gold 5.@

---

## 문제 요약

[문제 링크](https://www.acmicpc.net/problem/15662)

- 8개의 톱니를 가진 톱니바퀴 T개가 일렬로 놓임
- 톱니는 N극 또는 S극 중 하나를 나타내며, 톱니바퀴를 총 K번 회전시키려고 함
- 회전은 시계 방향과 반시계 방향이 있음
- 톱니바퀴가 회전한 뒤, 옆에 있는 톱니바퀴의 서로 맞닿은 극이 다르면 톱니바퀴가 반대 방향으로 회전할 수 있음 (극이 같으면, 그대로)
- N극 : 0, S극 : 1 / 시계 방향 : 1, 반시계 방향 : -1
- 총 K번 회전시킨 이후에 12시 방향이 S극인 톱니바퀴의 개수를 구하라

## 정답 코드

```python
from collections import deque

T = int(input())
# [0, deque([...]), deque([...]) ... deque([...])]
gears = [0] + [deque(map(int, list(input()))) for _ in range(T)]
K = int(input())
turn = [list(map(int, input().split())) for _ in range(K)]

def solution(T, gears, K, turn):
  for t, direct in turn:
    turnElement = []
    # t 기준 오른쪽 기어
    for i in range(t+1, T+1):
      if gears[i][6] != gears[i-1][2]:
        turnElement.append(i)
      else:
        break
    # t 기준 왼쪽 기어
    for i in range(t-1, 0, -1):
      if gears[i][2] != gears[i+1][6]:
        turnElement.append(i)
      else:
        break
    # t 기어 회전
    gears[t].rotate(direct)
    # t 기어와 맞닿은 극이 다른 기어 회전
    for element in turnElement:
      gears[element].rotate(-direct if (element-t)%2 else direct)
  return sum(gears[i][0] for i in range(1, T+1))

ans = solution(T, gears, K, turn)
print(ans)
```

## 풀이 및 배운 점

저는 톱니바퀴가 한 번에 돈다고 생각하지 않고 맨 처음 톱니바퀴가 돈 다음에, 그 옆에 있는 톱니바퀴와 맞닿은 부분을 비교해서 돌지 말지 판단하는 식으로 생각했습니다. (순차적인 흐름)

그러니까 재귀 함수로 접근했고 풀이가 엄청나게 복잡했습니다.

그런데, 톱니바퀴는 한꺼번에 같이 회전을 하는 것이고 회전할지 말지는 정지된 상태에서 맞닿은 부분이 같은지 다른지만 판단해 주면 끝나는 문제였습니다. (동시에 회전)

이 문제 거의 3시간 정도 쓴 것 같은데, 문제를 명확하게 이해하지 못하니 빙빙 헤맸던 같습니다. 그래도 어떻게든 풀고자 끈질기게 붙잡으면서 생각하는 힘이 조금은 길러진 것 같습니다.

`gears = [0] + [deque(map(int, list(input()))) for _ in range(T)]` : index는 0부터인데, 문제에서는 1부터이기에 헷갈릴 수 있습니다. 이를 위해 [0]을 첫 원소로 넣으면 훨씬 편해지며 deque을 저런 식으로 list 대신 넣을 수 있습니다.

`deque의 rotate() 함수` :

```python
arr = deque([1, 2, 3, 4, 5])
arr.rotate(1) # arr = [5, 1, 2, 3, 4]
arr.rotate(-1) # arr = [2, 3, 4, 5, 1]
```

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
