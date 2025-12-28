# Utterances에서 Giscus로 마이그레이션 가이드

## 개요
이 문서는 블로그의 댓글 시스템을 Utterances에서 Giscus로 마이그레이션하는 과정을 설명합니다.

Giscus는 Utterances와 유사하지만 GitHub Issues 대신 **GitHub Discussions**를 사용하는 댓글 시스템입니다. Utterances보다 더 나은 기능들을 제공합니다:
- GitHub Discussions 기반 (Issues 대신)
- 답글 기능 지원
- 반응(reactions) 기능
- 더 나은 다크모드 지원
- 활발한 유지보수

## 1. GitHub Discussions 활성화

### 1.1 저장소에서 Discussions 활성화
1. GitHub 저장소로 이동합니다.
2. **Settings** > **General** > **Features** 섹션으로 이동합니다.
3. **Discussions** 체크박스를 활성화합니다.
4. 저장소 상단에 **Discussions** 탭이 나타나는지 확인합니다.

### 1.2 Discussions 카테고리 생성 (선택사항)
1. 저장소의 **Discussions** 탭으로 이동합니다.
2. 필요한 경우 댓글 전용 카테고리를 생성합니다 (예: "Comments" 또는 "블로그 댓글").
3. 카테고리 ID는 나중에 Giscus 설정에 사용됩니다.

## 2. Giscus 설정

