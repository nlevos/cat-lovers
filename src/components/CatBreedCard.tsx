import { Card } from "react-bootstrap";
import { CatImage } from "../models/catImage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMAGE_UNAVAILABLE_PLACEHOLDER } from "../constants";
import { Breed } from "../models/breed";

interface ICatBreedCardProps {
  /**  */
  breed?: Breed;
}

export default function CatBreedCard(
  props: React.PropsWithChildren<ICatBreedCardProps>
) {
  const { breed } = props;
  // export const CatImageCard = ({ image: CatImage }) => {
  // const navigate = useNavigate();

  return (
    // <motion.div
    // initial={{ scale: 0,opacity:0 }}
    // animate={{ opacity:1, scale: 1 }}
    // transition={{
    //   type: "spring",
    //   stiffness: 260,
    //   damping: 40,
    // }}

    // >
    <Card
      style={{
        width: "100%",
        background: "#161616",
        color: "white",
        borderRadius: 6,
        position: "relative",
        cursor: "pointer",
      }}
      className=" movie-card"
    >
      <Card.Body>
        <LazyLoadImage
          src={
            // image.url
            breed?.image && breed?.image?.url
              ? breed.image.url
              : !breed?.demoImageUrl
              ? IMAGE_UNAVAILABLE_PLACEHOLDER
              : breed.demoImageUrl
            // !movie.poster_path || !movie.backdrop_path
            //   ? IMAGE_UNAVAILABLE_PLACEHOLDER
            //   : `${IMAGE_LINK}${movie.backdrop_path}`
          }
          width={"100%"}
          height={350}
          alt={`${breed?.name}, ${breed?.alt_names}`}
          effect="blur"
          style={{ objectFit: "cover" }}
        />
        <Card.Title
          // onClick={() => navigate(`/${movie.id}`)}
          className="text-center mt-3"
          style={{ cursor: "pointer" }}
        >
          {breed?.name || breed?.alt_names}
        </Card.Title>
      </Card.Body>
    </Card>
    // </motion.div>
  );
}
