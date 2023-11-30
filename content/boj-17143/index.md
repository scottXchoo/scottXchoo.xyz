---
emoji: 🕹️
title: 🕹️ [백준] 낚시왕 - 17143 | Gold 1 (파이썬)
date: '2023-11-28 09:00:00'
author: 추교현
tags: 구현 시뮬레이션
categories: 🕹️PS
---

[백준] 낚시왕 - 17143 | Gold 1.@

---

## 문제 요약

[문제 링크](https://www.acmicpc.net/problem/17143)

- RxC인 격자판에서 낚시왕은 오른쪽으로 한 칸 이동하면서 낚시를 하며 가장 오른쪽 열의 오른쪽으로 이동하면 종료한다.
- 낚시왕이 오른쪽으로 한 칸 이동한다.
- 낚시왕이 있는 열에 있는 상어 중에서 땅과 제일 가까운 상어를 잡고 격자판에서 사라지게 한다.
- 상어가 이동한다.
  - 상어에게는 속도(칸/초)와 방향이 주어진다.
  - 이를 기반으로 이동하며 만약 한 칸에 두 마리 이상이 있으면, 크기가 큰 상어가 다른 상어를 잡아먹어 없앤다.
- 낚시왕이 잡은 상어 크기의 합을 구하라.

## 정답 코드

```python
UP, DOWN, RIGHT, LEFT = 1, 2, 3, 4
R, C, M = map(int, input().split())
board = [[0 for _ in range(C)] for _ in range(R)]

for _ in range(M):
  r, c, s, d, z = map(int, input().split())
  r, c = r - 1, c - 1
  board[r][c] = (s, d, z)

def fish(j):
  for i in range(R):
    if board[i][j]:
      x = board[i][j][2]
      board[i][j] = 0
      return x
  return 0

def move():
  global board
  new_board = [[0 for _ in range(C)] for _ in range(R)]
  for i in range(R):
    for j in range(C):
      if board[i][j]:
        ni, nj, nd = get_next_loc(i, j, board[i][j][0], board[i][j][1])
        if new_board[ni][nj]:
          new_board[ni][nj] = max(
            new_board[ni][nj],
            (board[i][j][0], nd, board[i][j][2]),
            key = lambda x: x[2] # z를 기준으로 max 찾기
          )
        else:
          new_board[ni][nj] = (board[i][j][0], nd, board[i][j][2])
  board = new_board

def get_next_loc(i, j, speed, dir):
  if dir == UP or dir == DOWN:
    cycle = 2 * R - 2
    if dir == UP:
      speed += cycle - i
    else:
      speed += i

    speed %= cycle
    if speed >= R:
      return (cycle - speed, j, UP)
    return (speed, j, DOWN)
  else:
    cycle = 2 * C - 2
    if dir == LEFT:
      speed += cycle - j
    else:
      speed += j

    speed %= cycle
    if speed >= C:
      return (i, cycle - speed, LEFT)
    return (i, speed, RIGHT)

ans = 0
for j in range(C):
  ans += fish(j)
  move()

print(ans)
```

## 풀이 및 배운 점

구체적으로 코드를 작성하기 전에, 큰 그림을 그리며 설계하는 것이 정말 중요하다는 것을 배웠습니다: "C만큼 반복할 것인데, 그때마다 fish(j)로 낚시하고 move()로 상어를 움직인다." 이렇게 큰 그림이 그려진 다음에 디테일한 부분들을 채워나가는 식으로 구현하면 됩니다.

[1] `UP, DOWN, RIGHT, LEFT = 1, 2, 3, 4` : 이렇게 문제를 보기 쉽게 표현할 수 있습니다.

[2] `board[r][c] = (s, d, z)` : 이차원 배열 안에 튜플이나 리스트를 요소로 넣을 수 있습니다.

[3]

```python
new_board = [[0 for _ in range(C)] for _ in range(R)]
board = new_board
```

: 기존 board와 new_board를 비교함으로써 상어가 움직이는 것을 "독립적으로 진행"시킬 수 있습니다.

[4] `def get_next_loc(i, j, speed, dir):`

- 상어는 0, 1, 2, 3, 2, 1, ... 와 같은 `cycle`을 가진다.
- 상어를 0에서 시작하는 것으로 위치를 고정하고, 그 위치만큼을 `speed`에 더해준다.
  - 역행(UP, LEFT)일 때는 `cycle - 위치`만큼을 더한다.
  - 순행(DOWN, RIGHT)일 때는 `위치`만큼을 더한다.
- cycle이 반복되기 때문에 `speed %= cycle`로 나머지만 구한 뒤, R(또는 C)와 비교하여 `cycle - speed` 혹은 `speed`를 리턴한다.

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
