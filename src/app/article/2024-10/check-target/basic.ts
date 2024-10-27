export type Target = IGenderTarget | IAgeTarget | ITargetGroup | IRootTarget;

export interface IRootTarget {
  type: "root";
  child: Target;
}

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
  if (target.children.length === 0) {
    return { type: "ignore" };
  }

  if (target.operator === "and") {
    for (const child of target.children) {
      const result = checkTarget(child, env);
      if (result.type === "failure") {
        return result;
      }
    }
    return { type: "success" };
  } else {
    for (const child of target.children) {
      const result = checkTarget(child, env);
      if (result.type === "success") {
        return result;
      }
    }
    return { type: "failure", reason: "No child matched" };
  }
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
