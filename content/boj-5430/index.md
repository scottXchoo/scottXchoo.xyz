---
emoji: 🕹️
title: 🕹️ [백준] AC - 5430 | Gold 5 (파이썬)
date: '2023-10-30 11:00:00'
author: 추교현
tags: 덱 자료구조
categories: 🕹️PS
---

[백준] AC - 5430 | Gold 5.@

---

## 문제 요약

[문제 링크](https://www.acmicpc.net/problem/5430)

- 'R'은 배열에 있는 수의 순서를 뒤집는 함수이고, 'D'는 첫 번째 수를 버리는 함수이다.
- 입력한 배열에 수행할 함수를 적용했을 때, 최종 결과를 구하는 프로그램을 작성하시오.

## 정답 코드

```python
from collections import deque
T = int(input())

for _ in range(T):
  F = input()
  N = int(input())
  arr = input()[1:-1].split(',')

  dq = deque(arr)
  flag = 0

  if N == 0:
    dq = deque([])

  for i in F:
    if i == 'R': # [1]
      flag += 1
    elif i == 'D':
      if len(dq) == 0:
        print("error")
        break
      else: # [2]
        if flag % 2 == 0:
          dq.popleft()
        else:
          dq.pop()

  else:
    if flag % 2 == 0:
      print("[" + ",".join(dq) + "]")
    else:
      dq.reverse() # [3]
      print("[" + ",".join(dq) + "]")
```

## 풀이 및 배운 점

[1] ‘R’이 나오면, `reverse()`를 바로 적용하는 것이 아니라 시간 초과를 피하기 위해서 ‘R’이 몇 번 나왔는지만 카운트를 해준다.

[2] ‘D’가 나왔을 때, ‘R’이 몇 번 나왔는지에 따라서 `popleft()`를 할지 `pop()`을 할지 결정한다.

[3] ‘R’이 홀수 번 나오면, 그때 `reverse()`를 적용하며 출력한다.

## 파이썬 문법

```python
input() = [1, 2, 3, 4]

arr = input()[1:-1].split(',')
# arr = ['1', '2', '3', '4']

arr = input()[1:-2].split(',')
# arr = ['1', '2', '3', '']

arr = input()[0:-1].split(',')
# arr = ['[1', '2', '3', '4']

dq = deque(arr)
# dq = deque(['1', '2', '3', '4'])
",".join(dq)
# 1, 2, 3, 4
```

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
