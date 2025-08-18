/**
 * Workflow Step 인터페이스
 *
 * @template C 모든 Step에서 공유하는 컨텍스트 타입
 * @template A 이 Step의 action이 반환하는 rollback argument 타입
 */
export interface IStep<C, A> {
  /**
   * 실제 업무 로직
   * - ctx에 결과를 기록하고, rollback에 넘길 값을 리턴
   * - 타입스크립트가 ctx의 타입과 반환값을 자동으로 추론하도록 구현할 것
   * @param ctx 공용 컨텍스트 객체
   * @returns rollback 실행 시 필요한 데이터 (예: 생성된 리소스 ID, 변경 전 상태 등)
   */
  action: (ctx: C) => Promise<A> | A;

  /**
   * 실패 시 롤백 로직 (선택적)
   * - 이후 step에서 에러 발생 시 역순으로 호출됨
   * - action의 반환값을 받아서 롤백 작업 수행
   * @param ctx 공용 컨텍스트 객체
   * @param arg action에서 반환된 값
   */
  rollback?: (ctx: C, arg: A) => Promise<void>;
}

/**
 * Workflow 조기 종료를 위한 신호 클래스
 *
 * Step의 action에서 이 객체를 반환하면 나머지 step들을 건너뛰고
 * workflow를 정상 종료합니다 (rollback은 실행되지 않음)
 *
 * @example
 * ```typescript
 * const checkConditionStep = createStep(
 *   async (ctx: MyContext) => {
 *     if (ctx.shouldSkip) {
 *       return Workflow.exit("조건이 맞지 않아 워크플로우를 종료합니다");
 *     }
 *     return null;
 *   }
 * );
 * ```
 */
export class WorkflowStop {
  constructor(public message?: string) {
    // Set the prototype explicitly to ensure instanceof works correctly!
    Object.setPrototypeOf(this, WorkflowStop.prototype);
  }
}

/**
 * 여러 Step을 순차 실행하고, 실패 시 역순으로 rollback을 수행하는 Workflow 클래스
 *
 * **주의사항: rollback이 필요없는 상황에서는 이 Workflow를 사용하지 마세요!**
 * - 단순한 순차 처리만 필요한 경우 일반적인 함수 호출을 사용하세요
 * - 이 클래스는 복잡한 트랜잭션에서 rollback이 필요할 때만 사용하는 것이 목적입니다
 *
 * @template C 모든 Step에서 공유하는 컨텍스트 타입
 *
 * @example
 * ```typescript
 * interface MyContext {
 *   userId: string;
 *   createdResourceIds: string[];
 * }
 *
 * const workflow = new Workflow<MyContext>([
 *   createResourceStep,  // DB에 리소스 생성
 *   uploadFileStep,      // 파일 업로드
 *   sendNotificationStep // 알림 발송
 * ]);
 *
 * try {
 *   await workflow.execute({ userId: "123", createdResourceIds: [] });
 * } catch (error) {
 *   // 실패한 지점부터 역순으로 rollback이 자동 실행됨
 *   console.error("Workflow failed:", error);
 * }
 * ```
 */
export class Workflow<C> {
  /**
   * Workflow 조기 종료를 위한 헬퍼 메서드
   * @param message 종료 사유 (선택적)
   * @returns WorkflowStop 인스턴스
   */
  static exit(message?: string) {
    return new WorkflowStop(message);
  }

  /**
   * Workflow를 구성하는 Step들의 배열
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private steps: Array<IStep<C, any>>;

  /**
   * Workflow 생성자
   * @param steps 순차 실행할 Step들의 배열
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(steps: Array<IStep<C, any>>) {
    this.steps = steps;
  }

  /**
   * Workflow 실행 메서드
   *
   * 1. Step들을 순차적으로 실행
   * 2. 각 Step의 action 결과를 rollback 용으로 저장
   * 3. 실패 시 완료된 Step들을 역순으로 rollback 실행
   * 4. WorkflowStop이 반환되면 조기 종료 (정상 종료)
   *
   * @param ctx 모든 Step에서 공유하는 컨텍스트 객체
   * @throws 실행 중 발생한 에러 (rollback 실행 후 재전파)
   */
  public async execute(ctx: C): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const completed: Array<{ step: IStep<C, any>; arg: any }> = [];

    for (const step of this.steps) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let res: any;
      try {
        res = await step.action(ctx);
      } catch (err) {
        // 에러면 rollback만 하고 에러 재전파
        for (const { step: s, arg } of completed.reverse()) {
          try {
            await s.rollback?.(ctx, arg);
          } catch (e) {
            // rollback 실패는 무시하고 계속 진행

            console.error("Rollback failed:", e);
          }
        }
        throw err;
      }

      // early exit 신호면, 그냥 종료
      if (res instanceof WorkflowStop) {
        return;
      }

      // 정상 compArg를 쌓고 다음 스텝으로
      completed.push({ step, arg: res });
    }
  }
}

/**
 * Step 생성을 위한 헬퍼 함수
 *
 * TypeScript의 타입 추론을 활용하여 action 함수의 매개변수와 반환값을 자동으로 추론합니다.
 *
 * @template C 컨텍스트 타입 (action 함수의 매개변수에서 자동 추론)
 * @template A action 반환값 타입 (action 함수의 반환값에서 자동 추론)
 * @param action Step의 실행 로직
 * @param rollback Step의 롤백 로직 (선택적)
 * @returns IStep 인터페이스를 구현한 객체
 *
 * @example
 * ```typescript
 * // 타입이 자동으로 추론됨: IStep<{ userId: string; resourceId?: string }, string>
 * // \@returns ctx.resourceId
 * export const createResourceStep = createStep(
 *   async (ctx: { userId: string; resourceId?: string }) => {
 *     const resourceId = await createResource(ctx.userId);
 *     ctx.resourceId = resourceId;
 *     return resourceId; // rollback에서 삭제할 때 사용
 *   },
 *   async (ctx, resourceId) => {
 *     await deleteResource(resourceId);
 *   }
 * );
 *
 * // rollback이 없는 단순한 step
 * // @returns ctx.vendorInfo
 * export const getVendorInfoStep = createStep(
 *   async (ctx: { sitePublicId: string; vendorInfo?: VendorInfo }) => {
 *     ctx.vendorInfo = await getVendorInfo(ctx.sitePublicId);
 *     return ctx.vendorInfo;
 *   }
 * );
 * ```
 */
export function createStep<C, A>(
  action: (ctx: C) => Promise<A> | A,
  rollback?: (ctx: C, arg: A) => Promise<void>,
): IStep<C, A> {
  return { action, rollback };
}
