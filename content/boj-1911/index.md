---
emoji: 🕹️
title: 🕹️ [백준] 흙길 보수하기 - 1911 | Gold 5
date: '2023-11-22 10:30:00'
author: 추교현
tags: 그리디
categories: 🕹️PS
---

[백준] 흙길 보수하기 - 1911 | Gold 5.@

---

## 문제 요약

[문제 링크](https://www.acmicpc.net/problem/1911)

- N개의 물웅덩이 & 길이 L인 널빤지들
- 널빤지로 다리를 만들어 물웅덩이를 모두 덮으려고 한다.
- 모든 물웅덩이를 모두 덮기 위해 필요한 널빤지들의 최소 개수를 구하여라.

## 정답 코드

```python
N, L = map(int, input().split())
waters = []
for _ in range(N):
  start, end = map(int, input().split())
  waters.append((start, end))

waters.sort()
cnt, cur = 0, 0

for start, end in waters:
	# 이미 덮여있다는 뜻 : start를 cur로 변경
  if cur > start:
    start = cur
	# start가 end를 넘을 때까지 반복
  while start < end:
    start += L # L만큼 증가
    cnt += 1
  cur = start # 다 끝나면 cur을 start로 변경

print(cnt)
```

## 풀이 및 배운 점

저는 `loads = [0] * 1000000` 이렇게 두고 웅덩이를 1로 바꾼 뒤, 1로 시작하는 곳부터 널판지 길이만큼 2로 바꾸는 방식으로 접근했습니다. 그런데 메모리 초과가 나서 위의 풀이로 변경했습니다.

![boj-1911-1.jpg](boj-1911-1.jpg)

코드는 간단해 보이지만, 차근차근 그림을 그리며 이해가 필요했습니다.

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
