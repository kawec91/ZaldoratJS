// @desc    Auth Signup User
// @route   POST /api/auth/signup
export const signup = async (req, res) => {
  res.json({ data: "Endpoint: ../signup" });
};

// @desc    Login User
// @route   POST /api/auth/login
export const login = async (req, res) => {
  res.json({ data: "Endpoint: ../login" });
};

// @desc    Logout User
// @route   POST /api/auth/logout
export const logout = async (req, res) => {
  res.json({ data: "Endpoint: ../logout" });
};
