import { expect, describe, it } from "@jest/globals";

import { validateNewUser } from "./validation";

describe("all tests for validate file", () => {
  describe("validateNewUser", () => {
    it("should pass the validateNewUser test and return a true boolean value for the success property in the return object", () => {
      const newUser = {
        firstName: "Kor",
        lastName: "Obs",
        email: "test@gmail.com",
        password: "P@ssword123",
      };

      const expected = {
        success: true,
      };

      const result = validateNewUser(newUser);
      expect(expected).toEqual(result);
    });

    it("should not pass the validateNewUser test and return a false boolean value with a message property of array greater than one", () => {
      const newUser = {};

      const expected = {
        success: false,
        message: [
          "First name is required.",
          "Last name is required.",
          "Email is required.",
          "Not a valid email format.",
          "Password is required.",
          "Not a valid password format.",
        ],
      };
      const result = validateNewUser(newUser);
      expect(expected).toEqual(result);
      expect(expected.message.length).toEqual(6);
    });
  });
});
