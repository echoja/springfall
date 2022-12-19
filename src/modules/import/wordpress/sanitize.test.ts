import sanitize from "./sanitize";

test("simple", () => {
  const result = sanitize("abc<code>#include <stdlib.h></code>abcd");
  expect(result).toEqual("abc<code>#include &lt;stdlib.h&gt;</code>abcd");
});

test("simple + newline", () => {
  const result =
    sanitize(`<pre class="wp-block-code language-c"><code>/* 노미네뜨 검증 X */
  #include <stdlib.h>
  #include <stdio.h>

  struct Person
  {
    char name&#91;20];
    int age;
    char address&#91;100];
  };

  int main()
  {
    struct Person p; /* 실제 변수를 만듬*/
    p.age = 5;		 /* 변수의 멤버에 접근 */
    printf("%d\\n", p.age);

    struct Person *pp;
    pp = &p;
    pp->age = 10; /* (*pp).age = 10 과 동일 */
    printf("%d\\n", pp->age);

    struct Person *malp;
    malp = (struct Person *)malloc(sizeof(struct Person) * 1); /* sizeof 를 이용하여 필요한 메모리 계산 */
    malp->age = 20;
    printf("%d\\n", malp->age);
  }</code></pre>`);
  expect(result).toMatchInlineSnapshot(`
    "<pre class=\\"wp-block-code language-c\\"><code>/* 노미네뜨 검증 X */
      #include &lt;stdlib.h&gt;
      #include &lt;stdio.h&gt;

      struct Person
      {
        char name&#91;20];
        int age;
        char address&#91;100];
      };

      int main()
      {
        struct Person p; /* 실제 변수를 만듬*/
        p.age = 5;		 /* 변수의 멤버에 접근 */
        printf(\\"%d\\\\n\\", p.age);

        struct Person *pp;
        pp = &p;
        pp-&gt;age = 10; /* (*pp).age = 10 과 동일 */
        printf(\\"%d\\\\n\\", pp-&gt;age);

        struct Person *malp;
        malp = (struct Person *)malloc(sizeof(struct Person) * 1); /* sizeof 를 이용하여 필요한 메모리 계산 */
        malp-&gt;age = 20;
        printf(\\"%d\\\\n\\", malp-&gt;age);
      }</code></pre>"
  `);
});

