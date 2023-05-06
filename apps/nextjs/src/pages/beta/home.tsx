import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function Home() {
  const logoutLink = `http://localhost:3000/api/auth/logout?returnTo=${encodeURIComponent(
    "http://localhost:3000/beta",
  )}`;
  return (
    <>
      <a href={logoutLink}>Logout</a>
    </>
  );
});
