import SecondSvg from "@/components/svg/AboutUsPageSVG/SecondSvg";
import styles from "./page.module.scss";
import SVGComponent from "@/components/svg/AboutUsPageSVG/FirstSvg";

const AboutUsPage = () => {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <h1>Мы</h1>
          <p>
            Обычно люди приходят в Додо Пиццу, чтобы просто поесть. Наши
            промоутеры раздают листовки про кусочек пиццы за 100 тенге или ещё
            что-то выгодное. Мы делаем это как первый шаг, чтобы познакомиться.
            <br />
            <br />
            Но для нас Додо — не только пицца. Это и пицца тоже, но в первую
            очередь это большое дело, которое вдохновляет нас, заставляет каждое
            утро просыпаться и с интересом продолжать работу.
            <br />
            <br />В чём же наш интерес? Сейчас расскажем.
          </p>
        </div>
        <div className={styles.svg}>
          <SVGComponent
            classOne={styles.svgOne}
            classTwo={styles.svgTwo}
            classThree={styles.svgThree}
          />
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <h2>Идеальные ингредиенты</h2>
          <p>
            Почему мы так хотим познакомиться? Потому что дальше пицца делает
            всё сама. Люди видят, что она вкусная, и возвращаются снова. Нам
            главное первый раз это показать.
            <br />
            <br />
            Вообще пицца — очень простая штука, её сложно испортить. Достаточно
            хороших ингредиентов и правильного теста. Это конструктор, если
            детали качественные, то и результат будет в порядке. Вот они, наши
            детали:
          </p>
          <div className={styles.sectionTwo}>
            <div className={styles.ingredientWrapper}>
              <div className={styles.ingredient}>
                <h3>Тесто</h3>
                <br />
                Самая тонкая вещь. Главное - сделать его «живым». Это целый
                квест из граммов, градусов, процентов и часов с минутами.
                Процесс непростой, но у нас получается!
              </div>
              <div className={styles.ingredient}>
                <h3>Моцарелла</h3>
                <br />
                Сыр в пицце - ключевой ингредиент. Мы используем настоящую
                моцареллу от российских поставщиков. Сыр должен тянуться, как на
                картинке.
              </div>
              <div className={styles.ingredient}>
                <h3>Начинка</h3>
                <br />
                Есть два главных правила вкусной начинки: не экономить на
                начинке; фанатично соблюдать режим хранения. Это и весь секрет.
              </div>
              <div className={styles.ingredient}>
                <h3>Томатный соус</h3>
                <br />
                лавное, что нужно знать про хороший томатный соус: он должен
                быть сделан из томатов. Звучит логично, но задумайтесь!
              </div>
            </div>
            <div className={styles.svgSec}>
              <SecondSvg
                classOne={styles.secSvgOne}
                classTwo={styles.secSvgTwo}
                classThree={styles.secSvgThree}
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.wrapper}>
          <h3>Одинаково вкусно в Москве и Сыктывкаре</h3>
          <p>
            Кто угодно может сделать вкусную пиццу. А шеф-повар итальянского
            ресторана сделает и вовсе шедевр. Он молодец. Но представьте, что
            вам нужно сделать вкусную пиццу в сотнях пиццерий, за сотни
            километров друг от друга. Это наш случай, у нас их вон уже сколько:
          </p>
          
        </div>
        <div className={styles.svgWrapper}></div>
      </section>
      <section></section>
      <section></section>
      <section></section>
      <section></section>
      <section></section>
    </div>
  );
};

export default AboutUsPage;
