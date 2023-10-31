---
emoji: 🕹️
title: 🕹️ [백준] 현욱이는 괄호왕이야!! - 15926 | Gold 3
date: '2023-10-31 09:30:00'
author: 추교현
tags: 스택 자료구조
categories: 🕹️PS
---

[백준] 현욱이는 괄호왕이야!! - 15926 | Gold 3.@

---

## 문제 요약

[문제 링크](https://www.acmicpc.net/problem/15926)

- '()'는 올바른 괄호 문자열이다.
- 주어진 문자열에서 올바른 괄호 문자열인 부분 문자열의 길이를 구한다.

## 정답 코드

```python
N = int(input())
S = input().strip() # [1]
stack = []
counter = [0] * N

for idx in range(N):
  if S[idx] == '(':
    stack.append(idx) # [2]
  else:
    if stack:
      counter[idx] = counter[stack[-1]] = 1 # [3]
      stack.pop()

ans = 0
cnt = 0
for num in counter: # [4]
  if num == 1:
    cnt += 1
    ans = max(ans, cnt)
  else:
    cnt = 0

print(ans)
```

## 풀이 및 배운 점

[1] 이렇게 입력하면, `"(())("` 이런 식으로 괄호들을 받을 수 있다.

[2] 스택 문제에서는 오른쪽 괄호 `(`만 넣어주고 왼쪽 괄호 `)`로 빼준다.

[3] `counter[idx] = counter[stack[-1]] = 1` (이미지 참고)

- `(`와 `)`가 만났을 때, 두 괄호에 해당하는 `counter` 부분을 1로 수정하기 위해서
- idx에 해당하는 `counter`와 stack의 맨 마지막 값에 해당하는 `counter`를 1로 수정한다.
- 그리고 stack에 있는 마지막 요소는 pop으로 제거한다.

![boj-15926-1.jpeg](boj-15926-1.jpeg)

[4] 마지막으로 `counter`에서 연속인 1 중에서 가장 긴 문자열 값을 `ans`에 넣어 출력합니다.

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
