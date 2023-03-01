/**
 * validate signup form
 * @param {string} name - required, min 3 characters
 * @param {string} email - required, valid email format
 * @param {string} password - required, min 6 characters, must match confirmPassword
 * @param {string} confirmPassword - required, must match password
 * @returns {object} errors { email: "", password: "", name: ""}
 */

export const validateSignup = ({
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

  errors.email = validateEmail(email);
  errors.password = validatePassword(password);
  errors.name = validateName(name);
  if (password !== confirmPassword) {
    errors.password = "Passwords must match";
  }

  return errors;
};

/**
 * validate signin form
 * @param {string} email - required, valid email format
 * @param {string} password - required
 * @returns {object} errors { email: "", password: ""}
 */
export const validateSignin = ({
  email,
  password,
}: {
  email;
  password;
}): { email: string; password: string } => {
  const errors = {
    email: "",
    password: "",
  };

  errors.email = validateEmail(email);
  errors.password = !password ? "Password is required" : "";

  return errors;
};

const validateEmail = (email: string): string => {
  if (!email) {
    return "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    return "Email address is invalid";
  }
  return "";
};

const validatePassword = (password: string): string => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return "";
};

const validateName = (name: string): string => {
  if (!name) {
    return "Name is required";
  } else if (name.length < 3) {
    return "Name must be at least 3 characters";
  }
  return "";
};
