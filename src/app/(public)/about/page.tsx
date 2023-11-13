import { Metadata } from "next";
import "./style.scss";

export const metadata: Metadata = {
  title: "Vodiy Parfum | Haqida",
  description: "Lorem ipusum ....",
};
const AboutPage = () => {
  return (
    <section>
      <div className="container">
        <h2 className="about__title">
          Biz bilan o'z sifatli mahsulotlaringizni <br /> tez va oson olishingiz
          mumkin
        </h2>
        <div className="about__wrap">
          <div className="about__card">
            <h3>Lorem ipsum dolor sit amet</h3>
            <p>
              Fusce pharetra ligula mauris, quis faucibus lectus elementum vel.
              Nullam vehicula, libero at euismod tristique, neque ligula
              faucibus urna, quis ultricies massa enim in nunc. Vivamus
              ultricies, quam ut rutrum blandit, turpis massa ornare velit, in
              sodales tellus ex nec odio.
            </p>
          </div>
          <div className="about__card">
            <h3>Lorem ipsum dolor sit amet</h3>
            <p>
              Fusce pharetra ligula mauris, quis faucibus lectus elementum vel.
              Nullam vehicula, libero at euismod tristique, neque ligula
              faucibus urna, quis ultricies massa enim in nunc. Vivamus
              ultricies, quam ut rutrum blandit, turpis massa ornare velit, in
              sodales tellus ex nec odio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
