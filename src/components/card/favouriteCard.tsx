import "./favourite.scss";
import Image from "next/image";

interface FavauriteProps {
  _id: string;
  image: {
    url: string;
  };
  title: string;
  description: string;
  price: number;
}

const FavouriteCard = ({
  _id,
  image,
  title,
  description,
  price,
}: FavauriteProps) => {
  return (
    <div key={_id} className="fav__card">
      <div className="fav__image">
        <Image src={image?.url} alt={title} fill objectFit="cover" />
      </div>
      <div className="fav__content">
        <h3>Nomi: {title}</h3>
        <p>{description}</p>
        <p>Narxi: {price} $</p>
      </div>
    </div>
  );
};

export default FavouriteCard;
