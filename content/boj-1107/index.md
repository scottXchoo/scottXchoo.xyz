---
emoji: 🕹️
title: 🕹️ [백준] 리모컨 - 1107 | Gold 5
date: '2023-11-15 21:30:00'
author: 추교현
tags: 완전탐색
categories: 🕹️PS
---

[백준] 리모컨 - 1107 | Gold 5.@

---

## 문제 요약

[문제 링크](https://www.acmicpc.net/problem/1107)

- 리모컨에는 버튼이 0부터 9까지 숫자, +, -가 있다.
- +를 누르면 현재 보고있는 채널에서 +1된 채널로 이동하고, -를 누르면 -1된 채널로 이동한다.
- 수빈이가 지금 이동하려고 하는 채널은 N이다.
- 그리고 지금 보고 있는 채널은 100번이다. 최소 몇 번 눌러야할까?

## 정답 코드

```python
import sys
input = sys.stdin.readline

N = int(input())
M = int(input())
broken = list(map(int, input().split()))
# [1] 현재 채널에서 +/-만 사용해서 이동
min_cnt = abs(100 - N)

for nums in range(1000001):  # [2] 무식하게 0부터 1000000까지 탐색
  nums = str(nums)

  for j in range(len(nums)):
    # [3] nums에 broken가 있다면, break
    if int(nums[j]) in broken:
      break
    # [4] 마지막까지 왔다는 것은 broken이 없었다는 것
    elif j == len(nums) - 1:
      min_cnt = min(min_cnt, abs(int(nums) - N) + len(nums))

print(min_cnt)
```

## 풀이 및 배운 점

요즘 BFS/DFS랑 그리디 유형만 풀어서 그런지 무식하게 수를 0부터 1씩 올리면서 탐색하는 방법을 까먹었습니다. 단순하지만, 기본기가 중요한 문제였던 것 같아요.

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
