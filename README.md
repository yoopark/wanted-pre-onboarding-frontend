# 원티드 프리온보딩 프론트엔드 인턴십 사전과제 (2023년 6월)

## 인적사항

이름 : 박용준

## 배포 링크

(이후 추가할 예정)

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

- apis / components / features / pages / providers / routes / types / utils
- pages 안에 features 들을 넣지 않고 features 폴더를 별도로 둠

### 라우팅

- 페이지 별 lazy import
- AuthGuard & NoAuthGuard를 이용하여 access token 존재 여부 검사하여 코드 응집도를 높임

### Type Safety

- 원티드 서버에서 오는 에러 메세지를 알림으로 띄워주려 노력함.
  - `isAxiosErrorFromWantedPreOnboardingServer`라는 이름의 함수를 제작
  - 에러의 타입이 명시되진 않았지만 여러 에러 상황을 발생시켜 받은 케이스들로 타입 추론
- Response Error를 제외하고 any & unknown을 사용하지 않음

## v2.0 개발할 내용

- UI 개선
- 로그아웃 기능 추가
- 파일명, 폴더 구조 리팩토링
- useMemo, useCallback을 이용한 렌더링 최적화
- input change의 경우 useRef를 이용하여 렌더링 방지
