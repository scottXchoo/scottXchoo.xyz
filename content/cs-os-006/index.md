---
emoji: 🖥️
title: 🖥️ [운영체제] 쓰레드(Thread)란?
date: '2023-11-15 20:30:00'
author: 추교현
tags: 운영체제
categories: 🖥️CS
---

쓰레드, TCB 그리고 멀티 프로세스와 멀티 쓰레드에 대한 비교에 대해서 알아보겠습니다.@

---

## 프로세스의 한계

프로세스가 생성되면, `PCB`가 운영체제가 있는 메모리의 커널 영역에 생성되며 메모리에 `코드 & 데이터 & 힙 & 스택 영역` 이 만들어집니다.

프로세스가 많아질수록 그 수만큼 메모리에 PCB와 각 영역들이 늘어나기 때문에 메모리를 많이 차지하며 무거워집니다.

그리고 프로세스끼리 ‘기본적으로’ 자원을 공유하지 않지만, 프로세스끼리도 충분히 자원을 공유하고 데이터를 주고받는데, 이때 프로세스 간의 자원을 공유하고 데이터를 주고받는 것을 프로세스 간 통신(IPC; Inter-Process Communication)이라고 부릅니다. IPC는 오버헤드가 크고 속도가 느립니다.

쓰레드(Thread)는 이러한 프로세스 특성의 한계를 보완하기 위해서 나타났습니다.

## 쓰레드란?

쓰레드는 하나의 프로세스 내에서 동시에 진행되는 실행의 흐름 단위입니다. 그리고 하나의 프로세스는 여러 개의 쓰레드를 가질 수 있습니다. 쓰레드를 이용하면 하나의 프로세스에서 여러 부분을 동시에 실행할 수 있습니다.

### 자원 공유

쓰레드는 프로세스의 일부 자원을 공유하면서 프로세스 실행 흐름의 일부가 됩니다.

프로세스의 4가지 메모리 영역(코드, 데이터, 힙, 스택) 중 쓰레드는 스택만 할당 받아 복사하고 코드, 데이터, 힙 영역은 프로세스 내의 다른 쓰레드들과 공유합니다.

이러한 특성으로 인해 쓰레드 간 데이터를 주고 받는 것이 간단해지고, 자원을 효율적으로 사용할 수 있습니다.

쓰레드는 프로세스 내에서 스택만 따로 할당받고, 코드, 데이터, 힙 영역은 공유합니다. 이러한 특성으로 인해 쓰레드 간 데이터를 주고받는 것이 간단해지고, 자원을 효율적으로 사용할 수 있습니다.

이를 통해 프로세스 별로 메모리를 할당하는 것보다 메모리 사용량을 줄일 수 있습니다. 또한, 프로세스 간의 통신보다 쓰레드 간의 통신이 더 빠르며 오버헤드가 적습니다. 이는 쓰레드가 존재하는 같은 프로세스 내에서 자원을 공유하기 때문입니다.

쓰레드는 또한, 동시에 여러 작업을 처리하는 병렬처리에 유리합니다. 쓰레드가 여러개일 경우, 하나의 쓰레드가 블록 상태로 들어가더라도 다른 쓰레드가 실행되어 프로그램의 응답성을 높일 수 있습니다.

그러나 쓰레드의 장점만 있는 것은 아닙니다. 쓰레드 간 자원을 공유하는 특성 때문에 동기화 문제가 발생할 수 있습니다. 이를 해결하기 위해 여러 동기화 기법이 제안되었지만, 이는 복잡성을 증가시킬 수 있습니다.

### TCB (Thread Control Block)

프로세스의 PCB처럼 쓰레드도 TCB 라는 자료구조를 갖고 있습니다. 각 쓰레드마다 운영체제에서 유지하는 쓰레드에 대한 정보를 담고 있습니다.

역시 쓰레드의 상태 정보, 쓰레드 ID, 스케줄링 정보 등 다양한 정보를 저장합니다. TCB도 쓰레드가 생성될 때, 운영체제에 의해 생성되며, 쓰레드가 실행을 마치고 소멸될 때, 함께 소멸됩니다.

## Multi Process vs. Multi Thread

멀티 프로세스와 멀티 쓰레드는 한 어플리케이션에 대한 처리방식 이라고 보면 됩니다. 멀티 프로세스와 멀티 쓰레드는 말 그대로 각각 여러 개의 프로세스, 쓰레드가 동작하는 것을 의미합니다.

### Multi Process

멀티 프로세스는 운영체제에서 하나의 응용 프로그램에 대해 동시에 여러 개의 프로세스를 실행할 수 있게 하는 기술을 말합니다. 보통 하나의 프로그램 실행에 대해 하나의 프로세스가 메모리에 생성되지만, 이는 여러 개의 프로세스를 메모리에 생성하게 됩니다.

