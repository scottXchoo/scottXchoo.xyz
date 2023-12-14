---
emoji: 🕹️
title: 🕹️ [백준] 잃어버린 괄호 - 1541 |  Silver 2 (파이썬)
date: '2023-12-14 11:30:00'
author: 추교현
tags: 그리디
categories: 🕹️PS
---

[백준] 잃어버린 괄호 - 1541 | Silver 2.@

---

## 문제 요약

[문제 링크](https://www.acmicpc.net/problem/1541)

- 양수와 +, - 그리고 괄호를 가지고 식을 만들었다.
- 그리고 괄호를 모두 지웠다.
- 괄호를 적절히 쳐서 이 식의 값을 최소로 만들려고 한다.

## 정답 코드

```python
exps = input().split('-')
nums = []
for i in exps:
	temp = i.split('+')
	sums = 0
	for j in temp:
		sums += int(j)
	nums.append(sums)

n = nums[0]
for i in range(1, len(nums)):
	n -= nums[i]

print(n)
```

## 풀이 및 배운 점

완전탐색으로 괄호가 들어갈 수 있는 경우를 하나하나 다 체크하여 그중 가장 최솟값을 구하려고 했습니다.

생각을 조금만 더 하면, `-`를 기준으로 괄호를 치면 된다는 것을 알 수 있고 이게 그리디 알고리즘을 잘 활용하는 것입니다.

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
