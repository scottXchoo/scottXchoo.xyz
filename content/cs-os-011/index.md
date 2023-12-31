---
emoji: 🖥️
title: 🖥️ [운영체제] 메모리 분할 방식 (Memory Partioning) | 외부/내부 단편화, 페이징 & 세그멘테이션
date: '2023-12-06 17:00:00'
author: 추교현
tags: 운영체제
categories: 🖥️CS
---

메모리 분할, 외부/내부 단편화, 페이징 및 세그멘테이션에 대해서 알아봅시다.@

---

## 메모리 분할이란?

메모리 분할은 운영체제가 메모리를 효율적으로 관리하기 위해 사용하는 기법이며 크게 정적 분할과 동적 분할로 나눌 수 있습니다.

정적 분할은 메모리를 고정된 크기의 분할로 나누고, 동적 분할은 프로세스의 요구에 따라 분할의 크기를 유동적으로 조정합니다.

## 외부 단편화와 내부 단편화

외부 단편화는 남아있는 총 메모리 공간이 요청한 메모리 공간보다 크지만, 남아있는 공간이 연속적이지 않아 메모리가 낭비되는 현상입니다.

![cs-os-11-1.png](cs-os-11-1.png)

위와 같이 남아있는 메모리 공간은 100MB(50MB + 50MB)로 요청한 메모리 공간 80MB보다 크지만, 남아있는 공간이 연속적이지 않아 Process C를 할당할 수가 없습니다. 따라서, 남아있는 메모리 공간이 낭비되는 문제가 발생합니다.

내부 단편화는 할당된 메모리 블록 내부에 사용되지 않는 공간이 생겨 메모리가 낭비되는 현상입니다.

![cs-os-11-2.png](cs-os-11-2.png)

위와 같이 100MB의 메모리에 80MB 크기의 프로세스를 올리게 되면, 20MB의 내부 단편화가 발생하게 됩니다.

## 메모리 배치 기법이란?

메모리 배치 기법은 운영체제가 프로세스를 메모리에 어떻게 할당하고 관리할지 결정하는 방법입니다.

### 메모리 할당

- 최초 적합 (first fit) : OS가 메모리 내의 빈 공간을 순서대로 검색하다가 적재할 수 있는 공간을 발견하면 그 공간에 프로세스를 배치하는 방식
- 최적 적합 (best fit) : OS가 빈 공간을 모두 검색해 본 후, 프로세스가 적재될 수 있는 공간 중 가장 작은 공간에 프로세스를 배치하는 방식
- 최악 적합 (worst fit) : OS가 빈 공간을 모두 검색해 본 후, 프로세스가 적재될 수 있는 공간 중 가장 큰 공간에 프로세스를 배치하는 방식

### 통합 (coalescing)

통합은 메모리 내의 사용 중인 프로세스들을 한쪽으로 모아서 흩어져있던 빈 공간들을 연속적이게 만드는 방법입니다. 이는 외부 단편화 문제를 해결할 수 있지만, 통합 과정 자체에 많은 시간과 비용이 발생합니다.

### 압축 (compaction)

압축은 데이터를 더 작은 공간에 저장할 수 있도록 말 그대로 데이터를 압축하는 기법입니다. 이 방법은 저장 공간을 효율적으로 사용할 수 있지만, 데이터에 접근할 때마다 압축 해제와 압축 과정이 필요할 수 있습니다.

### 버디 시스템

버디 시스템은 메모리를 고정된 크기의 블록으로 나누고, 이 블록들을 합치거나 분할하는 방식입니다. 메모리 할당과 해제가 간단하고 빠르며, 단편화 문제를 어느 정도 줄일 수 있습니다.

### 페이징

![cs-os-11-3.png](cs-os-11-3.png)

페이징은 메모리를 동일한 크기의 페이지(블록)으로 나누고, 이 페이지들을 물리적 메모리와 가상 메모리 간에 매핑하는 방식입니다.

이 방법은 외부 단편화를 제거할 수 있지만, 페이지 테이블 관리와 같은 추가적인 오버헤드가 발생할 수 있습니다.

### 세그멘테이션

![cs-os-11-4.png](cs-os-11-4.png)

세그멘테이션은 메모리를 서로 다른 크기의 세그먼트로 나누고, 각 세그먼트에는 프로그램의 논리적인 단위가 저장됩니다.

이 기법에는 프로그램의 논리적 구조를 메모리에 반영할 수 있지만, 외부 단편화 문제가 발생할 수 있습니다.

## 레퍼런스

- [[OS] 페이징(Paging)과 세그멘테이션(Segmentation)](https://cocoon1787.tistory.com/860)

- [[운영체제] 내부 단편화, 외부 단편화란? | 외부단편화 해결 방법](https://code-lab1.tistory.com/54)

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
