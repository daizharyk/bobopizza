import styles from "./page.module.scss";
import SameTasteEverywhere from "./SameTasteEverywhere ";
import Ingredients from "./Ingredients";
import Dodo from "./Dodo";
import Gallery from "./Gallery";
import DodoBook from "./DodoBook";

const AboutUsPage = () => {
  return (
    <div className={styles.container}>
      <Dodo />
      <Ingredients />
      <SameTasteEverywhere />
      <Gallery />
      <DodoBook />
    </div>
  );
};

export default AboutUsPage;
