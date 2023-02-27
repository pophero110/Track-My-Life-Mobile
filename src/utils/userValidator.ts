/**
 * @param {string} name - required, min 3 characters
 * @param {string} email - required, valid email format
 * @param {string} password - required, min 6 characters, must match confirmPassword
 * @param {string} confirmPassword - required, must match password
 * @returns {object} errors { email: "", password: "", name: ""}
 */

export const userValidator = ({
  name,
  email,
  password,
  confirmPassword,
}: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): {
  email: string;
  password: string;
  name: string;
} => {
  const errors = {
    email: "",
    password: "",
    name: "",
  };
  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email address is invalid";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password !== confirmPassword) {
    errors.password = "Passwords must match";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!name) {
    errors.name = "Name is required";
  } else if (name.length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  return errors;
};
