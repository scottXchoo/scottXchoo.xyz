---
emoji: 🕹️
title: 🕹️ [백준] 뱀 - 3190 | Gold 4
date: '2023-11-17 17:30:00'
author: 추교현
tags: 구현 시뮬레이션
categories: 🕹️PS
---

[백준] 뱀 - 3190 | Gold 4.@

---

## 문제 요약

[문제 링크](https://www.acmicpc.net/problem/3190)

- 사과를 먹으면 뱀 길이가 늘어난다.
- 벽 또는 자기자신의 몸과 부딪히면 게임이 끝난다.
- 뱀의 처음 길이는 1이고 오른쪽을 향한다.
- 몸길이를 늘릴 때, 머리를 다음 칸에 위치시킨다.
- 이동한 칸에 사과가 있다면, 그 칸에 있던 사과는 없어지고 꼬리는 움직이지 X
- 이 게임이 몇 초안에 끝나는지 계산하라

## 정답 코드

```python
from collections import deque

N = int(input())
K = int(input())
graph = [[0] * N for _ in range(N)]
for _ in range(K):
  row, col = map(int, input().split())
  graph[row - 1][col - 1] = 2

L = int(input())
dirDict = dict()
for _ in range(L):
  x, c = input().split()
  dirDict[int(x)] = c

x, y = 0, 0
graph[x][y] = 1
dx, dy = [0, 1, 0, -1], [1, 0, -1, 0]
cnt, direct = 0, 0
dq = deque()
dq.append((0, 0))

def turn(c):
  global direct
  if c == 'L': # direct -1 => 3
    direct = (direct - 1) % 4
  else:
    direct = (direct + 1) % 4

while True:
  cnt += 1
  x += dx[direct]
  y += dy[direct]
  if not(0 <= x < N and 0 <= y < N):
    break

  if graph[x][y] == 2:
    graph[x][y] = 1
    dq.append((x, y))
    if cnt in dirDict:
      turn(dirDict[cnt])

  elif graph[x][y] == 0:
    graph[x][y] = 1
    dq.append((x, y)) # deque을 하나의 뱀으로 생각한다면,
    tx, ty = dq.popleft() # 맨 마지막 요소를 꺼내는 것 = 뱀의 꼬리를 자르는 것
    graph[tx][ty] = 0
    if cnt in dirDict:
      turn(dirDict[cnt])

  else:
    break

print(cnt)
```

## 풀이 및 배운 점

이 문제는 "삼성 SW 역량테스트 기출문제"입니다. 확실히 호흡이 길고 빡센 구현 문제인데, 진짜 참신하고 재밌네요 :) 이 문제를 통해 배운 점이 많습니다.

1. `graph[row - 1][col - 1] = 2` : 행과 열은 -1씩 빼줘야 된다.
2. `dirDict[int(x)] = c` : 딕셔너리를 통해 키와 벨류로 저장할 수 있다. dirDict는 키의 집합이며 dirDict[key]는 value가 나온다.
3. `def turn()` : -1을 4로 나누면, 나머지는 3이다.
4. `tx, ty = dq.popleft()` : deque을 하나의 뱀으로 생각하면, 뱀의 꼬리를 자르는 것은 deque의 맨 마지막 요소를 꺼내는 것이다.

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
