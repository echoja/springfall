# MONNOMLOG

심플하고 빠른 개발자 블로그

[기획 문서 (내부 링크)](https://www.notion.so/ezkorry/MONNOMLOG-177f0ecce08043669bfc24797272cd1b)

![Vercel](https://vercelbadge.vercel.app/api/monnomlog-donkasu/monnomlog-alpha) [![Depfu](https://badges.depfu.com/badges/40013c6c77b7fe975691b4df2f88cb2c/count.svg)](https://depfu.com/github/monnomlog-donkasu/monnomlog-alpha?project_id=36213)

[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)

---

## 개발환경 세팅

- vscode - 개발 에디터
- [direnv](https://direnv.net/)로 환경 변수를 관리합니다.
- Node.js 와 pnpm 은 [asdf](https://asdf-vm.com/)로 설치합니다. (`.tool-versions` 파일 참고)
- font awesome pro 여야 합니다.

개발 서버를 실행시키려면 다음 명령을 실행합니다.

```bash
pnpm dev
```

## DB 관련 세팅

- [supabase cli](https://supabase.com/docs/guides/cli)를 활용합니다.
- [Docker](https://www.docker.com/)가 설치되어 있어야 합니다.
- Git이 설치되어 있어야 합니다.

```bash
supabase init # 현재 저장소에서 한 번도 supabase 관련 작업을 한 적이 없을 때. supabse 폴더 생성됨.
supabase login
supabase link --project-ref $SUPABASE_PROJECT_ID --password $SUPABASE_DB_PASSWORD
```

현재 migrations 를 기반으로 DB 및 스튜디오를 시작합니다. 스튜디오에서 일어나는 모든 변화는 migrations로 기록됩니다.

```bash
supabase start
```

1. 스튜디오에서 DB 스키마 등을 수정.
2. `pnpm sb-diff <filename>` 명령으로 migrations 파일 생성
3. 해당 마이그레이션 파일에 변경사항이 잘 적용되었는지 체크
4. `pnpm sb-push` 명령으로 변경사항을 스테이징에 적용

이 migration은 추후 Github Actions에서 push됩니다.

Github Actions 에서 push 되기 위해서는 다음 secrets 설정이 필요합니다.

저장소 → Settings → Secrets → Actions → 우측 상단 New repository secret 으로 추가.

- `FONTAWESOME_NPM_AUTH_TOKEN`
- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_DB_PASSWORD`
- `SUPABASE_PROJECT_ID`

⚠️ supabase 버전 업데이트 할 때마다 `.github/workflows` 의 버전도 수정해주기~

## 개발 유의사항

- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com)
- [tailwindcss](https://tailwindcss.com/)
- REST API (GraphQL 사용하지 않음)
- [slate.js](https://www.slatejs.org/): 내부 에디터

## 컨벤션

함수영 컴포넌트는 아래와 같이 선언합니다.

```ts
export interface IRenderHrProps extends RenderElementProps {
  element: IHr;
}

const Hr: React.FC<IRenderHrProps> = ({ attributes }) => {
  return <hr {...attributes} />;
};

export default Hr;
```
