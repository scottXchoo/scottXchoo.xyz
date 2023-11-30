---
emoji: 🕹️
title: 🕹️ [백준] 소수의 연속합 - 1644 | Gold 3 (파이썬)
date: '2023-11-08 21:30:00'
author: 추교현
tags: 두 포인터
categories: 🕹️PS
---

[백준] 소수의 연속합 - 1644 | Gold 3.@

---

## 문제 요약

[문제 링크](https://www.acmicpc.net/problem/1644)

- 하나 이상의 연속된 소수의 합으로 나타낼 수 있는 자연수들이 있다.
- 41 : 2+3+5+7+11+13 = 11+13+17 = 41 (세 가지)
- 주어진 자연수(N)이 연속된 소수의 합으로 나타낼 수 있는 경우의 수를 구하시오.

## 정답 코드

```python
# 에라토스테네스의 체
N = int(input())
arr = []
a = [False, False] + [True] * (N - 1)

for i in range(2, N + 1):
  if a[i]:
    arr.append(i)
    for j in range(2 * i, N + 1, i):
      a[j] = False

ans, start, end = 0, 0, 0
while end <= len(arr):
  temp_sum = sum(arr[start:end]) # [1]
  if temp_sum == N: # [2]
    ans += 1
    end += 1
  elif temp_sum < N: # [3]
    end += 1
  else: # [4]
    start += 1

print(ans)
```

## 풀이 및 배운 점

소수가 등장하면, `에라토스테네스의 체`를 반드시 떠올려야겠습니다!

[1] start부터 end까지 해당하는 소수들을 다 더한다.

[2] temp_sum이 N과 같다면, ans & end + 1

[3] temp_sum보다 N이 작다면, end + 1

[4] temp_sum보다 N이 크다면, start + 1

## 에라토스테네스의 체

1. 0과 1은 제거한다. [False, False]
2. 지워지지 않은 수 중 제일 작은 2를 소수로 채택 & 나머지 2의 배수 모두를 지운다.
3. 지워지지 않은 수 중 제일 작은 3를 소수로 채택 & 나머지 3의 배수 모두를 지운다.
4. 계속해서 반복한다.

```python
N = 1000
arr = []
a = [False, False] + [True] * (N - 1)

for i in range(2, N + 1):
  if a[i]:
    arr.append(i)
    for j in range(2 * i, N + 1, i):
      a[j] = False
```

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
