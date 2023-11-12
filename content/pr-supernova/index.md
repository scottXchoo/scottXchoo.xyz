---
emoji: 🔥
title: 🔥 Supernova 프로젝트
date: '2023-11-12 16:00:00'
author: 추교현
tags: 프로젝트
categories: 🔥PROJECT
---

주니어 프론트엔드 개발자로 1년 3개월 동안 재직하면서 즐겁게 개발했던 DeFi(탈중앙화 금융 서비스)인 Supernova 프로젝트를 소개합니다.@

---

![pr-supernova.gif](pr-supernova.gif)

[#GitHub](https://github.com/scottXchoo/Supernova_Front-end/tree/main) [#YouTube](https://youtu.be/VG-m5jsV0Ck?si=gB6YLwXGC7rvIz1Q)

## 프로젝트 소개

Supernova는 Liquid staking, Staked swap only for staked assets 그리고 Meta governance platform on Cosmos가 특징인 DeFI(탈중앙화 금융 서비스)입니다.

### 프로젝트 기간

: 22.05 - 23.03 (11M)

### 사용한 기술 스택

**코어 기술** : Next.js / React / TypeScript

**상태관리** : Recoil

**스타일링** : Tailwind CSS

## 진행했던 업무

### [1] useInput 커스텀 훅 개발

> 여러 페이지에서 복잡하게 관리되던 입력창들의 상태관리 및 유지보수의 어려움을 해결하고자 useInput이라는 커스텀 훅을 개발하여, 입력값의 유효성 검사, Max/Min/Half 값 처리 등의 기능을 효율적으로 통합시켰습니다.

![pr-supernova-1.png](pr-supernova-1.png)

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

[1] InputProps의 interface를 정의합니다.

[2] max, min, half를 useMemo로 정의합니다.

[3] isMax, isMin, isHalf, isOverMax는 [2]에서 만든 max, min, half를 사용하여 Max 인지 Min 인지 Half 인지 Max를 넘었는지 판단하는 로직입니다.

[4] toggleMax, toggleMin, toggleHalf는 `Max, Min, Half 토글 버튼`을 눌렀을 때, 각각 isMax, isMin, isHalf이 true 면, setInput에 rawInput(사용자가 적은 입력값)을 넣고 그렇지 않으면, max, min, half를 넣는 로직입니다.

Q. rawInput과 input 상태를 이렇게 두 개로 분리한 이유는 무엇일까요?

A.
사용자가 입력 과정에서 실수를 하거나, 입력을 재조정하는 경우가 있습니다. 이때, 원본 입력값(`rawInput`) 상태를 따로 보관함으로써 사용자가 쉽게 이전 상태로 돌아갈 수 있게 해줍니다.

코드에서 보면, toggleMax, toggleMin, toggleHalf 함수들이 rawInput 값을 기준으로 동작하는 것을 볼 수 있습니다. 이는 사용자가 최대, 최소, 절반 값으로 토글하는 기능을 사용했을 때 이전에 입력했던 원본 값을 다시 복원할 수 있도록 하는 역할을 합니다. 이를 통해 UX를 크게 향상시켰습니다.

### [2] 블록체인에 트랜잭션을 발생시키는 로직 개발 (Feat. Recoil)

> Recoil을 사용하여 여러 페이지의 상태 관리를 최적화하고, Cosmos 블록체인에 트랜잭션을 발생시키는 핵심 로직을 개발하여 전체 시스템의 효율성을 강화시켰습니다.

**useSwap 커스텀 훅**

```typescript
export const useSwap = () => {
  const wasmClient = useRecoilValue(getWasmClient);
  const novaAddress = useRecoilValue(getNovaAddress);
  const slippageInPercent = useRecoilValue(getSlippageInPercent);

  const executeSwap = useCallback(
    async (
      assetInfo: AssetWithAmount | undefined,
      fromDenom: string,
      toDenom: string,
      inputAmount: string,
    ) => {
      if (assetInfo == null) {
        return;
      }
      const contractAddress = pairAddressByDenoms(
        denomByDisplayDenom(fromDenom),
        denomByDisplayDenom(toDenom),
      );

      const decimal = assetInfo?.assetComponent.decimal || 0;
      const amount = Big(inputAmount || 0).toFixed(decimal, Big.roundDown);
      const decimalMulAmount = ParseDecimal(amount, decimal);

      if (!wasmClient || !novaAddress || !contractAddress) {
        throw new Error('No wasm client, nova address or pair info given');
      }

      const pairMsgComposers = new contracts.Pair.PairMessageComposer(novaAddress, contractAddress);

      /** compose swap msg */
      const pairMsg = pairMsgComposers.swap(
        {
          maxSpread: slippageInPercent.div(100).toString(),
          offerAsset: assetInfo.assetInfoWithAmount(decimalMulAmount),
          to: novaAddress,
        },
        [assetInfo.getCoinInfo(decimalMulAmount)],
      );
      return executeContractTx(pairMsg, wasmClient, novaAddress);
    },
    [novaAddress, slippageInPercent, wasmClient],
  );

  return {
    executeSwap,
  };
};
```

- `useRecoilValue`를 사용해 전역 상태(`wasmClient`, `novaAddress`, `slippageInPercent`)를 가져옵니다.
- `executeSwap` 함수는 스왑을 실행할 때 호출됩니다. 이 함수는 사용자가 선택한 자산과 금액 그리고 스왑할 denom을 받아 처리합니다.
- 스왑을 위한 컨트랙트 주소는 `pairAddressByDenoms` 함수를 사용하여 결정됩니다.
- `contracts.Pair.PairMessageComposer` 는 스왑을 위한 메시지를 구성합니다. 이 메시지에는 최대 허용 스프레드(`maxSpread`), 제공할 자산(`offerAsset`), 받게 되는 컨트랙트 주소(`to`) 등의 정보가 포함됩니다.
- 마지막으로, `exectueContractTx` 함수를 호출하여 구성된 메시지를 사용해 트랜잭션을 실행합니다.

**executeContractTx 함수**

```typescript
type MsgType = {
  typeUrl: string;
  value: object;
};

export const executeContractTx = async (
  msg: MsgType,
  client: SigningCosmWasmClient,
  address: string,
) => {
  return executeTx([msg], _.cloneDeep(client), address, {
    gas: CONTRACT_GAS_FEE,
    amount: coins(CONTRACT_GAS_AMOUNT, 'unova'),
  });
};
```

- 이 함수는 주어진 메시지(`msg`), 클라이언트(`client`), 사용자 주소(`address`)를 사용하여 트랜잭션을 실행합니다.
- `executeTx` 함수는 블록체인에 트랜잭션을 전송하는 역할을 합니다. 여기서는 트랜잭션에 필요한 gas와 수수료(`CONTRACT_GAS_AMOUNT`, `CONTRACT_GAS_FEE`)도 설정됩니다.
- `SigningCosmWasmClient`는 Cosmos SDK와의 상호작용을 담당하는 클라이언트로, 트랜잭션 서명 및 전송을 담당합니다.

### [3] Auto-Claim 예상 시간 계산하는 로직 개발 (Feat. React Query)

> React Query를 사용하여 복잡한 데이터 의존성을 효과적으로 관리하고, Auto-Claim 예상 시간을 계산하여 이를 사용자에게 정확히 보여주는 로직을 구현했습니다.

**useActualLazyMintingTime 훅**

```tsx
export const useActualLazyMintingTime = (address: string, zoneID: string) => {
  const {
    data: versionInfo,
    error: versionInfoError,
    isLoading: isVersionInfoLoading,
  } = useDelegationRecords({
    address,
    zoneID,
  });

  const { data: blockInfo } = useBotVersionToBlockInfo(
    versionInfo ? Number(versionInfo?.bot) : null,
    zoneID,
  );

  const actualLazyMintingTime = blockInfo
    ? dayjs(blockInfo?.time).format(DATE_FORMAT)
    : currentDateForError;

  if (isVersionInfoLoading) {
    return {
      data: null,
      isLoading: isVersionInfoLoading,
      error: null,
    };
  }
  if (versionInfoError) {
    return {
      data: null,
      isLoading: isVersionInfoLoading,
      error: versionInfoError as Error,
    };
  }
  return {
    data: blockInfo?.time ? actualLazyMintingTime : null,
    isLoading: false,
    error: null,
  };
};
```

- 주소(**`address`**)와 지역 ID(**`zoneID`**)를 바탕으로 `useDelegationRecords`를 사용하여 버전 정보를 가져옵니다.
- `useBotVersionToBlockInfo`를 사용하여 해당 버전에 대한 블록 정보를 가져옵니다.
- 블록 정보의 시간을 `dayjs`와 `DATE_FORMAT`을 사용하여 포맷팅하여 실제 Lazy Minting 시간을 계산합니다.

**useAutoClaimedTime 훅**

```tsx
export const useAutoClaimedTime = (address: string, zoneID: string) => {
  const {
    data: currentBotVersion,
    error: currentBotVersionError,
    isLoading: isCurrentBotVersionLoading,
  } = useQuery({
    queryKey: ['currentDelegateBotVersion', zoneID],
    queryFn: () => fetchCurrentDelegateBotVersion(zoneID),
    enabled: !!address && !!zoneID,
  });
  const previousBotVersion = Number(currentBotVersion) - 1 || 0;
  const { data: blockInfo } = useBotVersionToBlockInfo(previousBotVersion, zoneID);

  const { data: oracleInfo, error: oracleInfoError, isLoading: isOracleInfoLoading } = useQuery({
    queryKey: ['oracleInfo', zoneID],
    queryFn: () => fetchOracleInfo(zoneID),
    enabled: !!zoneID,
  });

  const { data: oracleTime, error: oracleTimeError, isLoading: isOracleTimeLoading } = useQuery({
    queryKey: ['blockTime', zoneID, oracleInfo?.version],
    queryFn: () => fetchBlockTime(oracleInfo?.height || '0'),
    enabled: !!oracleInfo && !!(blockInfo?.botState === BOT_SUCCESS_STATE),
  });

  const {
    data: versionInfo,
    error: versionInfoError,
    isLoading: isVersionInfoLoading,
  } = useDelegationRecords({
    address,
    zoneID,
  });

  const nextOracleBotTime = oracleTime
    ? dayjs(oracleTime)
        .add(botOraclePeriod + botAutoClaimPeriod, BOT_PERIOD_UNIT)
        .format(DATE_FORMAT)
    : currentDateForError;

  const currentOracleBotTime = oracleTime
    ? dayjs(oracleTime).add(botAutoClaimPeriod, BOT_PERIOD_UNIT).format(DATE_FORMAT)
    : currentDateForError;

  const oracleVersionByOracleVersion = Number(oracleInfo?.version);
  const oracleVersionByDelegateRecords = Number(versionInfo?.oracle);

  const actualAutoClaimedTime =
    oracleVersionByDelegateRecords === oracleVersionByOracleVersion
      ? nextOracleBotTime
      : currentOracleBotTime;

  const isLoading =
    isCurrentBotVersionLoading ||
    isOracleInfoLoading ||
    isOracleTimeLoading ||
    isVersionInfoLoading;

  const error = currentBotVersionError || oracleInfoError || oracleTimeError || versionInfoError;

  if (isLoading) {
    return {
      data: null,
      isLoading: isLoading,
      error: null,
    };
  }
  if (error) {
    return {
      data: null,
      isLoading: isLoading,
      error: error as Error,
    };
  }
  return {
    data: !!versionInfo && versionInfo.oracle !== '0' ? actualAutoClaimedTime : null,
    isLoading: false,
    error: null,
  };
};
```

- 현재 및 이전 delegate 봇 버전을 가져옵니다.
- `useBotVersionToBlockInfo`를 통해 블록 정보를 가져오고, Oracle 정보를 조회합니다.
- Oracle 시간, 버전 정보 등을 바탕으로 Auto-Claim 시간을 계산합니다.

**useBotVersionToBlockInfo 훅**

```tsx
export const useBotVersionToBlockInfo = (botVerison: number | null, zoneID: string) => {
  const { data: botInfo, error: botInfoError, isLoading: isBotInfoLoading } = useQuery({
    queryKey: ['delegateBotInfo', zoneID, botVerison],
    queryFn: () => fetchDelegateBotInfo(zoneID, botVerison),
    enabled: !!botVerison && !!zoneID,
  });
  const { data: blockTime, error: blockTimeError, isLoading: isBlockTimeLoading } = useQuery({
    queryKey: ['blockTime', zoneID, botVerison],
    queryFn: () => fetchBlockTime(botInfo?.height || '0'),
    enabled: !!botInfo && !!(botInfo?.state === BOT_SUCCESS_STATE),
  });

  const isLoading = isBotInfoLoading || isBlockTimeLoading;
  const error = botInfoError || blockTimeError;

  if (isLoading) {
    return {
      data: null,
      isLoading,
      error: null,
    };
  }
  if (error) {
    return {
      data: null,
      isLoading,
      error: error as Error,
    };
  }
  return {
    data: {
      time: blockTime,
      height: botInfo?.height,
      botState: botInfo?.state,
    },
    isLoading: false,
    error: null,
  };
};
```

- 주어진 봇 버전(**`botVersion`**)과 지역 ID(**`zoneID`**)를 바탕으로 봇 정보와 블록 시간을 조회합니다.
- 봇 상태와 블록 시간을 리턴합니다.

**useDelegationRecords 훅**

```tsx
const useDelegationRecords = ({ address, zoneID }: { address: string; zoneID: string }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['delegateRecordsToVersionInfo', address, zoneID],
    queryFn: () => fetchDelegateRecordsToVerionInfo(address, zoneID),
    enabled: !!address && !!zoneID,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useDelegationRecords;
```

- 주소(**`address`**)와 지역 ID(**`zoneID`**)를 바탕으로 delegate record을 조회합니다.
- delegate record을 반환합니다.

**useEstLazyMintingTime 훅**

```tsx
export const useEstLazyMintingTime = (zoneID: string) => {
  const {
    data: currentBotVersion,
    error: currentBotVersionError,
    isLoading: isCurrentBotVersionLoading,
  } = useQuery({
    queryKey: ['currentDelegateBotVersion', zoneID],
    queryFn: () => fetchCurrentDelegateBotVersion(zoneID),
    enabled: !!zoneID,
  });

  const previousBotVersion = Number(currentBotVersion) - 1 || 0;
  const { data: blockInfo } = useBotVersionToBlockInfo(previousBotVersion, zoneID);

  const estLazyMintingTime = blockInfo
    ? dayjs(blockInfo?.time).add(botDelegatePeriod, BOT_PERIOD_UNIT).format(DATE_FORMAT)
    : currentDateForError;

  return {
    data: estLazyMintingTime,
    isLoading: isCurrentBotVersionLoading,
    error: currentBotVersionError as Error,
  };
};
```

- 현재 델리게이트 봇 버전을 바탕으로 이전 버전을 계산합니다.
- `useBotVersionToBlockInfo`를 사용하여 블록 정보를 가져오고, 예상 Lazy Minting 시간을 계산합니다.

**사용한 React Query 기능**

1. **useQuery 훅**

   모든 훅에서 `useQuery`를 사용하고 있습니다. 이것은 React Query의 핵심 기능으로, 비동기 데이터를 가져오고, 캐싱, 로딩 상태 관리, 에러 처리 등을 수행합니다.

2. **쿼리 키 (Query Keys)**

   `useQuery`의 첫 번째 인자인 쿼리 키(queryKey)는 데이터 요청을 고유하게 식별합니다. 이는 데이터의 캐싱 및 무효화에 중요한 역할을 합니다.

   `useAutoClaimedTime`에서 `["currentDelegateBotVersion", zoneID]`처럼 쿼리 키를 사용하여 캐시를 관리합니다.

3. **조건부 쿼리 (Conditional Queries)**

   `useQuery`의 `enabled` 옵션을 통해 조건부 쿼리를 실행합니다. 이를 통해 특정 조건이 충족될 때만 데이터 요청을 수행할 수 있습니다.

   `useAutoClaimedTime` 과 `useEstLazyMintingTime` 에서 `address`와 `zoneID`가 모두 있을 때만 쿼리를 활성화시킵니다.

---

"50대의 추교현이 20대의 추교현에게 감사할 수 있게끔 하루하루 최선을 다해 살고자 합니다."

**_The End._**
