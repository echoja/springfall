# Springfall 블로그

[@echoja](https://github.com/echoja) 의 블로그입니다. From 2022.

![Vercel](https://vercelbadge.vercel.app/api/echoja/springfall) [![Depfu](https://badges.depfu.com/badges/40013c6c77b7fe975691b4df2f88cb2c/count.svg)](https://depfu.com/github/monnomlog-donkasu/monnomlog-alpha?project_id=36213)

## TODO

- [ ] [미리보기 이미지 생성 제작 #15](https://github.com/echoja/springfall/issues/15)
- [ ] [홈 화면에서 미리보기 이미지 보여주기 #16](https://github.com/echoja/springfall/issues/16)
- [ ] theme-color 메타 태그 추가 (app router) #12

## 개발환경

- vscode - 개발 에디터
- [direnv](https://direnv.net/)로 환경 변수를 관리합니다.
- **Node.js** 와 **pnpm** 은 [asdf](https://asdf-vm.com/)로 설치합니다. (`.tool-versions` 파일 참고)
- 개발 서버를 실행시키려면 다음 명령을 실행합니다.
  ```bash
  pnpm i
  pnpm dev
  ```
- [renovate](https://github.com/renovatebot/renovate)를 사용합니다. 기본적인 패키지 업데이트는 풀 리퀘스트를 머지하면서 진행하면 됩니다.
- 수동으로 패키지 업그레이드를 진행한다면, `pnpm up -i -L` 등으로 수행합니다.

## 리소스

- [Next.js](https://nextjs.org)
- [tailwindcss](https://tailwindcss.com/)

## 그 외

- [Supabase](https://supabase.com/) 를 사용하고 있었는데, 사용하지 않기로 했습니다. 블로그 글은 모두 static 하게 작성합니다. (2023.06)
- Admin 페이지를 별도 만들었는데, 하지 않기로 했습니다. (2023.06)
