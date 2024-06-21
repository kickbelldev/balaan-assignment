# 발란 FE 사전 과제
<img src="https://github.com/kickbelldev/balaan-assignment/assets/31813451/70cd6936-e6ba-475a-b84f-7deae268e8a3" width="300">
<img src="https://github.com/kickbelldev/balaan-assignment/assets/31813451/efaeaa87-342e-4298-8147-cf04fc2c0656" width="300">


## 사용 기술스택

- typescript
- vue.js v3
- tailwindcss

## 구현 기능

- useFunnel 컴포저블(@/composable/useFunnel.ts 참조)
  - 퍼널 구성을 위한 컴포저블
  - 각 스텝을 의미하는 Step 컴포넌트
  - 한 퍼널을 의미하는 Funnel 컴포넌트
  - 스텝을 지정하는 getStep 메소드
- 각종 컴포넌트(@/components 참조)
- 메인 기능
  - 입력값 저장 및 유효성 검사 로직을 담은 ref 객체(@/pages/SignUp/SignUpPage.vue 참조)
  - 각 스텝 뷰 컴포넌트(@/pages/SignUp/Step\* 참조)

## 개발모드 실행 방법

```bash
pnpm install
pnpm run dev
```

pnpm이 설치되어 있지 않다면

```bash
npm install -g pnpm
```

로 pnpm을 설치 후 다시 위 명령어로 실행해주세요.
