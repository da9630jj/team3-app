# 병원 기능 관리 구현 2차 팀 프로젝트
1. ✨[프로젝트 소개](#-프로젝트-소개)
2. 📌[주요 목표 및 구현 기능](#-주요-목표-및-구현-기능)
3. 🔧[기능 소개](#-기능-소개)
   - [어플 접속 및 초진 환자 전용 사전문진 작성](#어플-접속-및-초진-환자-전용-사전문진-작성)
   - [접수 취소](#접수-취소)
   - [로그인 및 재방문 환자 전용 사전문진 작성](#로그인-및-재방문-환자-전용-사전문진-작성)
   - [대기 정보 갱신 및 로그아웃](#대기-정보-갱신-및-로그아웃)
4. 👬[팀원 및 역할](#-팀원-및-역할)

</br>

## ✨ 프로젝트 소개
![깃허브용_2_그린카페앱](https://github.com/user-attachments/assets/ea2d26c5-3649-497d-9f9a-4ac5eb3320cc)
Raspberry Pi의 Beacon 기능과 React Native를 이용해 가상의 병원인 '그린카페병원'의 **온라인 사전 문진 어플리케이션** 구현

</br>

## 📌 주요 목표 및 구현 기능
1. **비콘을 통한 대기 접수 서비스** 구현
    - Raspberry Pi의 Beacon 기능을 통해 별도 어플리케이션 설치 없이 문진 작성 페이지로 연결
2. 1차 프로젝트인 <u>**[병원 진료 관리 웹 페이지](https://github.com/sunkh964/Team3)**</u>와 연동
   - 병원 웹 페이지의 회원이라면 로그인 가능
   - 로그인 시 회원 정보를 재방문 환자 전용 문진 작성 페이지의 기본값으로 전달
   - 실시간 진료 대기 현황 갱신

</br>

- 홈
  - [x] 나의 진료 현황
      - 대기 정보
      - 접수 취소
  - [x] 재방문 환자 전용
    - 환자 정보 검색
    - 사전문진 작성
  - [x] 초진 환자 전용
    - 환자 정보 추가
    - 사전문진 작성
- 마이페이지
  - [x] 나의 정보 조회
  - [x] 로그인/로그아웃

<br>

## 🔧 기능 소개
> 모든 GIF는 '새 탭에서 이미지 열기' 등의 방법으로 확대하여 열람하는 것을 추천 드립니다.
> <br>
> GIF의 좌측 화면은 1차 프로젝트인 [병원 진료 관리 웹 페이지](https://github.com/sunkh964/Team3)이며, 우측은 본 프로젝트의 구현 화면입니다.

<br>

### 어플 접속 및 초진 환자 전용 사전문진 작성
![2_어플접속및초진환자](https://github.com/user-attachments/assets/94dd80a7-520b-4700-8607-ae04b08fc7d4)
환자가 병원의 일정 반경 안에 도달하면 비콘 기능을 활용해 **별도의 어플리케이션 설치 없이** 문진 작성 페이지로 이동할 수 있습니다. <br>
이전에 병원에서 진료를 받은 이력이 없다면 환자 정보를 새로 등록하고, 증상과 진료부서, 담당의를 선택해 사전문진을 작성할 수 있습니다. <br>
이때 진료부서를 먼저 고른 다음, 선택한 부서에 해당하는 담당의가 조회됩니다. <br>
사전문진을 작성하면 **Async Storage에 대기 정보가 저장**되고, 대기 정보 화면으로 이동합니다. **병원 측 페이지**에서도 당일 환자 차트에 **대기 정보가 추가**되는 것을 확인할 수 있습니다.

<br>

### 접수 취소
![2_접수취소](https://github.com/user-attachments/assets/8137cc18-a9cd-46a8-bd13-d5250a871ec2)
Async Storage의 대기 정보가 null값이 아니라면 홈 화면에 **나의 진료 현황** 버튼이 활성화됩니다. <br>
버튼을 누르면 대기 정보 화면으로 이동할 수 있으며, **접수 취소**를 누르면 진료 테이블에서 삭제됩니다. **Storage에 저장되었던 값을 제거**하고, **병원 측 페이지**에서도 당일 환자 차트에서 **대기 정보가 삭제**됩니다.

<br>

### 로그인 및 재방문 환자 전용 사전문진 작성
![2_재방문환자](https://github.com/user-attachments/assets/a126d1f9-700c-4d16-a981-37b47d324f06)
병원 웹 페이지의 회원이라면 어플리케이션에서도 로그인할 수 있습니다. <br>
마이페이지에서 로그인하면 **Async Storage에 회원 정보가 저장**되며, **재방문 환자 전용** 화면에 로그인한 **회원의 정보를 기본값으로 전달**합니다. <br>
초진 환자와 마찬가지로 사전문진을 작성한 후 대기 정보 화면으로 이동합니다.


<br>

### 대기 정보 갱신 및 로그아웃
![2_접수정보갱신](https://github.com/user-attachments/assets/c98901cb-a3f1-4c63-950e-69812d90422d)
병원 측에서 대기 환자를 진료 환자로 등록하면, 어플리케이션에서 해당 부서의 대기 인원과 예상 대기 시간을 자동으로 계산해 줄어듭니다. <br>
대기 정보 화면을 벗어나지 않고 **새로고침**을 눌러 **실시간 대기 현황 확인이 가능**합니다.<br>
마이페이지로 이동하여 로그아웃을 하면 **Async Storage에서 회원 정보가 삭제**됩니다.

<br>

## 👬 팀원 및 역할
- [<u>노현경</u>](https://github.com/nohk1113) - 비콘 활성화, URL 연결 검증
- [<u>한선경</u>](https://github.com/sunkh964)  - 라즈베리파이 기본 세팅, 비콘 활성화
- [<u>정다영</u>](https://github.com/da9630jj) - 데이터 테이블 구성, 웹 페이지와 연동
- [<u>이도원</u>](https://github.com/nubbp) - 앱 기본 화면 구현, UI 디자인 및 설계
