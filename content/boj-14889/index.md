---
emoji: 🕹️
title: 🕹️ [백준] 스타트와 링크 - 14889 | Silver 1
date: '2023-11-14 14:00:00'
author: 추교현
tags: 완전탐색
categories: 🕹️PS
---

[백준] 스타트와 링크 - 14889 | Silver 1.@

---

## 문제 요약

[문제 링크](https://www.acmicpc.net/problem/14889)

- 축구를 하기 위해 모인 사람은 총 N명(짝수)이다.
- `Sij`는 i번 사람과 j번 사람이 같은 팀에 속했을 때, 팀에 더해지는 능력치이다.
- 팀의 능력치는 팀에 속한 모든 쌍의 능력치 `Sij`의 합이다.
- i번 사람과 j번 사람이 같은 팀에 속했을 때, 팀에 더해지는 능력치는 `Sij`와 `Sji`이다.
- 스타트 팀의 능력치와 링크 팀의 능력치의 차이가 최소인 값을 구하시오.

## 풀이 및 배운 점

### 조합 풀이

```python
import sys
from itertools import combinations

N = int(input())
tables = [list(map(int, input().split())) for _ in range(N)]
# [1] 보통 `[i for i in range(1, N+1)]` 이렇게 적었는데, 1, N까지의 수를 list에 저런 식으로 넣을 수 있다.
members = list(range(N))
ans = sys.maxsize
# [2] combinations를 사용해서 team1을 만든다.
for team1 in combinations(members, N // 2):
  start, link = 0, 0
  # [3] team2는 기존 members에서 team1을 빼면 되는데, 이때 set(집합)을 사용해서 빼준다. 기억해두자!
  team2 = list(set(members) - set(team1))

  # [4] team1에 해당하는 index를 tables에 넣어 start 값을 더해준다.
  for i, j in combinations(team1, 2):
    start += tables[i][j]
    start += tables[j][i]
  # [5] team2에 해당하는 index를 tables에 넣어 link 값을 더해준다.
   for i, j in combinations(team2, 2):
    link += tables[i][j]
    link += tables[j][i]
  ans = min(ans, abs(start - link))

print(ans)
```

### 백트래킹 풀이

```python
import sys
N = int(input())
visited = [False for _ in range(N)]
tables = [list(map(int, input().split())) for _ in range(N)]
ans = sys.maxsize

def backTracking(depth, idx):
  global ans
  # [1] 주어진 수(N)의 절반이 depth가 되었을 때, 본격적인 탐색 시작
  if depth == N // 2:
    start, link = 0, 0
    for i in range(N):
      for j in range(N):
        # [2] visited[i]와 visited[j]가 모두 True면, start 값을 더해준다.
        if visited[i] and visited[j]:
          start += tables[i][j]
        # [3] visited[i]와 visited[j]가 모두 False면, link 값을 더해준다.
        elif not visited[i] and not visited[j]:
          link += tables[i][j]
    # [4] 2중 for문이 끝났을 때, 그 둘의 차이의 절댓값이 ans보다 작으면 ans 갱신한다.
    ans = min(ans, abs(start - link))
    return

  for i in range(idx, N):
    if not visited[i]: # [5]
      visited[i] = True
      backTracking(depth + 1, i + 1)
      visited[i] = False

backTracking(0, 0)
print(ans)
```

- [5] : [1]의 조건에 걸리지 않으면, 백트래킹한다.
  - 방문하지 않은 요소를 True로 바꾸고
  - `depth+1`, `i+1`을 인자에 넣어 backTracking을 진행한 뒤,
  - 완료하면, True로 바꿨던 visited[i]를 False로 다시 바꿔준다.

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
