---
emoji: 🕹️
title: 🕹️ [백준] 감시 - 15683 | Gold 4 (파이썬)
date: '2023-11-30 11:30:00'
author: 추교현
tags: 구현 시뮬레이션
categories: 🕹️PS
---

[백준] 감시 - 15683 | Gold 4.@

---

## 문제 요약

[문제 링크](https://www.acmicpc.net/problem/15683)

- CCTV가 감시할 수 있는 방법
  - 1번 : 한 쪽 방향만 감시
  - 2번 : 감시하는 두 방향이 서로 반대방향
  - 3번 : 감시하는 두 방향이 직각 방향
  - 4번 : 세 방향으로 감시
  - 5번 : 네 방향으로 감시
- 회전은 항상 90도 방향으로 함
- 0은 빈 칸, 6은 벽, 1~5는 CCTV 번호
- 사각 지대의 최소 크기를 구하라.

## 정답 코드

```python
import copy

N, M = map(int, input().split())
cctv, maps = [], []
modes = [[], [[0], [1], [2], [3]], [[0, 2], [1, 3]],
         [[0, 1], [1, 2], [2, 3], [0, 3]],
         [[0, 1, 2], [0, 1, 3], [1, 2, 3], [0, 2, 3]], [[0, 1, 2, 3]]]
# 북 동 남 서
dx = [-1, 0, 1, 0]
dy = [0, 1, 0, -1]

for i in range(N):
  data = list(map(int, input().split()))
  maps.append(data)
  for j in range(M):
    if data[j] in [1, 2, 3, 4, 5]:
      cctv.append([data[j], i, j])


def fill(maps, mode, x, y):
  for m in mode:  # Ex) m : 0, 2
    nx, ny = x, y # nx, ny는 x, y를 기준으로 변화해야 되기 때문에 while문 안에 X
    while True:
      nx += dx[m]
      ny += dy[m]
      if not (0 <= nx < N and 0 <= ny < M):
        break
      if maps[nx][ny] == 6:
        break
      if maps[nx][ny] == 0:
        maps[nx][ny] = -1


def dfs(depth, maps):
  global ans
  if depth == len(cctv):
    cnt = 0
    for i in range(N):
      cnt += maps[i].count(0)
    ans = min(ans, cnt)
    return

  temp = copy.deepcopy(maps)
  cctv_num, x, y = cctv[depth]
  for mode in modes[cctv_num]:  # Ex) mode : [0, 2], [1, 3]
    fill(temp, mode, x, y)
    dfs(depth + 1, temp)
    temp = copy.deepcopy(maps)


ans = int(1e9)
dfs(0, maps)
print(ans)
```

## 풀이 및 배운 점

이 문제 진짜 좋은 것 같습니다... 자주 복습해야겠어요 :)

`if data[j] in [1, 2, 3, 4, 5]:` : 저는 `!=0`, `!=6` 이런 식으로 cctv 위치를 찾았는데, 이렇게 할 수도 있다는 것을 배웠습니다.

```python
nx, ny = x, y
while True:
	nx += dx[m]
	ny += dy[m]
```

한 쪽 방향으로 계속 탐색하는 방법에 대해서 배웠습니다. x, y를 기준으로 벽 혹은 맵을 벗어날 때까지 계속해서 변화(`dx`, `dy`)를 줘 증가시킬 수 있습니다.

백트래킹을 이용하는 방법도 잘 나와 있습니다!

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
