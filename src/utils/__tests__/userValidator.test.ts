import { userValidator } from "../userValidator";

/**
 *  Test Strategy
 * - valid parameters return empty errors object
 * - email: invalid email format
 * - password: min 6 characters, must match confirmPassword
 * - confirmPassword: must match password
 * - name: min 3 characters
 */

describe("userValidator", () => {
  test("valid parameters return empty errors object", () => {
    const user = {
      name: "John Doe",
      email: "test@gmail.com",
      password: "123456",
      confirmPassword: "123456",
    };

    const errors = userValidator(user);

    expect(errors).toEqual({
      email: "",
      password: "",
      name: "",
    });
  });

  test("invalid email format", () => {
    const user = {
      name: "John Doe",
      email: "test",
      password: "123456",
      confirmPassword: "123456",
    };

    const errors = userValidator(user);

    expect(errors).toEqual({
      email: "Email address is invalid",
      password: "",
      name: "",
    });
  });

  test("confirmPassword must match password", () => {
    const user = {
      name: "John Doe",
      email: "test@gmail.com",
      password: "123456",
      confirmPassword: "1234",
    };

    const errors = userValidator(user);

    expect(errors).toEqual({
      email: "",
      password: "Passwords must match",
      name: "",
    });
  });

  test("password requires min 6 characters", () => {
    const user = {
      name: "John Doe",
      email: "test@gmail.com",
      password: "1234",
      confirmPassword: "1234",
    };

    const errors = userValidator(user);

    expect(errors).toEqual({
      email: "",
      password: "Password must be at least 6 characters",
      name: "",
    });
  });
});