const fixture =
  '<!-- wp:heading -->\n<h2>구조체(<code>struct</code>)</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>여러가지 변수를 모아둔 것.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>선언하는 법</h3>\n<!-- /wp:heading -->\n\n<!-- wp:code {"className":"language-c"} -->\n<pre class="wp-block-code language-c"><code>/* 노미네뜨 검증 X */\nstruct Person\n{\n    char name&#91;20];\n    int age;\n    char address&#91;100];\n};\n\nstruct Person p; /* 변수 만들때 .*/</code></pre>\n<!-- /wp:code -->\n\n<!-- wp:heading {"level":3} -->\n<h3>예제</h3>\n<!-- /wp:heading -->\n\n<!-- wp:code {"className":"language-c"} -->\n<pre class="wp-block-code language-c"><code>/* 노미네뜨 검증 X */\n#include <stdlib.h>\n#include <stdio.h>\n\nstruct Person\n{\n\tchar name&#91;20];\n\tint age;\n\tchar address&#91;100];\n};\n\nint main()\n{\n\tstruct Person p; /* 실제 변수를 만듬*/\n\tp.age = 5;\t\t /* 변수의 멤버에 접근 */\n\tprintf("%d\\n", p.age);\n\n\tstruct Person *pp;\n\tpp = &p;\n\tpp->age = 10; /* (*pp).age = 10 과 동일 */\n\tprintf("%d\\n", pp->age);\n\n\tstruct Person *malp;\n\tmalp = (struct Person *)malloc(sizeof(struct Person) * 1); /* sizeof 를 이용하여 필요한 메모리 계산 */\n\tmalp->age = 20;\n\tprintf("%d\\n", malp->age);\n}</code></pre>\n<!-- /wp:code -->\n\n<!-- wp:code {"className":"language-plaintext"} -->\n<pre class="wp-block-code language-plaintext"><code>5\n10\n20</code></pre>\n<!-- /wp:code -->\n\n<!-- wp:heading {"level":3} -->\n<h3>Norminette</h3>\n<!-- /wp:heading -->\n\n<!-- wp:list -->\n<ul><li>이름은 알파벳 소문자, 숫자, \'_\' (Unix 문자) 로만 이루어져야 합니다.</li><li><code>struct</code>의 이름은 <code>s_ </code>로 시작해야 합니다.</li><li><code>struct</code>, <code>union</code>, <code>enum</code>을 선언할 때에는 탭을 삽입하시기 바랍니다.</li><li><code>struct</code>, <code>union</code>, <code>enum</code> 타입의 변수를 만들 때에는 자료형에 스페이스가 하나 존재해야 합니다. (예: <code>struct스페이스바s_abc탭a;</code>)</li><li><code>.c</code> 파일에 선언하는 하지 마십시오.</li></ul>\n<!-- /wp:list -->\n\n<!-- wp:heading -->\n<h2><code>typedef</code></h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p><code>struct</code>, <code>union</code>, <code>enum</code>을 좀 더 간편하게 쓸 수 있도록 별칭을 만드는 것. 예를 들어 이미 만들어둔 <code>s_abc</code> 구조체에 대해 <code>typedef struct s_abc t_abc</code> 라고 하게 되면 앞으로 <code>struct s_abc</code> 라고 길게 쓰지 않고 <code>t_abc</code> 로 간편하게 쓸 수 있다.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>Norminette</h3>\n<!-- /wp:heading -->\n\n<!-- wp:image {"id":2055,"sizeSlug":"large"} -->\n<figure class="wp-block-image size-large"><img src="https://elvanov.com/elvanov/wp-content/uploads/2020/07/type1.jpg" alt="" class="wp-image-2055"/><figcaption>norminette 안걸리게 하기. 내부 인자에 맞게 <code>t_bar</code>를 맞춘 다음, <code>s_abc</code>를 <code>t_bar</code>에 맞춘다. <code>t_abc</code>는 그냥 직전에 탭 하나만 있으면 되는 듯.</figcaption></figure>\n<!-- /wp:image -->\n\n<!-- wp:heading -->\n<h2>정적 라이브러리 (.a 파일)</h2>\n<!-- /wp:heading -->\n\n<!-- wp:quote -->\n<blockquote class="wp-block-quote"><p>뭔가 라이브러리 부분은 러쉬나 BSQ에서 이용하진 않을 것 같은 뇌피셜</p></blockquote>\n<!-- /wp:quote -->\n\n<!-- wp:code {"className":"language-bash"} -->\n<pre class="wp-block-code language-bash"><code># 파일은 mysum.c, mysum.h 두 개의 파일이 존재한다고 가정\ngcc -c mysum.c\nar rcv libmysum.a mysum.o</code></pre>\n<!-- /wp:code -->\n\n<!-- wp:paragraph -->\n<p>정적 라이브러리는 단순히 보통의 목적파일(object file)의 모음이다. 관례적으로, 정적 라이브러리는 ``.a\'\'의 확장자로 끝난다. 이것은 ar(archiver)프로그램에 의해서 만들어진다.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>위의 프로그램을 컴파일 하기 위해서는 라이브러리의 위치와 어떤 라이브러리를 사용할것인지를 알려줘야 한다. 라이브러리의 위치는 \'-L\' 옵션을 이용해서 알려줄수 있으며, \'-l\' 옵션을 이용해서 어떤 라이브러리를 사용할것인지를 알려줄수 있다. -l 뒤에 사용될 라이브러리 이름은 라이브러리의 이름에서 "lib"와 확장자 "a"를 제외한 나머지 이름이다. 즉 libmysum.a 를 사용할 것이라면 "-lmysum" 이 될것이다.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:code {"className":"language-bash"} -->\n<pre class="wp-block-code language-bash"><code>gcc -o print_sum print_num.c -L./ -lmysum</code></pre>\n<!-- /wp:code -->\n\n<!-- wp:paragraph -->\n<p>동적 라이브러리를 배우지는 않지만 간략히 언급만 하고 넘어간다면, 동적 라이브러리는 정적 라이브러리처럼 컴파일 시 링크되는 개념이 아니라, 컴파일 때에는 본체 프로그램만 하고, 라이브러리는 프로그램을 실행할 때 가져온다는 차이가 있다. (.dll 파일)</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>헤더 파일</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>헤더 파일과 </p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>헤더 파일과 라이브러리의 차이가 뭐냐고 묻는다면, 이는 사실 완전히 성격이 다른 것이다. 라이브러리란 유용하게 갖다 쓸 함수들이 컴파일된 채로 있는 걸 의미하며,  헤더 파일은 어떤 기능을 구현하고자 할 때 "구현부인 소스 파일과 선언부인 헤더 파일로 나누</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>컴파일 과정</h2>\n<!-- /wp:heading -->\n\n<!-- wp:list {"ordered":true} -->\n<ol><li><strong>전처리기</strong>: <code>#define</code>, <code>#include</code> 등의 매크로를 처리하여 매크로 없는 깔끔한 소스 파일을 제작함 <code>#include</code> 는 기능적으로는 복사 붙여넣기와 같음.</li><li><strong>컴파일</strong>. 소스코드를 실행가능한 파일로 변환하는 과정. 문법 에러 등 에러 발생시 실패. 성공하면 목적 파일(오브젝트 파일, <code>.o</code> 파일)이 생성됨.</li><li><strong>링크</strong>. 실행가능한 파일들을 묶고 조합하는 과정. 함수 등의 기능을 실제로 사용하려고 하지만, 그 내용을 찾는 데 실패했을 때(구현부를 컴파일할 때 포함시키지 않으면) 에러가 뜸. 구체적인 에러 위치를 알려주지 않음.</li></ol>\n<!-- /wp:list -->\n\n<!-- wp:heading -->\n<h2>Makefile</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p><code>gcc -o .. 소스파일.. 라이브러리..</code> 등등.. 너무 명령어가 길어지니까 이것들을 절차에 맞게 잘 컴파일할 수 있도록 <strong>컴파일 방법을 <code>Makefile</code> 이라는 파일에 적어두고</strong>, <strong><code>make</code> 명령어</strong>로 컴파일 및 빌드할 수 있음.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>파일 내부 구조</h3>\n<!-- /wp:heading -->\n\n<!-- wp:image {"id":2065,"sizeSlug":"large"} -->\n<figure class="wp-block-image size-large"><img src="https://elvanov.com/elvanov/wp-content/uploads/2020/07/Makefile기본구조.jpg" alt="" class="wp-image-2065"/></figure>\n<!-- /wp:image -->\n\n<!-- wp:list -->\n<ul><li>매크로 : 반복적으로 쓸 문자를 변수처럼 정의해줌. 매크로에 매크로를 정의할 수 있음. 매크로를 불러올 땐 <code>$(매크로이름)</code>로 함.</li><li>타겟절 : <strong>목표, 룰, 라벨</strong>이라고도 함. 목표! 기본적으로 만들어야 할 파일 이름이 옴. (예: <code>something.o</code>) 후술할 특수 목적 타겟도 있음. (<code>all</code>, <code>clean</code>, <code>re</code> 등)</li><li>의존성 : 해당 타겟이 완성되기 전에 미리 완성되어야 할 다른 타겟들을 적음.</li><li>명령어 : 해당 타겟을 완성시키기 위한 명령어를 적음. 앞에 탭 하나가 있어야 함. 해당 타겟을 완성하려고 할 때 실행되는 실제 명령어</li></ul>\n<!-- /wp:list -->\n\n<!-- wp:heading {"level":3} -->\n<h3>특수 매크로</h3>\n<!-- /wp:heading -->\n\n<!-- wp:list -->\n<ul><li><code>$@</code> : 해당 타겟을 의미. (타겟 정의시 <code>:</code> 왼쪽에 있는 문자들)</li><li><code>$^</code> : 해당 모든 의존성을 의미. (타겟 정의시 <code>:</code> 오른쪽에 있는 문자들)</li></ul>\n<!-- /wp:list -->\n\n<!-- wp:heading {"level":3} -->\n<h3>기초 실행법</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p><code>Makefile</code>이 있는 폴더 (프로젝트 폴더)에 들어가서 <code>make</code> 명령어를 치면된다. 아무런 인수 없이 <code>make</code> 명령을 실행한다면 최상단에 있는 목표(룰, 타겟)가 실행된다. 그러므로 <code>all</code> 룰을 제일 위에 두자.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3>예제</h3>\n<!-- /wp:heading -->\n\n<!-- wp:code {"className":"language-makefile"} -->\n<pre class="wp-block-code language-makefile"><code>CC = gcc \nAR = ar\nRANLIB = ranlib\nCFLAGS = -Wall -Werror -Wextra  # TARGET을 만들 때 사용될 C 플래그\nTARGET = power_exe # 최종 생성될 파일\nOBJECTS = main.o # Target을 만들 때 사용될 오브젝트 파일\n\nLIB_NAME = test# 라이브러리의 이름 지정\nLIB_OBJS = test.o abcd.o # 라이브러리에 사용할 목적 파일들 지정\nLIB_FILE_NAME = lib$(LIB_NAME).a # 실제 생성될 라이브러리 파일 (확장자는 .a)\nLIBS += -ltest # GCC 라이브러리 지정 옵션 (-l이름 == lib이름.a)\nLIB_DIR = -L. # GCC 라이브러리 경로 지정 옵션\n\nINC_DIR = -I./inc # #include 할 헤더 파일이 있는 경로들. 여기 기반으로 헤더파일 검색함.\n\nall : $(LIB_FILE_NAME) $(TARGET)\n\n$(LIB_FILE_NAME) : $(LIB_OBJS)\n\t$(AR) rcv $@ $^\n\t$(RANLIB) $@\n\n$(TARGET) : $(OBJECTS)\n\t$(CC) $(CFLAGS) -o $@ $^ $(LIB_DIR) $(LIBS) $(INC_DIR)\n\n%.o : %.c\n\t$(CC) $(CFLAGS) -c -o $@ $^ $(INC_DIR)\n\nclean:\n\trm -f $(OBJECTS) $(LIB_FILE_NAME)\n\nfclean: clean\n\trm -f $(TARGET)\n\nre: fclean all\n\n.PHONY: all clean fclean re</code></pre>\n<!-- /wp:code -->\n\n<!-- wp:paragraph -->\n<p><code>.PHONY</code> : 만약 폴더에 이름이 <code>clean</code> 이라는 파일이 존재하면,  <code>make clean</code> 이라는 명령을 수행해도 이 타겟은 이미 완료되었다고 간주되어 아무런 일이 일어나지 않는다. 그래서 <code>make clean</code> 을 했을 때 이 <code>clean</code>은 가짜 타겟이라는 것을 명시하기 위해 <code>.PHONY</code>에 놓는다. <code>.PHONY</code>에 있는 타겟들은 <code>clean</code> 이라는 이름을 가진 파일이 있어도 무조건 명령을 수행한다.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":4} -->\n<h4>특정 타겟 이름의 의미는?</h4>\n<!-- /wp:heading -->\n\n<!-- wp:list -->\n<ul><li><code>all</code> : 최상단에 위치, 완전한 빌드(컴파일)을 의미함.</li><li><code>clean</code> : 최종 실행 파일을 제외한 나머지 생성된 파일(<code>.o</code> 등) 삭제</li><li><code>fclean</code> : 최종 파일 포함 생성한  삭제.</li><li><code>re</code> : <code>fclean</code>, <code>all</code> 순차적으로 실행. </li></ul>\n<!-- /wp:list -->\n\n<!-- wp:heading {"level":3} -->\n<h3>세부 사용법</h3>\n<!-- /wp:heading -->\n\n<!-- wp:heading {"level":4} -->\n<h4>특정 타겟을 실행하고 싶다면?</h4>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p><code>make 타겟이름</code></p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":4} -->\n<h4>실행하는 모든 명령을 출력하는 방법</h4>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>그냥 그대로 쓰면 된다. 명령어 제일 앞에 <code>@</code>를 넣어주면 (예: <code>@$(CC) $(CFLAGS) -o $@ $^ $(LIB_DIR) $(LIBS)</code> 해당 명령어는 화면에 보이지 않는다.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":4} -->\n<h4>소스 파일의 디렉토리 설정법</h4>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>소스 파일들을 설정할 때 일일히 폴더를 지정해주자. <code>gcc</code> 옵션으로는 존재하지 않는다.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":4} -->\n<h4>헤더 파일의 디렉토리 설정법</h4>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>위 예제에서 <code>INC_DIR</code> 참조. gcc 에서는 <code>-I</code> 옵션을 통해 <code>#include</code> 할 경로를 추가해줄 수 있다.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>lib 파일의 출력 디렉토리 설정법</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>gcc 빌드할 때 -o 에 디렉토리 설정해주면 되지 않을까?</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p></p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>메모리 할당과 해제</h2>\n<!-- /wp:heading -->\n\n<!-- wp:heading {"level":3} -->\n<h3><code>malloc</code></h3>\n<!-- /wp:heading -->\n\n<!-- wp:list -->\n<ul><li>헤더: <code><stdlib.h></code></li><li>함수 정의: <code>void * malloc(size_t size);</code></li><li>리턴: 성공시 어떤 포인터, 실패시 0</li><li>예제: <code>char *p = (char *)malloc(sizeof(char) * 10);</code></li></ul>\n<!-- /wp:list -->\n\n<!-- wp:heading {"level":3} -->\n<h3><code>free</code></h3>\n<!-- /wp:heading -->\n\n<!-- wp:list -->\n<ul><li>함수 정의: <code>void free(void *ptr);</code></li><li><code>free</code>는 해당하는 포인터를 해제합니다. 아무것도 리턴하지 않습니다.</li></ul>\n<!-- /wp:list -->\n\n<!-- wp:paragraph -->\n<p>올바르지 않은 <code>ptr</code>이 들어가는 상황에 대한 표준 규약은 없습니다. 메모리 할당을 어떻게 구현하는지는 플랫폼에 따라 달라지지만, 일반적으로 "시작 주소"와 "길이" 정보를 가지고 있는 내부 테이블이 존재합니다. 해제하고자 하는 포인터와 관련이 없이 아예 무관한 다른 데이터를 해제해버릴 가능성을 원천 차단하기 위해, <code>free</code>는 대부분의 경우 정확한 주소가 들어왔을 때에만 처리하고 올바르지 않은 주소가 들어왔을 때엔 에러로 간주하고 즉시 보고하는 식으로 설계되어 있습니다.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>파일 읽고 쓰기</h2>\n<!-- /wp:heading -->\n\n<!-- wp:heading {"level":3} -->\n<h3><code>open</code></h3>\n<!-- /wp:heading -->\n\n<!-- wp:list -->\n<ul><li>헤더: <code><fcntl.h></code></li><li>함수 정의: <code>int open(const char *path, int oflag, ...);</code></li><li>동작: 새 파일을 열면서 새 디스크립터를 할당</li><li>리턴값: 성공하면 양의 정수 (파일 디스크럽터 넘버)가 리턴되고, 실패하면 글로벌 변수인 <code>errno</code>를 설정하고 <code>-1</code>를 리턴한다.</li><li>매뉴얼 : <code>man 2 open</code></li></ul>\n<!-- /wp:list -->\n\n<!-- wp:heading {"level":4} -->\n<h4>oflag</h4>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>아래 값들을 or 연산을 하여 넣으면 됨.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:code {"className":"language-plaintext"} -->\n<pre class="wp-block-code language-plaintext"><code>       O_RDONLY        읽기 전용으로 열기\n       O_WRONLY        쓰기 전용으로 열기\n       O_RDWR          읽기/쓰기로 열기\n       O_NONBLOCK      do not block on open or for data to become available\n       O_APPEND        append on each write\n       O_CREAT         파일이 있지 않으면 생성\n       O_TRUNC         truncate size to 0\n       O_EXCL          error if O_CREAT and the file exists\n       O_SHLOCK        atomically obtain a shared lock\n       O_EXLOCK        atomically obtain an exclusive lock\n       O_NOFOLLOW      do not follow symlinks\n       O_SYMLINK       allow open of symlinks</code></pre>\n<!-- /wp:code -->\n\n<!-- wp:paragraph -->\n<p>O_EXCL : 심볼릭 링크도 무조건 실패한다.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":4} -->\n<h4>mode_t</h4>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>헤더: <sys/stat.h></p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>플래그를 <code>O_CREAT</code> 로 하면 세 번째 인수로 파일 권한 설정인 mode_t 를 설정해야 함.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2></h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p></p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading {"level":3} -->\n<h3><code>close</code></h3>\n<!-- /wp:heading -->\n\n<!-- wp:list -->\n<ul><li>함수 정의: <code>int close(int fildes)</code></li><li>간략 설명: 파일 디스크립터를 넣어서 해당 연결을 해제시킨다.</li><li>Return Value: 성공적으로 마쳤으면 <code>0</code>을 리턴한다. 그 이외에는 <code>-1</code>를 리턴하며, 글로벌 변수인 <code>errno</code>가 설정된다.</li><li>매뉴얼 : <code>man 2 close</code></li></ul>\n<!-- /wp:list -->\n\n<!-- wp:heading {"level":4} -->\n<h4>에러</h4>\n<!-- /wp:heading -->\n\n<!-- wp:code {"className":"language-plaintext"} -->\n<pre class="wp-block-code language-plaintext"><code> The close() system call will fail if:\n\n &#91;EBADF]        유효하지 않거나 활성화되지 않은 파일 디스크립터임.\n &#91;EINTR]        시그널(강제 취소 등)에 의해 중단됨.\n &#91;EIO]          A previously-uncommitted write(2) 가 입출력 에러를 일으킴.\n\nssize_t read(int fildes, void *buf, size_t nbyte);\nssize_t write(int fildes, const void *buf, size_t nbyte);</code></pre>\n<!-- /wp:code -->\n\n<!-- wp:heading {"level":3} -->\n<h3><code>read</code></h3>\n<!-- /wp:heading -->\n\n<!-- wp:list -->\n<ul><li>헤더: <code><unistd.h></code></li><li>선언: <code>ssize_t read(int fildes, void *buf, size_t nbyte);</code></li><li>동작: 파일 디스크럽터에 해당하는 파일을 <code>nbyte</code>만큼 읽고 <code>buf</code>에 복사함. 내부의 포인터가 읽은 만큼 자동으로 이동됨 (<code>read(fd, buffer, 10)</code>를 반복한다면, 10칸씩 순차적으로 read 됨.)</li><li>리턴: 성공적으로 읽을 시 읽은 바이트 수를 리턴함. 파일의 끝에 도달했다면 <code>0</code>을 리턴함. 에러일시 <code>-1</code>를 리턴하고 글로벌 변수인 <code>errno</code>를 설정함.</li></ul>\n<!-- /wp:list -->\n\n<!-- wp:heading {"level":3} -->\n<h3><code>write</code></h3>\n<!-- /wp:heading -->\n\n<!-- wp:list -->\n<ul><li>헤더: <code><unistd.h></code></li><li>선언: <code>ssize_t write(int fildes, const void *buf, size_t nbyte);</code></li><li>동작: 해당 파일 디스크립터에 해당하는 IO에 <code>buf</code>의 <code>nbyte</code>만큼 써넣음.</li><li>리턴: 성공적으로 wirte 한 바이트 수를 리턴함. 에러일시 <code>-1</code>를 리턴하고 글로벌 변수인 <code>errno</code>를 설정함.</li></ul>\n<!-- /wp:list -->\n\n<!-- wp:heading {"level":3} -->\n<h3><code>strerror</code></h3>\n<!-- /wp:heading -->\n\n<!-- wp:list -->\n<ul><li>헤더 : <code><string.h></code></li><li>선언 : <code>char* strerror(int errnum);</code></li><li>동작 및 리턴: <code>errnum</code>를 넣으면 이를 설명해주는 문자열 리터럴을 리턴해준다.</li></ul>\n<!-- /wp:list -->\n\n<!-- wp:heading -->\n<h2><code>ssize_t</code>란?</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>사이트를 나타내는 변수에 대한 타입이긴 한데, 사실 사이즈는 양수만 있어도 되지만, (그래서 <code>size_t</code>라는 양수 전용 타입이 있지만) 입출력을 할 때 에러를 처리하기 위해 음수까지 열어놓은 사이즈라고 보면 됨. <code>ssize_t</code>를 리턴하는 함수들은 에러일 때 <code>-1</code>를 리턴하는 경향이 있음.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p><code>ssize_t</code>를 이용하는 함수들이 있는 헤더파일을 불러올 때, 알아서 불러오므로 무엇을 include 해야 하는지에 대한 건 신경쓸 필요 없음.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2><code>errno</code> 변수 이용법</h2>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p><code>errno</code> 변수를 쓰기 위해서는 <code><errno.h></code>헤더를 선언해야 한다. <code>extern int errno;</code> 이렇게 선언되어 있다. 이 변수는 다른 함수를 호출할 때 값이 바뀌기 때문에 따로 저장해두는 게 좋을 수도 있다.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p><code>man errno</code> 하여 에러의 종류를 확인할 수 있음.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p></p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p></p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p></p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>man close, open, read, write, strerror, basename</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>c10. Makefile 끝판왕. close, open, read, write, malloc, free, strerror, basename 에 대한 확실한 숙지 필요. ulimit 사용법(크기제한 확인하는 명령어),  hexdump 명령어 (-C 옵션), tail 명령어 ( -c 옵션)</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>c11. 함수포인터</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>c12. 연결리스트.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>c13. binary tree</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:heading -->\n<h2>기타</h2>\n<!-- /wp:heading -->\n\n<!-- wp:heading {"level":3} -->\n<h3>매뉴얼 숫자의 의미</h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>MANUAL SECTIONS<br>The standard sections of the manual include:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:code {"className":"language-plaintext"} -->\n<pre class="wp-block-code language-plaintext"><code>1      User Commands\n2      System Calls\n3      C Library Functions\n4      Devices and Special Files\n5      File Formats and Conventions\n6      Games et. al.\n7      Miscellanea\n8      System Administration tools and Daemons</code></pre>\n<!-- /wp:code -->\n\n<!-- wp:heading {"level":3} -->\n<h3><code>exit(1)</code></h3>\n<!-- /wp:heading -->\n\n<!-- wp:paragraph -->\n<p>정상적으로 종료한다는 뜻.</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p></p>\n<!-- /wp:paragraph -->';

