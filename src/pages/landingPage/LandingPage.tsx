import useLoadUserData from "../../hooks/useLoadUserData";
import { Faq } from "./sections/faq/Faq";
import { Features } from "./sections/features/Features";
import { Jumbo } from "./sections/jumbo/Jumbo";
import LandingPageHeader from "./sections/landingPageHeader/LandingPageHeader";

const LandingPage = (): JSX.Element => {
  useLoadUserData();

  return (
    <>
      <LandingPageHeader />
      <Jumbo />
      <Features />
      <Faq />
    </>
  );
};

export default LandingPage;
