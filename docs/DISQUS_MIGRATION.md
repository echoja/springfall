# Utterances에서 Disqus로 마이그레이션 가이드

## 개요
이 문서는 블로그의 댓글 시스템을 Utterances에서 Disqus로 마이그레이션하는 과정을 설명합니다.

## 1. Disqus 계정 및 사이트 설정

### 1.1 Disqus 계정 생성
1. [Disqus](https://disqus.com/)에 접속합니다.
2. 계정이 없다면 새로 생성합니다.

### 1.2 사이트 등록
1. Disqus에 로그인 후 [Admin](https://disqus.com/admin/) 페이지로 이동합니다.
2. "Get Started" 또는 "Install Disqus" 를 클릭합니다.
3. "I want to install Disqus on my site"를 선택합니다.
4. 사이트 정보를 입력합니다:
   - **Website Name**: 사이트 이름 (예: "Springfall Blog")
   - **Disqus URL (shortname)**: 고유한 shortname 입력 (예: "springfall")
   - **Category**: 블로그 카테고리 선택
5. 플랜을 선택합니다 (무료 플랜 가능).
6. 플랫폼 선택 화면에서는 건너뛰고 수동 설정을 진행합니다.

### 1.3 환경 변수 설정
프로젝트의 `.env` 파일에 Disqus shortname을 추가합니다:

\`\`\`bash
NEXT_PUBLIC_DISQUS_SHORTNAME=your-disqus-shortname
\`\`\`

`.env.example` 파일에도 참고용으로 추가되어 있습니다.

## 2. GitHub Issues를 Disqus로 마이그레이션 (수동 작업)

### 2.1 기존 댓글 백업
1. 기존 Utterances 댓글들은 GitHub Issues에 저장되어 있습니다.
2. 각 이슈를 열어서 댓글 내용을 확인합니다.
3. 필요한 경우 중요한 댓글들을 별도로 백업합니다.

### 2.2 Disqus로 댓글 이전
Utterances의 GitHub Issues를 Disqus로 자동 마이그레이션하는 도구는 없습니다. 다음 방법 중 하나를 선택합니다:

#### 옵션 A: 수동 이전 (권장하지 않음)
- 중요한 댓글만 선별하여 Disqus에 수동으로 작성합니다.
- 원본 작성자와 날짜를 명시합니다.

#### 옵션 B: GitHub Issues 유지
- 기존 Utterances 댓글은 GitHub Issues에 그대로 남겨둡니다.
- 새로운 댓글만 Disqus에서 받습니다.
- 필요시 각 포스트에 "이전 댓글은 [GitHub Issues](링크)에서 확인하세요" 안내를 추가합니다.

#### 옵션 C: Disqus Import API 사용 (개발자 전용)
Disqus는 [Import API](https://help.disqus.com/en/articles/1717131-importing-comments-from-wordpress)를 제공합니다. 다음 단계를 따릅니다:

1. GitHub Issues API를 사용하여 댓글 데이터를 추출합니다.
2. Disqus의 WXR (WordPress eXtended RSS) 형식으로 변환합니다.
3. Disqus Admin 페이지에서 데이터를 임포트합니다.

상세 가이드:
\`\`\`bash
# GitHub Issues에서 댓글 가져오기
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \\
  "https://api.github.com/repos/OWNER/REPO/issues?state=all&labels=utterances"

# 데이터를 WXR 형식으로 변환 (별도 스크립트 필요)
# Disqus Admin > Discussions > Import에서 업로드
\`\`\`

## 3. 테마 설정

Disqus는 다크 모드를 기본적으로 지원하지 않습니다. 다음 방법으로 대응합니다:

### 3.1 Disqus 어드민 설정
1. [Disqus Admin > Settings > General](https://disqus.com/admin/settings/general/)로 이동합니다.
2. **Color Scheme**을 설정합니다 (Light/Dark/Auto).
3. 커스텀 CSS로 테마를 조정할 수 있습니다 (Pro 플랜 필요).

### 3.2 코드 레벨 테마 전환
현재 구현에서는 `useColorMode` 훅을 사용하여 테마 변경을 감지하고 Disqus를 리로드합니다. 하지만 Disqus는 동적 테마 변경을 완벽하게 지원하지 않으므로, 사용자가 페이지를 새로고침해야 할 수 있습니다.

## 4. 테스트

### 4.1 로컬 테스트
\`\`\`bash
pnpm dev
\`\`\`

브라우저에서 블로그 포스트를 열어 Disqus 위젯이 올바르게 로드되는지 확인합니다.

### 4.2 테마 전환 테스트
- 라이트 모드와 다크 모드를 전환하면서 Disqus가 적절하게 표시되는지 확인합니다.
- 페이지 새로고침 시 테마가 유지되는지 확인합니다.

### 4.3 프로덕션 테스트
\`\`\`bash
pnpm build
pnpm start
\`\`\`

프로덕션 빌드에서도 정상 작동하는지 확인합니다.

## 5. 배포

1. 환경 변수가 배포 환경에 설정되어 있는지 확인합니다.
2. 변경사항을 커밋하고 푸시합니다.
3. Vercel 또는 다른 호스팅 플랫폼에 배포합니다.
4. 배포 후 실제 사이트에서 Disqus가 정상 작동하는지 확인합니다.

## 6. 주의사항

- Disqus는 광고를 포함할 수 있습니다 (무료 플랜).
- Disqus는 사용자 개인정보를 수집합니다. 개인정보 처리방침을 업데이트해야 할 수 있습니다.
- Disqus는 외부 서비스이므로 페이지 로딩 속도에 영향을 줄 수 있습니다.
- GitHub Issues에 저장된 기존 댓글은 별도로 관리해야 합니다.

## 7. 롤백

Disqus가 맞지 않는 경우, 다음 단계로 Utterances로 돌아갈 수 있습니다:

1. `src/modules/disqus.tsx` 임포트를 `src/modules/utterances.tsx`로 되돌립니다.
2. `.env` 파일에서 `NEXT_PUBLIC_DISQUS_SHORTNAME` 대신 `NEXT_PUBLIC_UTTERANCES_REPO`를 설정합니다.
3. 변경사항을 커밋하고 재배포합니다.

## 추가 리소스

- [Disqus 공식 문서](https://help.disqus.com/)
- [Disqus Admin Dashboard](https://disqus.com/admin/)
- [Disqus API 문서](https://disqus.com/api/docs/)
