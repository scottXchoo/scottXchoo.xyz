---
emoji: 🔥
title: 🔥 Supernova 프로젝트
date: '2023-11-12 16:00:00'
author: 추교현
tags: 프로젝트
categories: 🔥PROJECT
---

DeFi(탈중앙화 금융 서비스)인 Supernova 프로젝트를 소개합니다.@

---

## 프로젝트 개요

Supernova는 Liquid staking, Staked swap only for staked assets 그리고 Meta governance platform on Cosmos가 특징인 DeFI(탈중앙화 금융 서비스)입니다.

- Liquid staking : 유저가 암호화폐를 서비스에 스테이킹(staking; 예치)하면, 스테이킹된 자산의 가치에 맞는 서비스만의 토큰을 발행하여 유저에게 제공한다.

- Staked swap only for staked assets : 스테이킹된 자산만을 위한 `staked swap` 기능이다 (기존 swap과는 다른 수학 공식을 사용함).

- Meta governance platform on Cosmos : 코스모스 블록체인에 있는 여러 앱체인의 거버넌스들을 하나의 플랫폼으로 묶는다.

## 프로젝트 기간

: 22.05 - 23.03 (11M)

## 사용한 기술 스택

### 코어 기술

- Next.js
- React
- TypeScript

### 상태관리

- Recoil

### 스타일링

- Tailwind CSS

## 프로젝트에서 한 일

### useInput 커스텀 훅 개발

: 여러 페이지에서 따로 동작하던 입력창을 useInput 훅으로 상태관리를 통일하여 유지보수 시간을 단축시켰습니다.

```typescript
// [1]
interface InputProps {
  negativeExponent: number;
  max: string;
  min?: string;
  placeholder?: string;
}

const useInput = ({
  negativeExponent,
  max: _max,
  min: _min = '0',
  placeholder = '0',
}: InputProps) => {
  const [rawInput, setRawInput] = useState('');
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // [2]
  const max = useMemo(() => trimTrailingZeros(trimUnderNegativeExponent(_max, negativeExponent)), [
    _max,
    negativeExponent,
  ]);
  const min = useMemo(() => trimTrailingZeros(trimUnderNegativeExponent(_min, negativeExponent)), [
    _min,
    negativeExponent,
  ]);
  const half = useMemo(
    () => trimTrailingZeros(Big(_max).div(2).toFixed(negativeExponent, Big.roundDown)),
    [_max, negativeExponent],
  );

  // [3]
  const isMax = useMemo(() => {
    return Big(max).eq(input || placeholder);
  }, [max, input, placeholder]);
  const isMin = useMemo(() => {
    return Big(min).eq(input || placeholder);
  }, [min, input, placeholder]);
  const isHalf = useMemo(() => {
    return Big(half).eq(input || placeholder);
  }, [half, input, placeholder]);
  const isOverMax = useMemo(() => {
    return Big(input || placeholder).gt(max);
  }, [input, max, placeholder]);

  // [4]
  const toggleMax = useCallback(() => {
    if (isMax) {
      setInput(rawInput);
    } else {
      setInput(max);
    }
  }, [isMax, max, rawInput]);
  const toggleMin = useCallback(() => {
    if (isMin) {
      setInput(rawInput);
    } else {
      setInput(min);
    }
  }, [isMin, min, rawInput]);
  const toggleHalf = useCallback(() => {
    if (isHalf) {
      setInput(rawInput);
    } else {
      setInput(half);
    }
  }, [isHalf, half, rawInput]);

  useEffect(() => {
    setInput(rawInput);
  }, [rawInput]);

  useEffect(() => {
    if (Big(input || placeholder).gt(max)) {
      setErrorMessage('Insufficient Balance');
    }

    if (Big(input || placeholder).lt(min)) {
      setErrorMessage(`Input can't be less than ${min}`);
    }
  }, [input, max, min, placeholder]);

  return {
    input,
    setInput: _setInput,
    resetInput,
    errorMessage,
    isMax,
    isMin,
    isHalf,
    isOverMax,
    toggleMax,
    toggleMin,
    toggleHalf,
    handleChange,
    placeholder,
  };
};
```

![pr-supernova-1.png](pr-supernova-1.png)

- [1] : InputProps의 interface를 정의합니다.
- [2] : max, min, half를 useMemo로 정의합니다.
- [3] : isMax, isMin, isHalf, isOverMax는 [2]에서 만든 max, min, half를 사용하여 Max 인지 Min 인지 Half 인지 Max를 넘었는지 판단하는 로직입니다.
- [4] toggleMax, toggleMin, toggleHalf는 `Max, Min, Half 토글 버튼`을 눌렀을 때, 각각 isMax, isMin, isHalf이 true 면, setInput에 rawInput(사용자가 적은 입력값)을 넣고 그렇지 않으면, max, min, half를 넣는 로직입니다.

Q. rawInput과 input 상태를 이렇게 두 개로 분리한 이유는 무엇일까요?

A.
사용자가 입력 과정에서 실수를 하거나, 입력을 재조정하는 경우가 있습니다. 이때, 원본 입력값(`rawInput`) 상태를 따로 보관함으로써 사용자가 쉽게 이전 상태로 돌아갈 수 있게 해줍니다.

코드에서 보면, toggleMax, toggleMin, toggleHalf 함수들이 rawInput 값을 기준으로 동작하는 것을 볼 수 있습니다. 이는 사용자가 최대, 최소, 절반 값으로 토글하는 기능을 사용했을 때 이전에 입력했던 원본 값을 다시 복원할 수 있도록 하는 역할을 합니다. 이를 통해 UX를 크게 향상시켰습니다.

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
