---
emoji: ⛓️
title: ⛓️ 이더리움 합의 알고리즘 Gasper? Casper? GHOST?
date: '2022-09-28 08:00:00'
author: 추교현
tags: Ethereum Consensus_Algorithm
categories: ⛓️BLOCKCHAIN
---

Merge 업데이트 이후, 이더리움 합의 알고리즘에 대해서 알아봅시다.@

---

# 📌 **Intro**

최근에 머지(merge) 업데이트에 성공한 이더리움은 PoW에서 PoS로 합의 방식이 변하게 되었습니다. 이더리움 2.0에서 사용하는 합의 알고리즘은 **‘Gasper’** 라고 하는데, 이 알고리즘은 32블록마다 블록을 확정(Finalize) 시킴으로써 51% 공격에 대한 저항성을 높인 **‘Casper FFG’** 와 네트워크 지연 등 포크가 발생했을 때, 어떤 포크를 선택하는지 기준이 되는 Fork Choice Rule인 **‘LMD GHOST’** 를 이더리움 2.0에 맞게 적절히 조합한 **PoS 합의 알고리즘** 입니다.

Gasper, Casper, GHOST에 대해서 알아보기 전에 Fork Choice Rule과 Safety & Liveness에 대해 간단히 알아봅시다.

## **[1] Fork Choice Rule**

