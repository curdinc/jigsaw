import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Cookies from "cookies";

import LandingPageOne from "~/components/pages/index/landingPageOne";
import { LandingPageTwo } from "~/components/pages/index/landingPageTwo";
import { env } from "~/env.mjs";

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ pageToDisplay }) => {
  return pageToDisplay === "simple" ? <LandingPageTwo /> : <LandingPageOne />;
};

export const getServerSideProps: GetServerSideProps<{
  pageToDisplay: "simple" | "full";
  // eslint-disable-next-line @typescript-eslint/require-await
}> = async ({ req, res }) => {
  // Create a cookies instance
  const cookies = new Cookies(req, res);

  const pageToDisplayCookieName = "landingPageDisplay";
  let pageToDisplay = cookies.get(pageToDisplayCookieName);

  if (!pageToDisplay) {
    pageToDisplay = Math.random() > 0.5 ? "full" : "simple";
    cookies.set(pageToDisplayCookieName, pageToDisplay, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    });
  }

  return {
    props: {
      pageToDisplay: pageToDisplay as any,
    },
  };
};

export default Home;