### 2.1 Giscus App 설치
1. [giscus.app](https://giscus.app/)에 접속합니다.
2. 페이지 하단의 "configuration" 섹션으로 스크롤합니다.
3. 저장소 이름을 입력합니다 (예: `echoja/springfall`).
4. Giscus가 저장소를 확인하고 필요한 정보를 표시합니다.

### 2.2 필요한 정보 수집
Giscus 설정 페이지에서 다음 정보를 확인합니다:
- **Repository**: 저장소 이름 (예: `echoja/springfall`)
- **Repository ID**: 저장소의 고유 ID
- **Category**: Discussion 카테고리 (예: "General" 또는 "Comments")
- **Category ID**: 카테고리의 고유 ID

### 2.3 환경 변수 설정
프로젝트의 `.env` 파일에 Giscus 설정을 추가합니다:

\`\`\`bash
# Giscus 설정
NEXT_PUBLIC_GISCUS_REPO=owner/repo
NEXT_PUBLIC_GISCUS_REPO_ID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id
\`\`\`

`.env.example` 파일에도 참고용으로 추가되어 있습니다.

## 3. GitHub Issues를 Discussions로 마이그레이션

### 3.1 기존 Utterances 댓글 확인
1. 기존 Utterances 댓글들은 GitHub Issues에 저장되어 있습니다.
2. 저장소의 **Issues** 탭에서 `utterances` 레이블이 붙은 이슈들을 확인합니다.

### 3.2 Issues를 Discussions로 변환
GitHub에서는 Issues를 Discussions로 변환하는 기능을 제공합니다:

#### GitHub UI를 통한 변환
1. 각 Issue 페이지로 이동합니다.
2. 오른쪽 사이드바에서 "Convert to discussion" 버튼을 클릭합니다.
3. 변환할 Discussion 카테고리를 선택합니다.
4. "I understand, convert this issue" 버튼을 클릭합니다.

이 작업은 각 이슈마다 수동으로 해야 합니다.

#### GitHub CLI를 통한 일괄 변환 (선택사항)
GitHub CLI를 사용하여 여러 이슈를 한 번에 변환할 수 있습니다:

\`\`\`bash
# utterances 레이블이 있는 모든 이슈 목록 가져오기
gh issue list --label utterances --json number,title --jq '.[] | [.number, .title] | @tsv'

# 각 이슈를 Discussion으로 변환 (수동으로 번호 입력 필요)
gh issue transfer <issue-number> <target-repo> --target-repo-id <repo-id>
\`\`\`

**참고**: GitHub API를 통한 자동 변환 스크립트를 작성할 수도 있지만, 수동 확인을 권장합니다.

### 3.3 마이그레이션 전략

다음 옵션 중 하나를 선택합니다:

#### 옵션 A: 모든 댓글 변환 (권장)
- 모든 Utterances 이슈를 Discussions로 변환합니다.
- 기존 댓글들이 그대로 유지되며 URL도 자동으로 리디렉션됩니다.
- Giscus가 자동으로 기존 Discussion을 찾아 표시합니다.

#### 옵션 B: 선택적 변환
- 중요한 댓글이 있는 이슈만 변환합니다.
- 나머지는 Issues에 그대로 두고 새 댓글만 Giscus로 받습니다.

#### 옵션 C: 새로 시작
- 기존 댓글은 Issues에 보관하고 새 댓글만 Discussions에서 받습니다.
- 필요시 각 글에 "이전 댓글은 [GitHub Issues](링크)에서 확인하세요" 안내 추가.

## 4. Giscus 동작 방식

Giscus는 다음과 같이 작동합니다:
1. 사용자가 블로그 글을 방문하면 Giscus가 로드됩니다.
2. Giscus는 페이지의 `pathname`을 기준으로 Discussion을 찾습니다.
3. 해당 Discussion이 없으면 첫 댓글 작성 시 자동으로 생성됩니다.
4. 기존 Utterances Issues를 Discussions로 변환한 경우, Giscus가 자동으로 연결합니다.

## 5. 테마 설정

### 5.1 다크모드 지원
Giscus는 Utterances보다 더 나은 다크모드 지원을 제공합니다:
- 현재 구현에서는 `useColorMode` 훅을 사용하여 테마를 감지합니다.
- 테마 변경 시 Giscus에 메시지를 전송하여 실시간으로 테마를 변경합니다.
- 페이지 새로고침 없이 테마가 즉시 변경됩니다.

### 5.2 사용 가능한 테마
Giscus는 다양한 테마를 지원합니다:
- `light` - 기본 라이트 테마
- `dark` - 기본 다크 테마
- `preferred_color_scheme` - 시스템 설정 따름
- GitHub 테마들 (`github_light`, `github_dark` 등)

현재 구현은 `light`와 `dark`를 사용합니다.

## 6. 테스트

### 6.1 로컬 테스트
\`\`\`bash
pnpm dev
\`\`\`

브라우저에서 블로그 포스트를 열어 Giscus 위젯이 올바르게 로드되는지 확인합니다.

### 6.2 테마 전환 테스트
- 라이트 모드와 다크 모드를 전환하면서 Giscus가 즉시 반응하는지 확인합니다.
- Utterances와 달리 페이지 새로고침 없이 테마가 변경되어야 합니다.

### 6.3 댓글 작성 테스트
1. GitHub 계정으로 로그인합니다.
2. 테스트 댓글을 작성합니다.
3. 저장소의 Discussions에서 새 Discussion이 생성되었는지 확인합니다.

### 6.4 프로덕션 테스트
\`\`\`bash
pnpm build
pnpm start
\`\`\`

프로덕션 빌드에서도 정상 작동하는지 확인합니다.

## 7. 배포

1. 환경 변수가 배포 환경(Vercel 등)에 설정되어 있는지 확인합니다:
   - `NEXT_PUBLIC_GISCUS_REPO`
   - `NEXT_PUBLIC_GISCUS_REPO_ID`
   - `NEXT_PUBLIC_GISCUS_CATEGORY`
   - `NEXT_PUBLIC_GISCUS_CATEGORY_ID`
2. 변경사항을 커밋하고 푸시합니다.
3. 배포 플랫폼에서 자동으로 빌드 및 배포됩니다.
4. 배포 후 실제 사이트에서 Giscus가 정상 작동하는지 확인합니다.

## 8. Utterances vs Giscus 비교

| 기능 | Utterances | Giscus |
|------|-----------|--------|
| 기반 | GitHub Issues | GitHub Discussions |
| 답글 | ❌ | ✅ |
| 반응(Reactions) | 제한적 | ✅ 완전 지원 |
| 다크모드 | 페이지 새로고침 필요 | 실시간 변경 |
| 유지보수 | 중단됨 | 활발함 |
| 댓글 정렬 | 제한적 | 다양한 옵션 |
| 카테고리 | ❌ | ✅ |

## 9. 주의사항

- Giscus를 사용하려면 저장소가 **public**이어야 합니다.
- 댓글 작성자는 GitHub 계정이 필요합니다.
- GitHub Discussions가 활성화되어 있어야 합니다.
- 기존 Issues를 Discussions로 변환하는 작업은 되돌릴 수 없으니 주의하세요.

## 10. 롤백

Giscus가 맞지 않는 경우, 다음 단계로 Utterances로 돌아갈 수 있습니다:

1. `src/modules/giscus.tsx` 임포트를 `src/modules/utterances.tsx`로 되돌립니다.
2. `.env` 파일에서 Giscus 관련 변수를 제거하고 `NEXT_PUBLIC_UTTERANCES_REPO`를 설정합니다.
3. 변경사항을 커밋하고 재배포합니다.

**참고**: Discussions로 변환한 댓글은 Issues로 되돌릴 수 없으므로, 마이그레이션 전 백업을 권장합니다.

## 11. 추가 리소스

- [Giscus 공식 사이트](https://giscus.app/)
- [Giscus GitHub 저장소](https://github.com/giscus/giscus)
- [GitHub Discussions 문서](https://docs.github.com/en/discussions)
- [Converting an issue to a discussion](https://docs.github.com/en/discussions/managing-discussions-for-your-community/moderating-discussions#converting-an-issue-to-a-discussion)
