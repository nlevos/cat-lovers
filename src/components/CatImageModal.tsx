import { Button, Card, Modal } from "react-bootstrap";
import { CatImage } from "../models/catImage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMAGE_UNAVAILABLE_PLACEHOLDER } from "../constants";
import { motion } from "framer-motion";
import CatImageCard from "./CatImageCard";

interface ICatImageModalProps {
  /**  */
  image?: CatImage;
  /**  */
  show?: boolean;
  /**  */
  title?: string;
  /**  */
  onHide?(): void;
  /**  */
  onToggleFavourite?(image: CatImage): void;

  // /**  */
  // size?: "small" | "large";
}

export default function CatImageModal(
  props: React.PropsWithChildren<ICatImageModalProps>
) {
  const { image, show, title, onHide, onToggleFavourite } = props;

  const breedsMarkup =
    image && image.breeds && image.breeds.length > 0 ? (
      <>
        Breeds:&nbsp;
        {image.breeds
          .map((breed) => breed.name + " (" + breed.alt_names + ")")
          .join(", ")}
        <br />
        <br />
      </>
    ) : undefined;

  const modalMarkup = (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title ?? "Image information"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CatImageCard image={image} />
        <br />
        {breedsMarkup}
        <Button
          onClick={() => {
            navigator.clipboard.writeText(image?.url || "");
          }}
        >
          Copy to clipboard to share
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant={image && image.isFavourite ? "danger" : "primary"}
          onClick={() => {
            if (image && onToggleFavourite) onToggleFavourite(image);
          }}
        >
          {image && image.isFavourite
            ? "Remove from favourites"
            : "Add to favourites"}
        </Button>
        <Button variant="primary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return <>{modalMarkup}</>;
}
