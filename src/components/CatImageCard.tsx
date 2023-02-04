import { Card } from "react-bootstrap";
import { CatImage } from "../models/catImage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMAGE_UNAVAILABLE_PLACEHOLDER } from "../constants";
import { motion } from "framer-motion";

interface ICatImageCardProps {
  /**  */
  image?: CatImage;
}

export default function CatImageCard(
  props: React.PropsWithChildren<ICatImageCardProps>
) {
  const { image } = props;
  // export const CatImageCard = ({ image: CatImage }) => {
  // const navigate = useNavigate();

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 40,
      }}
    >
      {" "}
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
              !image?.url ? IMAGE_UNAVAILABLE_PLACEHOLDER : image.url
              // !movie.poster_path || !movie.backdrop_path
              //   ? IMAGE_UNAVAILABLE_PLACEHOLDER
              //   : `${IMAGE_LINK}${movie.backdrop_path}`
            }
            width={"100%"}
            height={350}
            alt="movie"
            effect="blur"
            style={{ objectFit: "cover" }}
          />
          {/* <Card.Title
          onClick={() => navigate(`/${movie.id}`)}
          className="text-center mt-3"
          style={{ cursor: "pointer" }}
        >
          {movie.name || movie.title}
        </Card.Title> */}
        </Card.Body>
      </Card>
    </motion.div>
  );
}
