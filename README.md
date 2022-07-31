# MONNOMLOG

심플하고 빠른 개발자 블로그

[기획 문서 (내부 링크)](https://www.notion.so/ezkorry/MONNOMLOG-177f0ecce08043669bfc24797272cd1b)

![Vercel](https://vercelbadge.vercel.app/api/monnomlog-donkasu/monnomlog-alpha) [![Depfu](https://badges.depfu.com/badges/37441f284b6c8a355e802d0667137107/count.svg)](https://depfu.com/github/monnomlog-donkasu/monnomlog-alpha?project_id=34653)

[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)

---

## 개발환경 세팅

- vscode - 개발 에디터
- [direnv](https://direnv.net/)로 환경 변수를 관리합니다.
- Node.js 와 yarn 은 [asdf](https://asdf-vm.com/)로 설치합니다. (`.tool-versions` 파일 참고)
- font awesome pro 여야 합니다.

개발 서버를 실행시키려면 다음 명령을 실행합니다.

```bash
yarn dev
```

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
