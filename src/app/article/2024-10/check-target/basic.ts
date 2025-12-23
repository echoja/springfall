/** @lintignore */
export type Target = IGenderTarget | IAgeTarget | ITargetGroup | IRootTarget;

export interface IRootTarget {
  type: "root";
  child: Target;
}

/** @lintignore */
export interface ITargetGroup {
  type: "group";
  operator: "and" | "or";
  children: Target[];
}

export interface IGenderTarget {
  type: "gender";
  value: "male" | "female";
}

export interface IAgeTarget {
  type: "age";
  operator: "<" | ">" | "<=" | ">=";
  value: number;
}

/** @lintignore */
export interface IEnv {
  user: IUser;
}

interface IUser {
  age?: number;
  gender?: "male" | "female";
}

type Result =
  | {
      type: "success";
    }
  | {
      type: "failure";
      reason: string;
    }
  | {
      type: "ignore";
    };

type CheckTarget = (target: Target, env: IEnv) => Result;

export const checkTarget: CheckTarget = (target, env) => {
  switch (target.type) {
    case "root":
      return checkTarget(target.child, env);
    case "group":
      return checkGroup(target, env);
    case "age":
      return checkAge(target, env);
    case "gender":
      return checkGender(target, env);
  }
  return { type: "ignore" };
};

const checkGroup = (target: ITargetGroup, env: IEnv): Result => {
  const results = target.children
    .map((child) => checkTarget(child, env))
    .filter((result) => result.type !== "ignore");

  if (results.length === 0) {
    return { type: "ignore" };
  }

  const failures = results.filter(
    (result): result is Extract<typeof result, { type: "failure" }> =>
      result.type === "failure",
  );

  // And
  if (target.operator === "and") {
    if (failures.length === 0) {
      return { type: "success" };
    }

    return {
      type: "failure",
      reason: failures.map((failure) => failure.reason).join(", "),
    };
  }

  // Or
  if (target.operator === "or") {
    if (failures.length !== results.length) {
      return { type: "success" };
    }

    return {
      type: "failure",
      reason: failures.map((failure) => failure.reason).join(", "),
    };
  }

  return { type: "ignore" };
};

const checkAge = (target: IAgeTarget, env: IEnv): Result => {
  if (typeof env.user.age !== "number") {
    return { type: "ignore" };
  }

  switch (target.operator) {
    case "<":
      return env.user.age < target.value
        ? { type: "success" }
        : { type: "failure", reason: "Age is not less than " + target.value };
    case ">":
      return env.user.age > target.value
        ? { type: "success" }
        : {
            type: "failure",
            reason: "Age is not greater than " + target.value,
          };
    case "<=":
      return env.user.age <= target.value
        ? { type: "success" }
        : {
            type: "failure",
            reason: "Age is not less than or equal to " + target.value,
          };
    case ">=":
      return env.user.age >= target.value
        ? { type: "success" }
        : {
            type: "failure",
            reason: "Age is not greater than or equal to " + target.value,
          };
  }
};

const checkGender = (target: IGenderTarget, env: IEnv): Result => {
  if (typeof env.user.gender !== "string") {
    return { type: "ignore" };
  }

  return env.user.gender === target.value
    ? { type: "success" }
    : { type: "failure", reason: "gender is not " + target.value };
};