멀티 프로세스 내부를 보면, 하나의 부모 프로세스가 여러 개의 프로세스를 생성함으로써 다중 프로세스를 구성하는 구조입니다.

**멀티 프로세스의 장점**

1. **프로그램 안전성 :** 각 프로세스가 독립적인 메모리 공간을 가지므로, 한 프로세스가 비정상적으로 종료되어도 다른 프로세스에 영향을 주지 않습니다. 그래서 프로그램 전체의 안정성을 확보할 수 있습니다.
2. **프로그램 병렬성 :** 멀티 프로세스와 여러 개의 CPU 코어를 활용하여 다중 CPU 시스템에서 각 프로세스를 병렬적으로 실행하여 성능을 향상시킬 수 있습니다.
3. **시스템 확장성 :** 각 프로세스가 독립적이므로, 새로운 기능이나 모듈을 축하거나 수정할 때 다른 프로세스에 영향을 주지 않습니다. 그래서 시스템의 규모를 쉽게 확장할 수 있습니다.

**멀티 프로세스의 단점**

1. **Context Switching Overhead :** 프로세스를 컨텍스트 스위칭하면, CPU는 다음 프로세스의 정보를 불러오기 위해 메모리를 검색하고, CPU 캐시 메모리를 초기화하며, 프로세스 상태를 저장하고, 불러올 데이터를 준비하는 등 꽤 높은 비용의 오버헤드가 발생할 수 있습니다.
2. **자원 공유 비효율성 :** 각 프로세스가 독립적인 메모리 공간을 가지므로, 결과적으로 메모리 사용량이 증가하게 됩니다.

**💡멀티 프로세스 vs 멀티 프로세스💡**

프로세스는 프로그램의 실행 상태를 말하고, 프로세서는 CPU 코어를 일컫습니다. 둘이 단어가 유사해서 굉장히 헷갈린데, 둘이 의미하는 바는 완전히 다릅니다.

### Multi Thread

멀티 쓰레드는 하나의 프로세스 안에 여러 개의 쓰레드가 있는 것을 말합니다. 따라서 하나의 프로그램에서 두 가지 이상의 동작을 동시에 처리가 가능해집니다.

**멀티 쓰레드의 장점**

> 윈도우, 리눅스 등 많은 운영체제들이 멀티 프로세싱을 지원하지만, 멀티 쓰레드를 기본으로 하고 있다.

1. **프로세스보다 가벼움 :** 쓰레드는 프로세스보다 용량이 가볍습니다. 쓰레드는 프로세스 내에서 생성되기 때문에 쓰레드의 실행 환경을 설정하는 작업이 매우 간단하여 생성 및 종료가 빠릅니다. 또한, 쓰레드 간 스택 영역을 제외한 나머지 영역을 서로 공유하기 때문에 데이터 용량이 작습니다.
2. **자원의 효율성 :** 멀티 쓰레드는 하나의 프로세스 내에 여러 개의 쓰레드가 생성되기 때문에 쓰레드 간에 자원을 공유가 가능해집니다.
3. **Context Switching 비용 감소 :** 프로세스 컨텍스트 스위칭보다 훨씬 비용이 낮습니다. 왜냐하면, 쓰레드 간에 공유하는 자원을 제외한 쓰레드 정보(예를 들면, 스택 영역, 레지스터 등)만 교체하면 되기 때문입니다.

**멀티 쓰레드의 단점**

1. **안정성 문제 :** 멀티 프로세스는 각 프로세스가 독립적으로 동작하므로 하나의 프로세스에서 문제가 발생해도 다른 프로세스들은 영향을 받지 않습니다. 그러나 멀티 쓰레드 모델에서는 기본적으로 하나의 쓰레드에서 문제가 발생하면 다른 쓰레드들도 영향을 받아 전체 프로그램이 종료될 수 있습니다.
2. **동기화로 인한 성능 저하 :** 멀티 쓰레드는 여러 개의 쓰레드가 공유하는 자원에 동시에 접근할 수 있기 때문에, 씽크가 맞지 않는 동기화 문제가 발생할 수 있습니다. 그러면 여러 쓰레드들이 자원에 대한 접근을 순차적으로 통제하면 되는데, 이러면 “병목 현상”이 일어나 성능이 저하됩니다.

## 레퍼런스

[[1] **완전히 정복하는 프로세스 vs 스레드 개념**](https://inpa.tistory.com/entry/%F0%9F%91%A9%E2%80%8D%F0%9F%92%BB-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4-%E2%9A%94%EF%B8%8F-%EC%93%B0%EB%A0%88%EB%93%9C-%EC%B0%A8%EC%9D%B4)

[**[2] 멀티 프로세스 vs 멀티 스레드 비교 💯 완전 총정리**](https://inpa.tistory.com/entry/%F0%9F%91%A9%E2%80%8D%F0%9F%92%BB-multi-process-multi-thread)

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
