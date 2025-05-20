import Image from "next/image";
import styles from "./page.module.scss";
import branches from "@/data/branches.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import ArrowLeft from "@/components/svg/ArrowLeftSvg";

const BranchPage = ({ params }) => {
  const branch = branches.atyrau.branches.find((b) => b.slug === params.branch);

  console.log(branch);

  if (!branch) return notFound();

  return (
    <div className={styles.container}>
      <Link className={styles.link} href="/contacts">
        <button className={styles.backButton}>
          <ArrowLeft className={styles.arrow} /> К списку пиццерий
        </button>
      </Link>
      <div className={styles.wrapper}>
        <h1>{branch.name}</h1>
      </div>
      <div className={styles.wrapper}>
        <div>
          <p>{branch.address}</p>
          <div className={styles.imageWrapper}>
            <Image
              src="https://i.ibb.co.com/dJgQMTQJ/1180c2a2338b97638c7f.jpg"
              alt="Описание"
              width={840}
              height={470}
            />
          </div>
        </div>
        <div className={styles.addressWrapper}>
          <div>{branch.address}</div>
          {branch.services.map((service, i) => (
            <div key={i} className={styles.service}>
              <div>{service.type}</div>
              <div className={styles.workTime}>{service.time}</div>
            </div>
          ))}
        </div>
      </div>
      <Link className={styles.bezperchatok} href={"/bezperchatok"}>
        Почему мы готовим без перчаток?
      </Link>
    </div>
  );
};

export default BranchPage;