test("code 태그 안의 문자들이 모두 sanitize 되어야 함", () => {
  const result = sanitize(fixture);
  expect(result).toMatchInlineSnapshot(`
    "<!-- wp:heading -->
    <h2>구조체(<code>struct</code>)</h2>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p>여러가지 변수를 모아둔 것.</p>
    <!-- /wp:paragraph -->

    <!-- wp:heading {\\"level\\":3} -->
    <h3>선언하는 법</h3>
    <!-- /wp:heading -->

    <!-- wp:code {\\"className\\":\\"language-c\\"} -->
    <pre class=\\"wp-block-code language-c\\"><code>/* 노미네뜨 검증 X */
    struct Person
    {
        char name&#91;20];
        int age;
        char address&#91;100];
    };

    struct Person p; /* 변수 만들때 .*/</code></pre>
    <!-- /wp:code -->

    <!-- wp:heading {\\"level\\":3} -->
    <h3>예제</h3>
    <!-- /wp:heading -->

    <!-- wp:code {\\"className\\":\\"language-c\\"} -->
    <pre class=\\"wp-block-code language-c\\"><code>/* 노미네뜨 검증 X */
    #include &lt;stdlib.h&gt;
    #include &lt;stdio.h&gt;

    struct Person
    {
    	char name&#91;20];
    	int age;
    	char address&#91;100];
    };

    int main()
    {
    	struct Person p; /* 실제 변수를 만듬*/
    	p.age = 5;		 /* 변수의 멤버에 접근 */
    	printf(\\"%d\\\\n\\", p.age);

    	struct Person *pp;
    	pp = &p;
    	pp-&gt;age = 10; /* (*pp).age = 10 과 동일 */
    	printf(\\"%d\\\\n\\", pp-&gt;age);

    	struct Person *malp;
    	malp = (struct Person *)malloc(sizeof(struct Person) * 1); /* sizeof 를 이용하여 필요한 메모리 계산 */
    	malp-&gt;age = 20;
    	printf(\\"%d\\\\n\\", malp-&gt;age);
    }</code></pre>
    <!-- /wp:code -->

    <!-- wp:code {\\"className\\":\\"language-plaintext\\"} -->
    <pre class=\\"wp-block-code language-plaintext\\"><code>5
    10
    20</code></pre>
    <!-- /wp:code -->

    <!-- wp:heading {\\"level\\":3} -->
    <h3>Norminette</h3>
    <!-- /wp:heading -->

    <!-- wp:list -->
    <ul><li>이름은 알파벳 소문자, 숫자, '_' (Unix 문자) 로만 이루어져야 합니다.</li><li><code>struct</code>의 이름은 <code>s_ </code>로 시작해야 합니다.</li><li><code>struct</code>, <code>union</code>, <code>enum</code>을 선언할 때에는 탭을 삽입하시기 바랍니다.</li><li><code>struct</code>, <code>union</code>, <code>enum</code> 타입의 변수를 만들 때에는 자료형에 스페이스가 하나 존재해야 합니다. (예: <code>struct스페이스바s_abc탭a;</code>)</li><li><code>.c</code> 파일에 선언하는 하지 마십시오.</li></ul>
    <!-- /wp:list -->

    <!-- wp:heading -->
    <h2><code>typedef</code></h2>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p><code>struct</code>, <code>union</code>, <code>enum</code>을 좀 더 간편하게 쓸 수 있도록 별칭을 만드는 것. 예를 들어 이미 만들어둔 <code>s_abc</code> 구조체에 대해 <code>typedef struct s_abc t_abc</code> 라고 하게 되면 앞으로 <code>struct s_abc</code> 라고 길게 쓰지 않고 <code>t_abc</code> 로 간편하게 쓸 수 있다.</p>
    <!-- /wp:paragraph -->

    <!-- wp:heading {\\"level\\":3} -->
    <h3>Norminette</h3>
    <!-- /wp:heading -->

    <!-- wp:image {\\"id\\":2055,\\"sizeSlug\\":\\"large\\"} -->
    <figure class=\\"wp-block-image size-large\\"><img src=\\"https://elvanov.com/elvanov/wp-content/uploads/2020/07/type1.jpg\\" alt=\\"\\" class=\\"wp-image-2055\\"/><figcaption>norminette 안걸리게 하기. 내부 인자에 맞게 <code>t_bar</code>를 맞춘 다음, <code>s_abc</code>를 <code>t_bar</code>에 맞춘다. <code>t_abc</code>는 그냥 직전에 탭 하나만 있으면 되는 듯.</figcaption></figure>
    <!-- /wp:image -->

    <!-- wp:heading -->
    <h2>정적 라이브러리 (.a 파일)</h2>
    <!-- /wp:heading -->

    <!-- wp:quote -->
    <blockquote class=\\"wp-block-quote\\"><p>뭔가 라이브러리 부분은 러쉬나 BSQ에서 이용하진 않을 것 같은 뇌피셜</p></blockquote>
    <!-- /wp:quote -->

    <!-- wp:code {\\"className\\":\\"language-bash\\"} -->
    <pre class=\\"wp-block-code language-bash\\"><code># 파일은 mysum.c, mysum.h 두 개의 파일이 존재한다고 가정
    gcc -c mysum.c
    ar rcv libmysum.a mysum.o</code></pre>
    <!-- /wp:code -->

    <!-- wp:paragraph -->
    <p>정적 라이브러리는 단순히 보통의 목적파일(object file)의 모음이다. 관례적으로, 정적 라이브러리는 \`\`.a''의 확장자로 끝난다. 이것은 ar(archiver)프로그램에 의해서 만들어진다.</p>
    <!-- /wp:paragraph -->

    <!-- wp:paragraph -->
    <p>위의 프로그램을 컴파일 하기 위해서는 라이브러리의 위치와 어떤 라이브러리를 사용할것인지를 알려줘야 한다. 라이브러리의 위치는 '-L' 옵션을 이용해서 알려줄수 있으며, '-l' 옵션을 이용해서 어떤 라이브러리를 사용할것인지를 알려줄수 있다. -l 뒤에 사용될 라이브러리 이름은 라이브러리의 이름에서 \\"lib\\"와 확장자 \\"a\\"를 제외한 나머지 이름이다. 즉 libmysum.a 를 사용할 것이라면 \\"-lmysum\\" 이 될것이다.</p>
    <!-- /wp:paragraph -->

    <!-- wp:code {\\"className\\":\\"language-bash\\"} -->
    <pre class=\\"wp-block-code language-bash\\"><code>gcc -o print_sum print_num.c -L./ -lmysum</code></pre>
    <!-- /wp:code -->

    <!-- wp:paragraph -->
    <p>동적 라이브러리를 배우지는 않지만 간략히 언급만 하고 넘어간다면, 동적 라이브러리는 정적 라이브러리처럼 컴파일 시 링크되는 개념이 아니라, 컴파일 때에는 본체 프로그램만 하고, 라이브러리는 프로그램을 실행할 때 가져온다는 차이가 있다. (.dll 파일)</p>
    <!-- /wp:paragraph -->

    <!-- wp:heading -->
    <h2>헤더 파일</h2>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p>헤더 파일과 </p>
    <!-- /wp:paragraph -->

    <!-- wp:paragraph -->
    <p>헤더 파일과 라이브러리의 차이가 뭐냐고 묻는다면, 이는 사실 완전히 성격이 다른 것이다. 라이브러리란 유용하게 갖다 쓸 함수들이 컴파일된 채로 있는 걸 의미하며,  헤더 파일은 어떤 기능을 구현하고자 할 때 \\"구현부인 소스 파일과 선언부인 헤더 파일로 나누</p>
    <!-- /wp:paragraph -->

    <!-- wp:heading -->
    <h2>컴파일 과정</h2>
    <!-- /wp:heading -->

    <!-- wp:list {\\"ordered\\":true} -->
    <ol><li><strong>전처리기</strong>: <code>#define</code>, <code>#include</code> 등의 매크로를 처리하여 매크로 없는 깔끔한 소스 파일을 제작함 <code>#include</code> 는 기능적으로는 복사 붙여넣기와 같음.</li><li><strong>컴파일</strong>. 소스코드를 실행가능한 파일로 변환하는 과정. 문법 에러 등 에러 발생시 실패. 성공하면 목적 파일(오브젝트 파일, <code>.o</code> 파일)이 생성됨.</li><li><strong>링크</strong>. 실행가능한 파일들을 묶고 조합하는 과정. 함수 등의 기능을 실제로 사용하려고 하지만, 그 내용을 찾는 데 실패했을 때(구현부를 컴파일할 때 포함시키지 않으면) 에러가 뜸. 구체적인 에러 위치를 알려주지 않음.</li></ol>
    <!-- /wp:list -->

    <!-- wp:heading -->
    <h2>Makefile</h2>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p><code>gcc -o .. 소스파일.. 라이브러리..</code> 등등.. 너무 명령어가 길어지니까 이것들을 절차에 맞게 잘 컴파일할 수 있도록 <strong>컴파일 방법을 <code>Makefile</code> 이라는 파일에 적어두고</strong>, <strong><code>make</code> 명령어</strong>로 컴파일 및 빌드할 수 있음.</p>
    <!-- /wp:paragraph -->

    <!-- wp:heading {\\"level\\":3} -->
    <h3>파일 내부 구조</h3>
    <!-- /wp:heading -->

    <!-- wp:image {\\"id\\":2065,\\"sizeSlug\\":\\"large\\"} -->
    <figure class=\\"wp-block-image size-large\\"><img src=\\"https://elvanov.com/elvanov/wp-content/uploads/2020/07/Makefile기본구조.jpg\\" alt=\\"\\" class=\\"wp-image-2065\\"/></figure>
    <!-- /wp:image -->

    <!-- wp:list -->
    <ul><li>매크로 : 반복적으로 쓸 문자를 변수처럼 정의해줌. 매크로에 매크로를 정의할 수 있음. 매크로를 불러올 땐 <code>$(매크로이름)</code>로 함.</li><li>타겟절 : <strong>목표, 룰, 라벨</strong>이라고도 함. 목표! 기본적으로 만들어야 할 파일 이름이 옴. (예: <code>something.o</code>) 후술할 특수 목적 타겟도 있음. (<code>all</code>, <code>clean</code>, <code>re</code> 등)</li><li>의존성 : 해당 타겟이 완성되기 전에 미리 완성되어야 할 다른 타겟들을 적음.</li><li>명령어 : 해당 타겟을 완성시키기 위한 명령어를 적음. 앞에 탭 하나가 있어야 함. 해당 타겟을 완성하려고 할 때 실행되는 실제 명령어</li></ul>
    <!-- /wp:list -->

    <!-- wp:heading {\\"level\\":3} -->
    <h3>특수 매크로</h3>
    <!-- /wp:heading -->

    <!-- wp:list -->
    <ul><li><code>$@</code> : 해당 타겟을 의미. (타겟 정의시 <code>:</code> 왼쪽에 있는 문자들)</li><li><code>$^</code> : 해당 모든 의존성을 의미. (타겟 정의시 <code>:</code> 오른쪽에 있는 문자들)</li></ul>
    <!-- /wp:list -->

    <!-- wp:heading {\\"level\\":3} -->
    <h3>기초 실행법</h3>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p><code>Makefile</code>이 있는 폴더 (프로젝트 폴더)에 들어가서 <code>make</code> 명령어를 치면된다. 아무런 인수 없이 <code>make</code> 명령을 실행한다면 최상단에 있는 목표(룰, 타겟)가 실행된다. 그러므로 <code>all</code> 룰을 제일 위에 두자.</p>
    <!-- /wp:paragraph -->

    <!-- wp:heading {\\"level\\":3} -->
    <h3>예제</h3>
    <!-- /wp:heading -->

    <!-- wp:code {\\"className\\":\\"language-makefile\\"} -->
    <pre class=\\"wp-block-code language-makefile\\"><code>CC = gcc 
    AR = ar
    RANLIB = ranlib
    CFLAGS = -Wall -Werror -Wextra  # TARGET을 만들 때 사용될 C 플래그
    TARGET = power_exe # 최종 생성될 파일
    OBJECTS = main.o # Target을 만들 때 사용될 오브젝트 파일

    LIB_NAME = test# 라이브러리의 이름 지정
    LIB_OBJS = test.o abcd.o # 라이브러리에 사용할 목적 파일들 지정
    LIB_FILE_NAME = lib$(LIB_NAME).a # 실제 생성될 라이브러리 파일 (확장자는 .a)
    LIBS += -ltest # GCC 라이브러리 지정 옵션 (-l이름 == lib이름.a)
    LIB_DIR = -L. # GCC 라이브러리 경로 지정 옵션

    INC_DIR = -I./inc # #include 할 헤더 파일이 있는 경로들. 여기 기반으로 헤더파일 검색함.

    all : $(LIB_FILE_NAME) $(TARGET)

    $(LIB_FILE_NAME) : $(LIB_OBJS)
    	$(AR) rcv $@ $^
    	$(RANLIB) $@

    $(TARGET) : $(OBJECTS)
    	$(CC) $(CFLAGS) -o $@ $^ $(LIB_DIR) $(LIBS) $(INC_DIR)

    %.o : %.c
    	$(CC) $(CFLAGS) -c -o $@ $^ $(INC_DIR)

    clean:
    	rm -f $(OBJECTS) $(LIB_FILE_NAME)

    fclean: clean
    	rm -f $(TARGET)

    re: fclean all

    .PHONY: all clean fclean re</code></pre>
    <!-- /wp:code -->

    <!-- wp:paragraph -->
    <p><code>.PHONY</code> : 만약 폴더에 이름이 <code>clean</code> 이라는 파일이 존재하면,  <code>make clean</code> 이라는 명령을 수행해도 이 타겟은 이미 완료되었다고 간주되어 아무런 일이 일어나지 않는다. 그래서 <code>make clean</code> 을 했을 때 이 <code>clean</code>은 가짜 타겟이라는 것을 명시하기 위해 <code>.PHONY</code>에 놓는다. <code>.PHONY</code>에 있는 타겟들은 <code>clean</code> 이라는 이름을 가진 파일이 있어도 무조건 명령을 수행한다.</p>
    <!-- /wp:paragraph -->

    <!-- wp:heading {\\"level\\":4} -->
    <h4>특정 타겟 이름의 의미는?</h4>
    <!-- /wp:heading -->

    <!-- wp:list -->
    <ul><li><code>all</code> : 최상단에 위치, 완전한 빌드(컴파일)을 의미함.</li><li><code>clean</code> : 최종 실행 파일을 제외한 나머지 생성된 파일(<code>.o</code> 등) 삭제</li><li><code>fclean</code> : 최종 파일 포함 생성한  삭제.</li><li><code>re</code> : <code>fclean</code>, <code>all</code> 순차적으로 실행. </li></ul>
    <!-- /wp:list -->

    <!-- wp:heading {\\"level\\":3} -->
    <h3>세부 사용법</h3>
    <!-- /wp:heading -->

    <!-- wp:heading {\\"level\\":4} -->
    <h4>특정 타겟을 실행하고 싶다면?</h4>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p><code>make 타겟이름</code></p>
    <!-- /wp:paragraph -->

    <!-- wp:heading {\\"level\\":4} -->
    <h4>실행하는 모든 명령을 출력하는 방법</h4>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p>그냥 그대로 쓰면 된다. 명령어 제일 앞에 <code>@</code>를 넣어주면 (예: <code>@$(CC) $(CFLAGS) -o $@ $^ $(LIB_DIR) $(LIBS)</code> 해당 명령어는 화면에 보이지 않는다.</p>
    <!-- /wp:paragraph -->

    <!-- wp:heading {\\"level\\":4} -->
    <h4>소스 파일의 디렉토리 설정법</h4>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p>소스 파일들을 설정할 때 일일히 폴더를 지정해주자. <code>gcc</code> 옵션으로는 존재하지 않는다.</p>
    <!-- /wp:paragraph -->

    <!-- wp:heading {\\"level\\":4} -->
    <h4>헤더 파일의 디렉토리 설정법</h4>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p>위 예제에서 <code>INC_DIR</code> 참조. gcc 에서는 <code>-I</code> 옵션을 통해 <code>#include</code> 할 경로를 추가해줄 수 있다.</p>
    <!-- /wp:paragraph -->

    <!-- wp:paragraph -->
    <p>lib 파일의 출력 디렉토리 설정법</p>
    <!-- /wp:paragraph -->

    <!-- wp:paragraph -->
    <p>gcc 빌드할 때 -o 에 디렉토리 설정해주면 되지 않을까?</p>
    <!-- /wp:paragraph -->

    <!-- wp:paragraph -->
    <p></p>
    <!-- /wp:paragraph -->

    <!-- wp:heading -->
    <h2>메모리 할당과 해제</h2>
    <!-- /wp:heading -->

    <!-- wp:heading {\\"level\\":3} -->
    <h3><code>malloc</code></h3>
    <!-- /wp:heading -->

    <!-- wp:list -->
    <ul><li>헤더: <code>&lt;stdlib.h&gt;</code></li><li>함수 정의: <code>void * malloc(size_t size);</code></li><li>리턴: 성공시 어떤 포인터, 실패시 0</li><li>예제: <code>char *p = (char *)malloc(sizeof(char) * 10);</code></li></ul>
    <!-- /wp:list -->

    <!-- wp:heading {\\"level\\":3} -->
    <h3><code>free</code></h3>
    <!-- /wp:heading -->

    <!-- wp:list -->
    <ul><li>함수 정의: <code>void free(void *ptr);</code></li><li><code>free</code>는 해당하는 포인터를 해제합니다. 아무것도 리턴하지 않습니다.</li></ul>
    <!-- /wp:list -->

    <!-- wp:paragraph -->
    <p>올바르지 않은 <code>ptr</code>이 들어가는 상황에 대한 표준 규약은 없습니다. 메모리 할당을 어떻게 구현하는지는 플랫폼에 따라 달라지지만, 일반적으로 \\"시작 주소\\"와 \\"길이\\" 정보를 가지고 있는 내부 테이블이 존재합니다. 해제하고자 하는 포인터와 관련이 없이 아예 무관한 다른 데이터를 해제해버릴 가능성을 원천 차단하기 위해, <code>free</code>는 대부분의 경우 정확한 주소가 들어왔을 때에만 처리하고 올바르지 않은 주소가 들어왔을 때엔 에러로 간주하고 즉시 보고하는 식으로 설계되어 있습니다.</p>
    <!-- /wp:paragraph -->

    <!-- wp:heading -->
    <h2>파일 읽고 쓰기</h2>
    <!-- /wp:heading -->

    <!-- wp:heading {\\"level\\":3} -->
    <h3><code>open</code></h3>
    <!-- /wp:heading -->

    <!-- wp:list -->
    <ul><li>헤더: <code>&lt;fcntl.h&gt;</code></li><li>함수 정의: <code>int open(const char *path, int oflag, ...);</code></li><li>동작: 새 파일을 열면서 새 디스크립터를 할당</li><li>리턴값: 성공하면 양의 정수 (파일 디스크럽터 넘버)가 리턴되고, 실패하면 글로벌 변수인 <code>errno</code>를 설정하고 <code>-1</code>를 리턴한다.</li><li>매뉴얼 : <code>man 2 open</code></li></ul>
    <!-- /wp:list -->

    <!-- wp:heading {\\"level\\":4} -->
    <h4>oflag</h4>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p>아래 값들을 or 연산을 하여 넣으면 됨.</p>
    <!-- /wp:paragraph -->

    <!-- wp:code {\\"className\\":\\"language-plaintext\\"} -->
    <pre class=\\"wp-block-code language-plaintext\\"><code>       O_RDONLY        읽기 전용으로 열기
           O_WRONLY        쓰기 전용으로 열기
           O_RDWR          읽기/쓰기로 열기
           O_NONBLOCK      do not block on open or for data to become available
           O_APPEND        append on each write
           O_CREAT         파일이 있지 않으면 생성
           O_TRUNC         truncate size to 0
           O_EXCL          error if O_CREAT and the file exists
           O_SHLOCK        atomically obtain a shared lock
           O_EXLOCK        atomically obtain an exclusive lock
           O_NOFOLLOW      do not follow symlinks
           O_SYMLINK       allow open of symlinks</code></pre>
    <!-- /wp:code -->

    <!-- wp:paragraph -->
    <p>O_EXCL : 심볼릭 링크도 무조건 실패한다.</p>
    <!-- /wp:paragraph -->

    <!-- wp:heading {\\"level\\":4} -->
    <h4>mode_t</h4>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p>헤더: &lt;sys/stat.h&gt;</p>
    <!-- /wp:paragraph -->

    <!-- wp:paragraph -->
    <p>플래그를 <code>O_CREAT</code> 로 하면 세 번째 인수로 파일 권한 설정인 mode_t 를 설정해야 함.</p>
    <!-- /wp:paragraph -->

    <!-- wp:heading -->
    <h2></h2>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p></p>
    <!-- /wp:paragraph -->

    <!-- wp:heading {\\"level\\":3} -->
    <h3><code>close</code></h3>
    <!-- /wp:heading -->

    <!-- wp:list -->
    <ul><li>함수 정의: <code>int close(int fildes)</code></li><li>간략 설명: 파일 디스크립터를 넣어서 해당 연결을 해제시킨다.</li><li>Return Value: 성공적으로 마쳤으면 <code>0</code>을 리턴한다. 그 이외에는 <code>-1</code>를 리턴하며, 글로벌 변수인 <code>errno</code>가 설정된다.</li><li>매뉴얼 : <code>man 2 close</code></li></ul>
    <!-- /wp:list -->

    <!-- wp:heading {\\"level\\":4} -->
    <h4>에러</h4>
    <!-- /wp:heading -->

    <!-- wp:code {\\"className\\":\\"language-plaintext\\"} -->
    <pre class=\\"wp-block-code language-plaintext\\"><code> The close() system call will fail if:

     &#91;EBADF]        유효하지 않거나 활성화되지 않은 파일 디스크립터임.
     &#91;EINTR]        시그널(강제 취소 등)에 의해 중단됨.
     &#91;EIO]          A previously-uncommitted write(2) 가 입출력 에러를 일으킴.

    ssize_t read(int fildes, void *buf, size_t nbyte);
    ssize_t write(int fildes, const void *buf, size_t nbyte);</code></pre>
    <!-- /wp:code -->

    <!-- wp:heading {\\"level\\":3} -->
    <h3><code>read</code></h3>
    <!-- /wp:heading -->

    <!-- wp:list -->
    <ul><li>헤더: <code>&lt;unistd.h&gt;</code></li><li>선언: <code>ssize_t read(int fildes, void *buf, size_t nbyte);</code></li><li>동작: 파일 디스크럽터에 해당하는 파일을 <code>nbyte</code>만큼 읽고 <code>buf</code>에 복사함. 내부의 포인터가 읽은 만큼 자동으로 이동됨 (<code>read(fd, buffer, 10)</code>를 반복한다면, 10칸씩 순차적으로 read 됨.)</li><li>리턴: 성공적으로 읽을 시 읽은 바이트 수를 리턴함. 파일의 끝에 도달했다면 <code>0</code>을 리턴함. 에러일시 <code>-1</code>를 리턴하고 글로벌 변수인 <code>errno</code>를 설정함.</li></ul>
    <!-- /wp:list -->

    <!-- wp:heading {\\"level\\":3} -->
    <h3><code>write</code></h3>
    <!-- /wp:heading -->

    <!-- wp:list -->
    <ul><li>헤더: <code>&lt;unistd.h&gt;</code></li><li>선언: <code>ssize_t write(int fildes, const void *buf, size_t nbyte);</code></li><li>동작: 해당 파일 디스크립터에 해당하는 IO에 <code>buf</code>의 <code>nbyte</code>만큼 써넣음.</li><li>리턴: 성공적으로 wirte 한 바이트 수를 리턴함. 에러일시 <code>-1</code>를 리턴하고 글로벌 변수인 <code>errno</code>를 설정함.</li></ul>
    <!-- /wp:list -->

    <!-- wp:heading {\\"level\\":3} -->
    <h3><code>strerror</code></h3>
    <!-- /wp:heading -->

    <!-- wp:list -->
    <ul><li>헤더 : <code>&lt;string.h&gt;</code></li><li>선언 : <code>char* strerror(int errnum);</code></li><li>동작 및 리턴: <code>errnum</code>를 넣으면 이를 설명해주는 문자열 리터럴을 리턴해준다.</li></ul>
    <!-- /wp:list -->

    <!-- wp:heading -->
    <h2><code>ssize_t</code>란?</h2>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p>사이트를 나타내는 변수에 대한 타입이긴 한데, 사실 사이즈는 양수만 있어도 되지만, (그래서 <code>size_t</code>라는 양수 전용 타입이 있지만) 입출력을 할 때 에러를 처리하기 위해 음수까지 열어놓은 사이즈라고 보면 됨. <code>ssize_t</code>를 리턴하는 함수들은 에러일 때 <code>-1</code>를 리턴하는 경향이 있음.</p>
    <!-- /wp:paragraph -->

    <!-- wp:paragraph -->
    <p><code>ssize_t</code>를 이용하는 함수들이 있는 헤더파일을 불러올 때, 알아서 불러오므로 무엇을 include 해야 하는지에 대한 건 신경쓸 필요 없음.</p>
    <!-- /wp:paragraph -->

    <!-- wp:heading -->
    <h2><code>errno</code> 변수 이용법</h2>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p><code>errno</code> 변수를 쓰기 위해서는 <code>&lt;errno.h&gt;</code>헤더를 선언해야 한다. <code>extern int errno;</code> 이렇게 선언되어 있다. 이 변수는 다른 함수를 호출할 때 값이 바뀌기 때문에 따로 저장해두는 게 좋을 수도 있다.</p>
    <!-- /wp:paragraph -->

    <!-- wp:paragraph -->
    <p><code>man errno</code> 하여 에러의 종류를 확인할 수 있음.</p>
    <!-- /wp:paragraph -->

    <!-- wp:paragraph -->
    <p></p>
    <!-- /wp:paragraph -->

    <!-- wp:paragraph -->
    <p></p>
    <!-- /wp:paragraph -->

    <!-- wp:paragraph -->
    <p></p>
    <!-- /wp:paragraph -->

    <!-- wp:paragraph -->
    <p>man close, open, read, write, strerror, basename</p>
    <!-- /wp:paragraph -->

    <!-- wp:paragraph -->
    <p>c10. Makefile 끝판왕. close, open, read, write, malloc, free, strerror, basename 에 대한 확실한 숙지 필요. ulimit 사용법(크기제한 확인하는 명령어),  hexdump 명령어 (-C 옵션), tail 명령어 ( -c 옵션)</p>
    <!-- /wp:paragraph -->

    <!-- wp:paragraph -->
    <p>c11. 함수포인터</p>
    <!-- /wp:paragraph -->

    <!-- wp:paragraph -->
    <p>c12. 연결리스트.</p>
    <!-- /wp:paragraph -->

    <!-- wp:paragraph -->
    <p>c13. binary tree</p>
    <!-- /wp:paragraph -->

    <!-- wp:heading -->
    <h2>기타</h2>
    <!-- /wp:heading -->

    <!-- wp:heading {\\"level\\":3} -->
    <h3>매뉴얼 숫자의 의미</h3>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p>MANUAL SECTIONS<br>The standard sections of the manual include:</p>
    <!-- /wp:paragraph -->

    <!-- wp:code {\\"className\\":\\"language-plaintext\\"} -->
    <pre class=\\"wp-block-code language-plaintext\\"><code>1      User Commands
    2      System Calls
    3      C Library Functions
    4      Devices and Special Files
    5      File Formats and Conventions
    6      Games et. al.
    7      Miscellanea
    8      System Administration tools and Daemons</code></pre>
    <!-- /wp:code -->

    <!-- wp:heading {\\"level\\":3} -->
    <h3><code>exit(1)</code></h3>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p>정상적으로 종료한다는 뜻.</p>
    <!-- /wp:paragraph -->

    <!-- wp:paragraph -->
    <p></p>
    <!-- /wp:paragraph -->"
  `);
});
