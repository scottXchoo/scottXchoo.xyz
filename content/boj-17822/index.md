---
emoji: 🕹️
title: 🕹️ [백준] 원판 돌리기 - 17822 | Gold 2
date: '2023-12-01 10:30:00'
author: 추교현
tags: 구현 시뮬레이션
categories: 🕹️PS
---

[백준] 원판 돌리기 - 17822 | Gold 2.@

---

## 문제 요약

[문제 링크](https://www.acmicpc.net/problem/17822)

- 원판의 반지름이 i이면, 그 원판을 i번째 원판이라고 한다.
- 각각의 원판에는 M개의 정수가 적혀있고, i번째 원판에 적힌 j번째 수의 위치는 (i, j)로 표현한다.
- 원판의 회전은 독립적으로 이루어진다.
- T번 회전할 예정
  - i번째 회전할 때, 사용하는 변수는 xi, di, ki
  - 번호가 xi의 배수인 원판을 di방향으로 ki칸 회전시킨다.
  - di가 0인 경우는 시계 방향, 1인 경우는 반시계 방향
  - 원판에 수가 남아 있으면, 인접하면서 수가 같은 것을 모두 찾는다.
    - 그러한 수가 있으면, 원판에서 인접하면서 같은 수를 모두 지운다.
    - 그러한 수가 없다면, 원판에 적힌 수의 평균을 구하고, 평균보다 큰 수는 1을 빼고, 평균보다 작은 수는 1을 더한다.
- 원판에 적힌 수의 합을 구하라.

## 정답 코드

```python
from collections import deque

N, M, T = map(int, input().split())
dx, dy = [0, 0, 1, -1], [1, -1, 0, 0]
graph = []
for _ in range(N):
  graph.append(list(map(int, input().split())))

def rotate(x, d, k):
  dq = deque()
  dq.extend(graph[x])
  if d == 0: # 시계방향
    dq.rotate(k)
  else:
    dq.rotate(-k)
  graph[x] = list(dq)

def change_avg():
  avg_cnt, all_sum = 0, 0
  for i in range(N):
    for j in range(M):
      if graph[i][j] != 0:
        avg_cnt += 1
        all_sum += graph[i][j]
  if avg_cnt == 0:
    return False
  avg = all_sum / avg_cnt
  for i in range(N):
    for j in range(M):
      if graph[i][j] != 0:
        if graph[i][j] > avg:
          graph[i][j] -= 1
        elif graph[i][j] < avg:
          graph[i][j] += 1
  return True

def solve(x, y):
  dq = deque()
  dq.append((x, y))
  visited[x][y] = 1
  value = graph[x][y]
  graph[x][y] = 0
  cnt = 0
  while dq:
    x, y = dq.popleft()
    for i in range(4):
      nx, ny = x + dx[i], y + dy[i]
      if not (0 <= ny < M):
        if y == 0:
          ny = M-1
        elif y == M-1:
          ny = 0
      if not (0 <= nx < N and 0 <= ny < M) or visited[nx][ny]:
        continue
      if graph[nx][ny] == value:
        cnt += 1
        graph[nx][ny] = 0
        dq.append((nx, ny))
        visited[nx][ny] = 1
  if cnt == 0:
    graph[x][y] = value
  return cnt

for _ in range(T):
  x, d, k = map(int, input().split())
  check_sum = 0
  for i in range(N):
    check_sum += sum(graph[i])
    if (i+1) % x == 0:
      rotate(i, d, k)
  if check_sum == 0:
    break
  else:
    visited = [[0] * M for _ in range(N)]
    cnt = 0
    for i in range(N):
      for j in range(M):
        if not visited[i][j] and graph[i][j] != 0:
          cnt += solve(i, j)
    if cnt == 0:
      change_avg()

ans = 0
for i in range(N):
  ans += sum(graph[i])

print(ans)
```

## 풀이 및 배운 점

`if (i+1) % x == 0:` : x의 배수인 원판을 회전시키기 위해서 이런 조건을 넣습니다.

`def rotate()` : `deque`을 만들어서 d의 값에 따라 시계방향 혹은 반시계 방향으로 k 만큼 `rotate()` 합니다.

`def solve()` : BFS로 탐색하여 만약 인접하다면, 값을 지워주는 함수를 만듭니다. 이때, 원판이기 때문에 ny가 0과 M에서 벗어났을 때의 조건을 추가합니다.

만약 solve()로 cnt가 0이 나온다면, `change_avg()`를 통해 평균을 구하고 그 평균을 기준으로 +/- 1씩 업데이트합니다.

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
