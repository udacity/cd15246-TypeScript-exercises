/**
 * Demonstrates assertion functions for state machine validation.
 * Assertion functions narrow types by throwing on invalid states.
 */

export type State = "idle" | "running" | "paused" | "error";

export class StateMachine {
  currentState: State;

  constructor(state: State) {
    this.currentState = state;
  }

  // Assertion function: throws if state is not the expected value
  assertState(expected: State): asserts this is { currentState: State } {
    if (this.currentState !== expected) {
      throw new Error(
        `Expected state ${expected}, but was ${this.currentState}`
      );
    }
  }

  // Custom assertion function
  assertNotError(): asserts this is { currentState: Exclude<State, "error"> } {
    if (this.currentState === "error") {
      throw new Error("Machine is in error state");
    }
  }

  transition(newState: State): void {
    this.assertNotError();
    this.currentState = newState;
  }
}

export function isRunning(state: State): state is "running" {
  return state === "running";
}
