import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { StateMachine, isRunning } from "../src/index.ts";

describe("StateMachine", () => {
  it("creates a machine with the given initial state", () => {
    const machine = new StateMachine("idle");
    assert.equal(machine.currentState, "idle");
  });

  it("assertState does not throw when state matches", () => {
    const machine = new StateMachine("running");
    machine.assertState("running");
  });

  it("assertState throws when state does not match", () => {
    const machine = new StateMachine("idle");
    assert.throws(() => machine.assertState("running"), {
      message: "Expected state running, but was idle",
    });
  });

  it("assertNotError does not throw when not in error state", () => {
    const machine = new StateMachine("paused");
    machine.assertNotError();
  });

  it("assertNotError throws when in error state", () => {
    const machine = new StateMachine("error");
    assert.throws(() => machine.assertNotError(), {
      message: "Machine is in error state",
    });
  });

  it("transition updates state for valid transitions", () => {
    const machine = new StateMachine("idle");
    machine.transition("running");
    assert.equal(machine.currentState, "running");
  });

  it("transition throws when in error state", () => {
    const machine = new StateMachine("error");
    assert.throws(() => machine.transition("idle"), {
      message: "Machine is in error state",
    });
  });
});

describe("isRunning", () => {
  it("returns true for 'running'", () => {
    assert.equal(isRunning("running"), true);
  });

  it("returns false for 'idle'", () => {
    assert.equal(isRunning("idle"), false);
  });

  it("returns false for 'paused'", () => {
    assert.equal(isRunning("paused"), false);
  });

  it("returns false for 'error'", () => {
    assert.equal(isRunning("error"), false);
  });
});
