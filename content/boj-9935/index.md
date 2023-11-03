---
emoji: 🕹️
title: 🕹️ [백준] 문자열 폭발 - 9935 | Gold 4
date: '2023-11-03 11:00:00'
author: 추교현
tags: 스택 자료구조
categories: 🕹️PS
---

[백준] 문자열 폭발 - 9935 | Gold 4.@

---

## 문제 요약

[문제 링크](https://www.acmicpc.net/problem/9935)

- 문자열 안에 `폭발 문자열`이 있으면 제거하고 합친다.
- 제거된 문자열 안에 또 `폭발 문자열`이 있으면 제거한다.
- 남아 있는 문자가 없으면, "FRULA" & 있으면, 해당 문자열 출력

## 정답 코드

```python
import sys
input = sys.stdin.readline

S = input().rstrip()
B = input().rstrip()
b = len(B)
stack = []

for c in S:
  stack.append(c) # [1]
  if ''.join(stack[-b:]) == B: # [2]
    for _ in range(b):
      stack.pop() # [3]

if stack:
    print(''.join(stack))
else:
    print('FRULA')
```

## 풀이 및 배운 점

처음에는 while문과 find 그리고 replace로 5분만에 풀어서 제출했는데, 시간초과가 되었습니다. `폭발`, `짝짓기`의 키워드가 나오면 스택을 생각해야겠습니다.

[1] 문자열의 각 문자를 스택에 하나씩 넣는다.

[2] 스택에서 뒤에서 `폭발 문자열 크기`(b)만큼의 요소를 `폭발 문자열`(B)과 비교합니다.

[3] 만약 스택에 B가 있다면, b만큼 스택에서 pop을 해줌으로써 제거합니다.

## 파이썬 문법

```python
string = "abcd"

d = string[1:2] # b
s = string[:2] # ab
t = string[2:] # cd
a = string[-1] # d
b = string[-2] # c
c = string[-2:] # cd
k = string[-2:4] # cd

lst = ['a', 'b', 'c', 'd']
s = ''.join(lst) # abcd
s = ', '.join(lst) # a, b, c, d
```

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
