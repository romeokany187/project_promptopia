import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className=" w-full flex-center flex-col ">
      <h1 className=" head_text text-center">
        Créez & Partagez
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          Créez vos propres Portfolios
        </span>
      </h1>

      <p className="desc text-center">
        Créez votre portfolio en ligne en quelques clics et mettez en valeur vos
        talents auprès du monde entier
      </p>

      {/* feeds  */}
      <Feed />
    </section>
  );
};

export default Home;
