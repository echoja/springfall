# MONNOMLOG

빠르고 풍부한 개발 블로그

[기획 문서 (내부 링크)](https://www.notion.so/ezkorry/MONNOMLOG-177f0ecce08043669bfc24797272cd1b)

![Vercel](https://vercelbadge.vercel.app/api/monnomlog-donkasu/monnomlog-alpha) [![Depfu](https://badges.depfu.com/badges/40013c6c77b7fe975691b4df2f88cb2c/count.svg)](https://depfu.com/github/monnomlog-donkasu/monnomlog-alpha?project_id=36213)

---

## 개발환경 세팅

- vscode - 개발 에디터
- [direnv](https://direnv.net/)로 환경 변수를 관리합니다.
- **Node.js** 와 **pnpm** 은 [asdf](https://asdf-vm.com/)로 설치합니다. (`.tool-versions` 파일 참고)

개발 서버를 실행시키려면 다음 명령을 실행합니다.

```bash
pnpm dev
```

## DB 관련 세팅

먼저 필요한 프로그램을 설치합니다.

- [supabase cli](https://supabase.com/docs/guides/cli)를 활용합니다. (`brew install supabase`)
- [Docker](https://www.docker.com/)가 설치되어 있어야 합니다. 맥일 경우 공식 홈페이지에서 docker desktop 을 다운로드 받으면 됩니다.

```bash
supabase init # 현재 저장소에서 한 번도 supabase 관련 작업을 한 적이 없을 때. supabse 폴더 생성됨.
supabase login # 자신의 계정으로 로그인합니다.
supabase link --project-ref $SUPABASE_PROJECT_ID --password $SUPABASE_DB_PASSWORD # .env 파일에서 불러옵니다.
```

현재 migrations 를 기반으로 DB 및 스튜디오를 시작합니다. 스튜디오에서 일어나는 모든 변화는 migrations로 기록됩니다.

```bash
supabase start
```

1. 스튜디오에서 DB 스키마 등을 수정.
2. `pnpm sb-diff <filename>` 명령으로 migrations 파일 생성
3. 해당 마이그레이션이 파일로써 잘 존재하는지, 변경사항이 맞는지 체크
4. `pnpm sb-push` 명령으로 변경사항을 스테이징에 적용

그리고 GitHub 로 푸쉬가 성공하기 위해서 아래와 같은 secrets 설정이 필요합니다. 이 설정은 Github Actions 에서 스테이징 서버로 push 하여, 사용자가 실수로 `pnpm sb-push` 를 하지 않는 상황을 방지합니다.

저장소 → Settings → Secrets → Actions → 우측 상단 New repository secret 으로 추가.

- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_DB_PASSWORD`
- `SUPABASE_PROJECT_ID`

참고로 스테이징이란, 단순히 `SUPABASE_ACCESS_TOKEN` 과 `SUPABASE_PROJECT_ID` 로 연결된 서버를 지칭합니다.

## 유지보수 및 패키지 업데이트 & 업그레이드

- [renovate](https://github.com/renovatebot/renovate)를 사용합니다. 기본적인 패키지 업데이트는 풀 리퀘스트를 머지하면서 진행하면 됩니다.
- 수동으로 패키지 업그레이드를 진행한다면, `pnpm up -i -L` 등으로 수행합니다.
- 업데이트한 후 `.github/workflows` 폴더에 있는 `ci.yml`, `deploy-migrations.yml` 에서의 패키지 버전도 확인합니다. 왠만하면 일치하는 것이 좋습니다.

## 개발 리소스

- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com)
- [tailwindcss](https://tailwindcss.com/)
- REST API (GraphQL 사용하지 않음)
- [slate.js](https://www.slatejs.org/): 내부 에디터
