import { Card } from "react-bootstrap";
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

  return (
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
          src={
            breed?.image && breed?.image?.url
              ? breed.image.url
              : !breed?.demoImageUrl
              ? IMAGE_UNAVAILABLE_PLACEHOLDER
              : breed.demoImageUrl
          }
          width={"100%"}
          height={350}
          alt={`${breed?.name}, ${breed?.alt_names}`}
          effect="blur"
          style={{ objectFit: "cover" }}
        />
        <Card.Title className="text-center mt-3" style={{ cursor: "pointer" }}>
          {breed?.name || breed?.alt_names}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}
