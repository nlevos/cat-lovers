import { Card } from "react-bootstrap";
import { CatImage } from "../models/catImage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMAGE_UNAVAILABLE_PLACEHOLDER } from "../constants";
import { motion } from "framer-motion";

interface ICatImageCardProps {
  /**  */
  image?: CatImage;
  /**  */
  size?: "small" | "large";
}

export default function CatImageCard(
  props: React.PropsWithChildren<ICatImageCardProps>
) {
  const { image, size } = props;

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
      >
        <Card.Body>
          <LazyLoadImage
            src={!image?.url ? IMAGE_UNAVAILABLE_PLACEHOLDER : image.url}
            width={"100%"}
            height={size && size === "small" ? 100 : 350}
            alt="cat image"
            effect="blur"
            style={{ objectFit: "cover" }}
          />
        </Card.Body>
      </Card>
    </motion.div>
  );
}
