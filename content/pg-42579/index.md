---
emoji: 🕹️
title: 🕹️ [프로그래머스] 베스트앨범 - 42579 | Level 3
date: '2023-11-23 12:30:00'
author: 추교현
tags: 해시
categories: 🕹️PS
---

[프로그래머스] 베스트앨범 - 42579 | Level 3.@

---

## 문제 요약

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/42579)

- 장르 별로 가장 많이 재생된 노래를 두 개씩 모아 베스트 앨범 출시 예정

1. 속한 노래가 많이 재생된 장르를 먼저 수록
2. 장르 내에서 많이 재생된 노래를 먼저 수록
3. 장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록

- 베스트 앨범에 들어갈 노래의 고유 번호를 순서대로 return 하도록 solution 함수 완성하세요.

## 정답 코드

```python
def solution(genres, plays):
    answer = []
    play_map = {}
    genre_map = {}
    # [1] genres를 play의 합을 기준으로 오름차순 정렬
    for idx, genre in enumerate(genres):
        if genre in genre_map:
            genre_map[genre] += plays[idx]
        else:
            genre_map[genre] = plays[idx]
    sorted_genre_map = sorted(genre_map.items(), key= lambda item:item[1], reverse=True)
    # [2] 오름차순 정렬된 해시맵에서 genre를 기준으로 for문
    for genre, _ in list(sorted_genre_map):
        temp = []
        # [3] 각 genre에 맞는 genres의 index를 구해 이를 plays의 값과 함께 temp에 대입
        for idx, _genre in enumerate(genres):
            if _genre == genre:
                temp.append((plays[idx], idx))
        # [4] temp의 0번째 요소는 오름차순, 1번째 요소는 내림차순 순서로 정렬
        temp.sort(key=lambda x: (-x[0], x[1]))
        # [5] 가장 많이 재생된 노래 최대 두 개씩만 보여주기 때문
        temp = temp[:2]
        # [6] 만약 (800, 0), (800, 3)과 같이 play가 중복된다면?
        ## 아래와 같이 play+idx로 key를 만드는 방법으로 해결 (더 좋은 방법 없을까)
        for play, idx in temp:
            play_map[play+idx] = idx

    for i in play_map:
        answer.append(play_map[i])

    return answer
```

## 풀이 및 배운 점

곧 카카오 2024 겨울 인턴 코딩테스트를 봅니다. 이를 위해 프로그래머스 [고득점 Kit](https://school.programmers.co.kr/learn/challenges?tab=algorithm_practice_kit)에 있는 해시 관련 다섯 문제를 연속으로 풀었고 그중 마지막 문제였습니다.

3-4시간 사용한 것 같은데, 끝까지 포기하지 않고 결국 풀어냈습니다. 다른 풀이와 비교했을 때, 부족하긴 하지만 그래도 직접 답을 도출한 것이 의미가 있습니다.

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
