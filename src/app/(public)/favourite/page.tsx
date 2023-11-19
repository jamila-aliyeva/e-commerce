import FavouriteList from "@/app/list/favourite";
import "./style.scss";

const FavouritePage = () => {
  return (
    <section>
      <div className="container">
        <h2 className="fav__title">Sevimlilar Ro`yxati</h2>
        <FavouriteList />
      </div>
    </section>
  );
};

export default FavouritePage;
