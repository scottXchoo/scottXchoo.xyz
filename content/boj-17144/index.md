---
emoji: 🕹️
title: 🕹️ [백준] 미세먼지 안녕! - 17144 | Gold 4
date: '2023-11-13 09:30:00'
author: 추교현
tags: 구현
categories: 🕹️PS
---

[백준] 미세먼지 안녕! - 17144 | Gold 4.@

---

## 문제 요약

[문제 링크](https://www.acmicpc.net/problem/17144)

- RxC인 격자판에 공기청정기는 항상 1번 열에 설치되어 있고, 크기는 두 행을 차지한다.
- 공기청정기가 설치되어 있지 않은 칸에는 미세먼지가 있고, (r, c)에 있는 미세먼지의 양은 Ar, c이다.
- (r, c)에 있는 미세먼지는 인접한 네 방향으로 확산된다.
- 인접한 방향에 공기청정기가 있거나, 칸이 없으면 그 방향으로 확산 X
- 확산되는 양은 `Ar,c / 5`이고 소수점은 버린다.
- (r, c)에 남은 미세먼지의 양은 `Ar,c - [Ar,c / 5] * (확산된 방향의 개수)`
- 위쪽 공기청정기의 바람은 반시계방향으로 순환하고, 아래쪽 공기청정기의 바람은 시계방향으로 순환한다.
- T초가 지난 후, 방에 남아있는 미세먼지의 양은?

## 정답 코드

```python
R, C, T = map(int, input().split())
board, cleaner = [], []
for i in range(R):
  board.append(list(map(int, input().split())))
  for j in range(len(board[i])):
    if board[i][j] == -1: # [1]
      cleaner.append((i, j))


def dust_diffusion():
  steps = [[-1, 0], [1, 0], [0, -1], [0, 1]]
  diffusion = [[0] * C for _ in range(R)]
  for i in range(R):
    for j in range(C):
      if not (board[i][j] == 0 or board[i][j] == -1):
        turn = 0
        for dx, dy in steps:
          nx, ny = i + dx, j + dy
          if 0 <= nx < R and 0 <= ny < C and (nx, ny) not in cleaner: # [2]
            turn += 1
            diffusion[nx][ny] += board[i][j] // 5 # [3]
        board[i][j] = board[i][j] - ((board[i][j] // 5) * turn) # [4]
  for i in range(R):
    for j in range(C):
      board[i][j] += diffusion[i][j] # [5]


def dust_clean_up():
  up_step = [[0, 1], [-1, 0], [0, -1], [1, 0]]  # 동, 북, 서, 남
  direct = 0
  x, y = cleaner[0]  # 위쪽 공기청정기
  up, y, prev = x, 1, 0  # 시작 위치
  while True:
    if x == up and y == 0:
      break
    nx, ny = x + up_step[direct][0], y + up_step[direct][1]
    if nx < 0 or nx >= R or ny < 0 or ny >= C:
      direct += 1  # 맵을 벗어나면, 방향을 바꿔주기 Ex) 동 -> 북
      continue
    board[x][y], prev = prev, board[x][y] # [6]
    x, y = nx, ny # [7]
  return


def dust_clean_down():
  down_step = [[0, 1], [1, 0], [0, -1], [-1, 0]]  # 동, 남, 서, 북
  direct = 0
  x, y = cleaner[1]  # 아래쪽 공기청정기
  down, y, prev = x, 1, 0  # 시작 위치
  while True:
    if x == down and y == 0:
      break
    nx, ny = x + down_step[direct][0], y + down_step[direct][1]
    if nx < 0 or nx >= R or ny < 0 or ny >= C:
      direct += 1  # 맵을 벗어나면, 방향을 바꿔주기 Ex) 동 -> 남
      continue
    board[x][y], prev = prev, board[x][y] # [6]
    x, y = nx, ny # [7]
  return


for _ in range(T): # [8]
  dust_diffusion()
  dust_clean_up()
  dust_clean_down()

ans = 0
for i in range(R):
  for j in range(C):
    if board[i][j] > 0:
      ans += board[i][j]

print(ans)
```

## 풀이 및 배운 점

미세먼지의 확산 다음에 공기청정기 작동하는 순서를 생각했어야 합니다. 그다음 공기청정기가 위에서 반시계방향으로, 아래에서 시계방향으로 순환한다는 것을 나눠서 생각했어야 합니다.

그러면, 1) 미세먼지의 확산, 2) 위에서 반시계방향 순환, 3) 아래에서 시계방향 순환 이렇게 3가지 함수를 사용해야 된다는 것을 알 수 있습니다.

[1] 공기청정기가 있는 좌표를 cleaner 리스트에 넣어준다.

[2] 맵 안에 있고 공기청정기가 있는 곳이 아니라면

[3] `diffusion[nx][ny]`는 `board[i][j]`에서 5로 나눈 몫을 더해준다.

[4] 미세먼지가 주변으로 다 날아가고 남은 값을 업데이트해 준다.

[5] `board[i][j]`는 현재 미세먼지가 주변에 날아간 뒤, 남은 값만 있기에 다른 곳에서 날라온 미세먼지를 더해준다.

[6] 이전 값을 저장하기 위해서 이전 값과 현재 값을 바꿔준다.

[7] 그리고 x, y를 nx, ny로 업데이트해 준다.

[8] 1초마다 3개의 함수가 실행되는데, 이를 T초 진행해 준다.

`시뮬레이션 & 구현`은 확실히 시간도 오래 걸리고 한번에 생각하기 어렵네요... 많은 연습이 필요한 것 같습니다.

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
