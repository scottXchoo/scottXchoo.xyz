---
emoji: 💡
title: YOLO v1부터 v8까지 정리
date: '2023-10-06 23:00:00'
author: 추교현
tags: Deep_Learning YOLO
categories: ML/DL
---

YOLO v1부터 v8까지 버전별 아키텍처 및 특징에 대해 정리해보고자 합니다.

## YOLO 버전별 출시 시점

- YOLO v1 : 2016년 발표. 실시간 객체 검출을 위한 딥러닝 기반의 네트워크
- YOLO v2 : 2017년 발표. 성능을 개선하고 속도를 높인 것이 특징
- YOLO v3 : 2018년 발표. 네트워크 구조와 학습 방법을 개선하여 객체 검출의 정확도와 속도를 모두 개선
- YOLO v4 : 2020년 4월 발표. SPP와 PAN 등의 기술이 적용되어 더욱 정확한 객체 검출과 더 높은 속도를 제공
- YOLO v5 : 2020년 6월 발표. YOLO v4와 비교하여 객체 검출 정확도에서 10% 이상 향상되었으며, 더 빠른 속도와 더 작은 모델 크기를 가짐
- YOLO v7 : 2022년 7월 발표. 훈련 과정의 최적화에 집중하여 훈련 cost를 강화하는 최적화된 모듈과 최적 기법인 trainable bag-of-freebies를 제안
- YOLO v6 : 2022년 9월 발표. 여러 방법을 이용하여 알고리즘의 효율을 높이고, 특히 시스템에 탑재하기 위한 Quantization과 distillation 방식도 일부 도입하여 성능 향상
- YOLO v8 : 2023년 1월 발표. YOLO 모델을 위한 완전히 새로운 레포지토리를 출시하여 인스턴스 세분화 및 이미지 분류 모델을 train하기 위한 통합 프레임워크로 구축


## YOLO v1
### First YOLO
- S x S 크기의 Grid Cell로 Input Image 분리
- Cell마다 B개의 bounding boxes, confidence score, class probabilites 예측
- Final Output : S x S (B * 5 + C)
[ S : Num of Cell, B : Num of Bounding boxes, C : Num of Classes ]

