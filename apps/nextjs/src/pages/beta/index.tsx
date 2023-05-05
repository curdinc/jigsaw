function login() {
  const logoutLink = `http://localhost:3000/api/auth/logout?returnTo=${encodeURIComponent(
    "http://localhost:3000/beta",
  )}`;
  return (
    <>
      <a href="/api/auth/login">Login</a>
      <a href={logoutLink}>Logout</a>
    </>
  );
}

export default login;
