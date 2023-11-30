---
emoji: 🕹️
title: 🕹️ [백준] 연산자 끼워넣기 - 14888 | Silver 1 (파이썬)
date: '2023-11-25 12:30:00'
author: 추교현
tags: 완전탐색
categories: 🕹️PS
---

[백준] 연산자 끼워넣기 - 14888 | Silver 1.@

---

## 문제 요약

[문제 링크](https://www.acmicpc.net/problem/14888)

- N개의 수로 이루어진 수열과 수와 수 사이에 끼워넣을 수 있는 N-1개의 연산자가 주어진다.
- 연산자는 덧셈(+), 뺄셈(-), 곱셈(\*), 나눗셈(/)으로만 이루어져 있다.
- 수와 수 사이에 연산자를 하나씩 넣어서, 수식을 만드는데 이때 주어진 수의 순서를 바꾸면 X
- 연산자 우선 순위를 무시하고 앞에서부터 진행 + 나눗셈은 몫만 취한다.
- 만들 수 있는 식의 결과가 최댓값 & 최솟값 구하시오.

## 정답 코드

```python
N = int(input())
data = list(map(int, input().split()))
add, sub, mul, div = map(int, input().split())

max_value = -int(1e9)
min_value = int(1e9)

def dfs(depth, sum):
  global add, sub, mul, div, max_value, min_value
  if depth == N:
    max_value = max(max_value, sum)
    min_value = min(min_value, sum)
  else:
    if add > 0:
      add -= 1
      dfs(depth+1, sum + data[depth])
      add += 1

    if sub > 0:
      sub -= 1
      dfs(depth+1, sum - data[depth])
      sub += 1

    if mul > 0:
      mul -= 1
      dfs(depth+1, sum * data[depth])
      mul += 1

    if div > 0:
      div -= 1
      dfs(depth+1, int(sum / data[depth]))
      div += 1

dfs(1, data[0])
print(max_value)
print(min_value)
```

## 풀이 및 배운 점

백트래킹과 DFS를 이용해서 모든 경우의 수를 다 탐색하는 풀이입니다. 심플한데, 정말 중요한 기본 문제인 것 같습니다.

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
