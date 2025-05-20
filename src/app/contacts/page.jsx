import Search from "@/components/svg/Search";
import styles from "./page.module.scss";
import MapPin from "@/components/svg/MapPin";
import Link from "next/link";
import branches from "@/data/branches.json";

const atyrauBranches = branches.atyrau.branches;


console.log(atyrauBranches);

const ContactsPage = () => {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.blockTop}>
          <div className={styles.searchBlock}>
            <div className={styles.city}>Атырау</div>
            <div className={styles.searchWrapper}>
              <div className={styles.searchInputWrapper}>
                <Search className={styles.searchSvg} />
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Район, улица или станция метро"
                  className={styles.searchInput}
                />
              </div>

              <button>
                <MapPin /> Зона доставки
              </button>
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="open24" />
                Круглосуточно
              </label>

              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="openNow" />
                Работает сейчас
              </label>
            </div>
          </div>

          <div className={styles.information}>
            <div className={styles.infoBlock}>
              <div className={styles.infoTitle}>Телефон:</div>
              <a href="tel:+77719444004" className={styles.infoLink}>
                +7 771 944 40 04
              </a>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.infoTitle}>
                Вопросы, отзывы и предложения:
              </div>
              <a
                href="mailto:feedback@dodopizza.kz"
                className={styles.infoLink}
              >
                feedback@dodopizza.kz
              </a>
            </div>
          </div>
        </div>

        <div className={styles.blcokBotton}>
          {atyrauBranches.map((branch, index) => (
            <div key={index} className={styles.branch}>
              <Link href={`/contacts/${branch.slug}`}>
                <span className={styles.branchName}>{branch.name}</span>
              </Link>
              <div className={styles.address}>{branch.address}</div>
              {branch.services.map((service, i) => (
                <div key={i} className={styles.service}>
                  <div>{service.type}</div>
                  <div className={styles.workTime}>{service.time}</div>
                </div>
              ))}
              <div className={styles.workTime}>{branch.workTime}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ContactsPage;