머지(merge) 업데이트 전, 이더리움은 비트코인과 마찬가지로 PoW(작업 증명) 방식이었으며 기본적으로 **[나카모토 컨센서스](https://medium.com/dsrv/classic-one-%EB%82%98%EC%B9%B4%EB%AA%A8%ED%86%A0-%EC%BB%A8%EC%84%BC%EC%84%9C%EC%8A%A4-150a54d33a18)** 에 기반한 알고리즘에 따라 블록을 생성하며 포크(fork) 발생 시, 어떤 포크를 선택할지 정하게 됩니다.

> Q. 포크(fork)는 무엇이고 왜 발생할까?
>
> _분산된 합의 알고리즘이므로 세계 곳곳에서 노드를 운영하는데 노드 간 시차로 인해 노드 간 통신에 있어 약간의 시차가 발생할 수밖에 없습니다._
>
> _만약 영국에 있는 노드와 서울에 있는 노드가 거의 동시에 논스값을 찾게 된다면 동시에 두 블록이 생기게 되며 이를 포크(fork)가 발생했다고 합니다._

만약 여러 갈래로 포크가 발생했을 때, 그 체인들을 모두 인정하게 된다면 거래의 순서가 확정되지 않는 문제가 발생하게 되어 **이중 지불**(double spending)의 위험이 생기게 됩니다.

따라서 분산된 네트워크에서는 두 개 이상으로 갈라져 포크된 각 체인들 중 어떠한 체인을 유효한 체인으로 인정할 것인지 결정하는 ‘**Fork Choice Rule**’이 필요합니다.

## **[2] Safety & Liveness**

여기서 **Safety와 Liveness의 개념**을 이해해야 Casper와 GHOST 그리고 Gasper 알고리즘을 제대로 이해할 수 있을 것 같아서 간단하게 설명하자면,

![Source : V.Buterin et al. Combining GHOST and Casper](https://miro.medium.com/v2/resize:fit:1400/1*vG4Tlf3kXhvTEB8IZpLz8g.png)

**Safety :** Safety가 보장된다는 말은 즉각적인 블록 확정(Finality)으로 **포크 발생 없이 딱 하나의 같은 블록체인을 유지할 수 있다는 것**을 의미합니다. 하지만, 무한히 합의에 도달하지 못하여 새로운 블록이 계속해서 만들어지지 않는 상태가 유지될 수 있다는 단점이 있습니다.

**Liveness :** Liveness가 보장된다는 말은 모든 노드가 딱 하나의 같은 블록체인으로 합의하지 못하는 경우가 생기더라도 완전하지 못한 합의를 우선 진행하여 **체인이 멈추지 않게 함**으로써 새로운 블록을 계속 생성할 수 있다는 것을 의미합니다. 하지만, 서로 다른 두 개 이상의 블록이 생성되는 포크(fork)가 발생하여 **이중 지불의 위험을 초래**한다는 단점이 있습니다.

Safety와 Liveness, 두 가지 속성을 모두 충족될 수는 없다는 수학적인 증명이 있으며 어떤 것이 더 비중이 높냐에 따라서 체인의 특성이 정해집니다.

# 📌 **Casper FFG?**

조금 더 구체적으로 얘기하자면, Casper는 나카모토 컨센서스에 의해 발생한 여러 포크 중 하나의 체인을 결정하기 전에 **추가적인 안전장치**로 블록을 확정(Finalize) 시키며 그 블록을 체크포인트로 생성하는 알고리즘입니다.

![Source : DSRV Research](https://miro.medium.com/v2/resize:fit:1400/1*f3SXx_uOfGINWWX0E1Nugg.png)

체크포인트가 생성되면, 해커에 의해 발생한 악의적인 포크가 시작된 지점으로 체인 전체를 되돌려버리는 51% 공격이 발생하더라도 Casper 알고리즘에 의해 이미 확정된 체크포인트(checkpoint) 기준으로 이전의 블록들을 되돌릴(롤백) 수 없게끔 네트워크를 보호해 줍니다.

## **[1] Checkpoint**

앞서 설명한 Safety가 네트워크 지연 등 여러 이유로 보장되지 않을 경우, 같은 블록 높이에서 여러 블록이 자식 블록을 가질 수 있게 됩니다. 그리고 이를 **‘포크가 발생한다’** 라고 표현합니다.

![Source : DSRV Research](https://miro.medium.com/v2/resize:fit:1400/1*x1Zpes7OBc9B0zAF9kVueA.png)

매 32블록마다 결국 여러 포크 중 하나의 포크를 선택해야만 Safety가 보장되며 딱 하나의 같은 블록체인을 유지할 수 있습니다. 이때, 여러 포크 중 하나의 포크를 선택할 때 기준이 되는 블록이 체크포인트입니다.

정리하자면, Casper는 포크가 발생하는 상황에서 부모 블록이 하나의 자식 블록만을 선택하도록 돕는 메커니즘입니다. 즉, 조상 체크포인트가 여러 개의 자손 체크포인트 중 하나만을 선택하도록 하는 것이 Casper의 역할입니다.

## **[2] Supermajority Link**

여기까지 Casper가 어떤 역할을 하며 체크포인트가 무엇이고 왜 필요한지 알게 되었는데, 그렇다면 Casper 알고리즘은 **“어떠한 방식으로 기준이 되는 블록인 체크포인트을 선택”** 할까요?

Casper는 PoW인 이더리움 1.0에서 사용되는 알고리즘이긴 하지만 PoS 방식처럼 각 밸리데이터들이 자신의 예치금(deposit)을 걸고 총 예치금 중 자신이 차지하는 지분만큼 투표를 행사할 수 있습니다. 여기서 말하는 투표란, 바로 위에서 설명한 체크포인트끼리의 연결을 확정시키는 행위입니다.

포크가 발생하여 여러 체인이 있다면 체크포인트가 될 수 있는 블록이 여러 개가 있다는 것인데, 그중에서 정본 체인(Canonical Chain)이 될 것 같은 블록에 투표를 진행하여 **전체 밸리데이터의 2/3 이상의 투표**를 받으면 Supermajority Link로 인정받게 됩니다.

그렇게 Supermajority Link와 연결된 체크포인트가 다음 체크포인트가 되며 만약 51% 공격이 발생하더라도 이렇게 확정된 체크포인트 이전의 블록들까지 롤백 시킬 수 없게 되어 Casper로 인해 추가적인 안정장치가 마련된 것입니다.

# 📌 **LMD GHOST?**

앞서 설명한 Casper FFG는 Fork Choice Rule이 아니라, 블록을 확정(Finalize) 시키는 알고리즘이라는 것을 알게 되었을 것입니다.

그렇다면 LMD GHOST는 어떤 알고리즘일까요?

LMD GHOST는 이더리움 2.0의 Fork Choice Rule이며 **“Latest Message Driven Greediest Heaviest Observed SubTree”** 의 약자입니다. 여기에서 ‘Message’란, 여러 종류의 메시시 중에서 **‘Attestation(이하, 증언 메시지)’** 이라는 종류의 메시지를 의미합니다.

## **Attestation**

만약, 포크가 발생하여 새롭게 생성된 블록이 여러 개라면 그중에서 **어떤 블록을 기존 체인에 연결할지** 증언 메시지를 통해 투표합니다.

![Source : Combining GHOST and Casper](https://miro.medium.com/v2/resize:fit:1400/1*csBqccgWaNWathImh3c5Fw.png)

위의 그림은 위에서 아래로 진행하는 블록체인에서 발생한 포크들과 증언 메시지들(동그라미)을 표현합니다.

LMD GHOST는 블록체인의 가장 먼저 생성된 블록인 제네시스 블록에서부터 가장 밑단에 있는 블록(리프 블록)까지 순서대로 따라가다가 포크가 발생하면 더 많은 증언 메시지가 지지하고 있는 블록을 선택합니다. 여기서 고려하는 증언 메시지들은 **가장 ‘최신의(Latest)’ 증언 메시지들(Attestations)** 입니다.

즉, LMD GHOST는 “각각의 검증인들로부터 받은 가장 많은 최신의 증언 메시지가 지지하는 포크를 선택한다”라는 원칙으로 **블록체인의 Safety를 보장**하게 됩니다.

여기에서 **“Greediest Heaviest Observed SubTree”** 의 뜻을 더욱 확실하게 알 수 있는데 이는 해당 블록의 SubTree, 즉 자식 블록들이 더 많은 증언 메시지(Greediest, Heaviest)로부터 지지 받을 블록을 선택한다고 이해하면 됩니다.

# 📌 **Main Protocol : Gasper**

위에서 설명한 Casper FFG와 LMD GHOST를 바탕으로 **이더리움 2.0 합의 알고리즘인 Gasper**에 대해서 본격적으로 설명하겠습니다.

## **[1] Slot & Epoch**

![Source : stakefish medium](https://miro.medium.com/v2/resize:fit:1400/1*5GjKnhg1KCQDnE9UUyRe2g.gif)

이더리움 1.0은 블록 확정(Finalize)이 블록 높이 기준으로 되었지만, 이더리움 2.0은 **에폭과 슬롯이라는 시간 기준**으로 블록이 생성 및 확정됩니다.

에폭과 슬롯의 개념이 필요한 이유는 결국 LMD GHOST와 Casper FFG를 하나의 합의 알고리즘(Gasper)으로 만들기 위해서 동일한 기준이 있어야 했기 때문입니다.

**1 슬롯(Slot)은 12초**이며, **1 에폭(Epoch)은 32 슬롯**을 의미하며 하나의 슬롯에서 블록을 제안하는 리더가 하나의 블록을 생성합니다 *(방금 언급한 블록을 제안하는 리더에 대해서는 아래 Committees(위원회) 개념에서 더 자세하게 나옵니다)*.

다음 슬롯의 블록 제안자는 여러 갈래의 포크 발생 시, 어떤 포크에 블록을 생성할 것인지 LMD GHOST를 통해 결정합니다. 즉, **슬롯과 슬롯의 관계는 ‘LMD GHOST’에 의해 결정**된다고 생각하면 됩니다.

이러한 슬롯들이 모인 에폭은 **‘Casper FFG’** 에 의해 체크포인트가 되는 블록들을 확정하는 단위로 사용됩니다.

Casper FFG에서의 체크포인트가 Gasper에서는 **“에폭과 에폭의 경계에 있는 블록”** 으로 대체되어 사용됩니다. 즉, **에폭과 에폭의 관계는 ‘Casper FFG’에 의해 결정**된다고 생각하면 됩니다.

## **[2] Committees**

![Source : DSRV Research](https://miro.medium.com/v2/resize:fit:1400/1*RtKYIC3AwBRXohBAjFV-Iw.png)

매 슬롯마다 하나의 밸리데이터 집단을 만들어 **함께 블록을 생성하고 검증하는데 이러한 집단**을 **위원회(Committee)** 라고 합니다.

위원회는 여러 명의 밸리데이터로 구성되어 있는데, 그중 무작위로 선정된 한 명이 리더가 되어 블록을 제안하면, 블록 제안자를 포함한 위원회의 모든 밸리데이터들이 블록을 검증하는 식입니다.

하나의 에폭일 때, 1 에폭은 32 슬롯이기에 전체 밸리데이터 집단을 32개의 위원회로 쪼개어 각 검증인들이 하나의 위원회에 속하도록 합니다. 그리고 이렇게 만들어진 위원회를 각 슬롯마다 하나씩 할당합니다.

에폭이 끝나면 다음 에폭에서는 다시 전체 밸리데이터들을 랜덤으로 섞어 새롭게 32개의 위원회를 구성합니다. 그리고 다시 구성된 위원회는 에폭의 슬롯마다 할당이 되어 블록을 제안하고 검증하는 과정을 반복합니다.

## **[3] Blocks and Attestations**

![Source : DSRV Research](https://miro.medium.com/v2/resize:fit:1400/1*nre9LtWH6hErQHpfmNOiLw.png)

그렇다면, 위에서 언급한 **‘블록을 검증한다’** 는 것이 정확히 무엇일까요?

슬롯과 슬롯의 관계는 LMD GHOST가 관여한다는 것을 다시 생각해봅시다.

각 슬롯마다 할당된 위원회에서 한 명의 리더가 블록을 제안하는데 이때 해당 슬롯의 위원회를 구성하는 밸리데이터 멤버들은 리더가 제안한 블록을 확인하자마자 그 블록을 지지하는지 여부에 대한 증언 메시지를 전파합니다.

위원회들로부터 받은 증언 메시지는 블록마다 LMD GHOST 점수로 매겨지고, LMD GHOST에서 정의한 규칙에 따라 다음 블록 생성자는 해당 점수를 참고하여 **어떤 포크 위에 블록을 생성해야 하는지 결정**하게 됩니다.

## **[4] Epoch Boundary Blocks**

Gasper가 동작하는 메커니즘을 다시 한번 정리하자면,

1. 슬롯은 하나의 블록을 생성하기 위한 시간적인 범위로 각 슬롯의 길이는 12초이고 에폭은 32개의 슬롯들로 이루어진 상위 시간 개념이다.
2. 슬롯에 블록을 만들기 위해서는 밸리데이터가 필요한데, Gasper에서는 전체 네트워크를 구성하는 밸리데이터들을 32개의 위원회로 분류하며, 각 슬롯마다 하나의 위원회를 할당한다.
3. 위원회는 매 에폭마다 랜덤으로 재배치되며 매번 새롭게 구성된 위원회가 슬롯에 할당될 수 있게끔 한다.
4. 슬롯에 할당된 위원회를 구성하는 밸리데이터 중 한 명이 리더로서 블록을 제안하면, 위원회의 구성원들은 증언 메시지를 통해 그 블록을 지지할지 안 할지를 결정한다.
5. 이 증언 메시지들은 다음 슬롯에 블록을 생성할 때, LMD GHOST를 통해 어떤 포크 위에 새로운 블록을 생성할지 결정할 때 사용된다. 즉, 슬롯 간의 관계는 LMG GHOST가 결정한다.
6. 반면, 에폭과 에폭 간의 경계에 있는 블록(Epoch Boundary Block)은 Casper에서 나온 “체크포인트”로서 역할을 한다. 즉, 에폭 간의 관계는 Casper FFG가 결정한다.

Casper FFG에서는 블록을 확정(Finalize) 할 때, “체크포인트”를 기준으로 하는 것을 위에서 설명했습니다. Gasper에서는 각 에폭의 가장 첫 번째 슬롯의 블록을 체크포인트로 설정하며 이 블록을 **“에폭 경계 블록 (Epoch Boundary Block)”** 이라고 합니다.

![Source : Combining GHOST and Casper](https://miro.medium.com/v2/resize:fit:1400/1*Mk9f2-6mSZj9mKZtuOgxxA.png)

증언 메시지가 어떻게 생겼는지 코드로 살펴보면 LMD GHOST 투표와 Casper FFG 투표를 구체적으로 어떻게 하는지 알 수 있습니다.

```python
class AttestationData(Container):
    slot: Slot
    index: CommitteeIndex
    # LMD GHOST vote
    beacon_block_root: Root
    # FFG vote
    source: Checkpoint
    target: Checkpoint
```

- **slot :** 증언 메시지를 전파할 당시 슬롯의 번호
- **index :** 자신이 속해있는 위원회의 번호

여기서 중요한 것은 바로 LMD GHOST 투표와 관련된 **beacon_block_root**와 캐스퍼 투표와 관련된 **source, target**입니다.

![Source : DSRV Research](https://miro.medium.com/v2/resize:fit:1400/1*thVczCVVnGTAHkJsexFOJQ.png)

각 슬롯마다 LMD GHOST를 사용하여 포크를 결정할 때 투표하는 증언 메시지를 바로 beacon_block_root에 담게 된다. 이를 **“LMD GHOST vote”** 라고 합니다.

증언 메시지는 GHOST 투표에 대한 정보를 담는 동시에, Casper에서 체크포인트와 체크포인트를 연결하듯, Gasper에서는 에폭 경계 블록과 에폭 경계 블록을 Supermajority Link로 연결하는 **“FFG vote”** 에 대한 정보도 포함하고 있습니다.

위의 코드에서 source에는 가장 최근에 **타당하다고(justificated)** 판단된 에폭 경계 블록이 들어가고, target에는 가장 최신의 에폭 경계 블록이 들어가게 됩니다.

쉽게 비유하자면, 출처(source)가 되는 블록에서 기준으로 목표(target)가 되는 블록으로의 연결(Supermajority Link)에 동의하는 것에 대한 투표를 진행한다고 봐도 이해하면 됩니다.

## **[5] Justificataion & Finalization**

![Source : DSRV Research](https://miro.medium.com/v2/resize:fit:1400/1*JDwYtHxpwuAReJ5XB-ykpw.png)

위의 그림을 순서대로 설명하자면,

1. epoch j에 있는 에폭 경계 블록과 epoch j+1에 있는 에폭 경계 블록의 연결이 **이미 Justified 되었다**고 가정하자.
2. epoch j+2에서 블록들을 생성하면서 각 위원회의 검증인들은 증언 메시지를 통해 **“GHOST 투표”와 더불어 “Casper 투표 (source & target)”** 를 진행한다. 해당 Casper 투표는 epoch j+1에 있는 에폭 경계 블록에서 epoch j+2에 있는 에폭 경계 블록으로의 **Supermajority Link를 지지하는 투표**이다.
3. 만약 2번에서 진행한 투표가 쌓여 전체 밸리데이터 지분의 2/3 이상이 된다면, 해당 에폭 경계 블록들 사이에 Supermajority Link가 생성되고, 그 링크는 이미 justified된 epoch j+1에 있는 에폭 경계 블록으로부터 시작된 링크이기에 **그 링크도 Justifed(타당화)** 된다.
4. epoch j+1에 있는 에폭 경계 블록은 부모 에폭 경계 블록(epoch j)와 자식 에폭 경계 블록(epoch j+2)으로부터 모두 Supermajority Link로 인정을 받았으므로, 최종적으로 **epoch j+1에 있는 에폭 경계 블록은 확정(Finalize)** 된다.

![Source : Combining GHOST and Casper](https://miro.medium.com/v2/resize:fit:1400/1*P5Gd5GUplPprptTJG1mLRw.png)

원래 PoW 기반 이더리움 1.0의 Casper에서는 블록 생성 메커니즘으로 PoW와 Fork Choice Rule로 Longest-Chain Rule이 적용되었고 Casper의 Supermajority Link를 생성하기 위한 투표는 독립적으로 이루어졌었습니다.

하지만 Gasper에 적용된 Casper에서는 블록 생성 메커니즘으로 LMD GHOST가 적용되고, 이때 필요한 증언 메시지에 Casper의 Supermajority Link 생성을 위한 **투표를 함께 담아 한 번에 유기적으로 처리**하게 됩니다.

따라서 이 부분이 Gasper와 Casper 그리고 GHOST가 절묘하게 합쳐지는 부분이라고 보면 됩니다.

# 📌 Reference

**[1] [Combining GHOST and Casper](https://arxiv.org/pdf/2003.03052.pdf)**

**[2] [Casper + GHOST = Gasper](https://medium.com/dsrv/casper-ghost-gasper-f68e0a0c3b57)**

**[3] [캐스퍼의 단짝 유령 친구, LMD GHOST](https://medium.com/dsrv/ko-%EC%BA%90%EC%8A%A4%ED%8D%BC%EC%9D%98-%EB%8B%A8%EC%A7%9D-%EC%9C%A0%EB%A0%B9-%EC%B9%9C%EA%B5%AC-lmd-ghost-f8b3cb714616)**

**[4] [이더리움 시리즈: 우리들의 귀여운 친구, 캐스퍼](https://medium.com/dsrv/%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80-%EC%8B%9C%EB%A6%AC%EC%A6%88-%EC%9A%B0%EB%A6%AC%EB%93%A4%EC%9D%98-%EA%B7%80%EC%97%AC%EC%9A%B4-%EC%B9%9C%EA%B5%AC-%EC%BA%90%EC%8A%A4%ED%8D%BC-7bc8c133e01b)**

**[5] [Deeper dive into Ethereum 2.0: Part 1](https://medium.com/stakefish/deeper-dive-into-ethereum-2-0-part-1-93c475a18735)**

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
