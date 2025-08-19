import stl from "./styles/_page.module.scss";
import OrdelCall from "./orderCall/orderCall";
import SpecialConditions from "./specialConditions/specialConditions";
import Feedback from "./feedback/feedback";
import Catalogy from "./catalogy/catalogy";
import NewSoon from "./newSoon/newSoon";
import Hero from "./hero/hero";
import AboutUs from "./about/about";

export default function Home() {
  return (
    <div className={stl.container} >
      <Hero/>
      <NewSoon/>
      <AboutUs/>
      <Catalogy/>
      <Feedback/>
      <SpecialConditions/>
      <OrdelCall/>
    </div>
  );
}
