# 원티드 프리온보딩 프론트엔드 인턴십 사전과제 (2023년 6월)

## 인적사항

이름 : 박용준

## 배포 링크

[wanted-pre-onboarding-frontend-yopark.vercel.app](https://wanted-pre-onboarding-frontend-yopark.vercel.app/)

## 프로젝트 실행 방법

```shell
$ git clone https://github.com/yoopark/wanted-pre-onboarding-frontend
$ cd wanted-pre-onboarding-frontend/
$ npm install
$ npm start
```

## 기술 스택

- React
- TypeScript
- @emotion/styled
- axios
- prettier & eslint

## 중점을 둔 지점

### Git

- main / develop / feature / release / hotfix 를 이용하는 Git-Flow 전략을 충실히 지킴
- Conventional Commit
- main branch protection을 적용, PR 이후 Squash and merge 방식으로 develop에 push 하여 커밋의 가독성을 높임
- pull_request_template를 이용하여 PR 문서의 일관성을 높임

### axios

- 첫 사용이지만 최대한 Req & Res 시 진행하는 절차들을 섞지 않으려 노력함
- JWT token을 axios interceptor를 활용하여 주입하는 방식으로 코드 응집도를 높임
- apis 폴더를 처음 도입해보았지만, api / constants / services / utils(make instance, etc.) 로 기능별로 잘게 나누려 노력함

### 폴더 구조

- apis / assets / components / pages / providers / routes / styles / types / utils
- pages 안에 features 들을 넣는 방식으로 나눔

### 라우팅

- Outlet을 충실히 활용하여 Guard, Layout 등 처리
- AuthGuard & NoAuthGuard를 이용하여 access token 존재 여부 검사하여 코드 응집도를 높임

### Type Safety

- 원티드 서버에서 오는 에러 메세지를 알림으로 띄워주려 노력함.
  - `isAxiosErrorFromWantedPreOnboardingServer`라는 이름의 함수를 제작
  - 에러의 타입이 명시되진 않았지만 여러 에러 상황을 발생시켜 받은 케이스들로 타입 추론
- Response Error를 제외하고 any & unknown을 사용하지 않음

### UI

- 그냥 하면 지루해서 바나나 컨셉 + 글래스모피즘 배경
- 내용이 별로 없어서 모바일 기준으로만 제작

## v2.1 개발할 내용

- 더 엄밀한 리팩토링
- jest 도입
- useMemo, useCallback을 이용한 렌더링 최적화
- input change의 경우 useRef를 이용하여 렌더링 방지
- 알림 대신 toast 사용
