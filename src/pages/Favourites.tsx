import React, { useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { CatImage } from "../models/catImage";
import { Col, Row } from "react-bootstrap";
import CatImageCard from "../components/CatImageCard";
import CatImageModal from "../components/CatImageModal";

interface IFavouritesEntryProps {
  /**  */
  images: CatImage[];
  /**  */
  toggleFavourite(image: CatImage): void;
}

export default function Favourites(
  props: React.PropsWithChildren<IFavouritesEntryProps>
) {
  const { images, toggleFavourite } = props;
  const [selImage, setSelImage] = useState<CatImage>();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowImageClick = (id: string) => {
    const image = images.find((x) => x.id === id);
    setSelImage(image);
    setShow(true);
  };

  const imagesMarkup =
    images.length === 0 ? (
      <h2>You don't have any favourites</h2>
    ) : (
      <div className="wrapper mt-4">
        <Row md={3} xs={1} lg={4} className="g-4">
          {images?.map((item) => (
            <Col key={item.id} onClick={() => handleShowImageClick(item.id)}>
              <CatImageCard image={item} />
            </Col>
          ))}
        </Row>
      </div>
    );

  const modalMarkup = (
    <CatImageModal
      show={show}
      image={selImage}
      onHide={handleClose}
      onToggleFavourite={toggleFavourite}
    ></CatImageModal>
  );

  return (
    <>
      <NavbarComponent />
      <h2>My favourites</h2>
      {imagesMarkup}
      {modalMarkup}
    </>
  );
}
