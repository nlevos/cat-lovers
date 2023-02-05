import React, { useEffect, useRef, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { CatImage } from "../models/catImage";
import { Col, Container, Row, Button, Modal, Spinner } from "react-bootstrap";
import CatImageCard from "../components/CatImageCard";
import CatImageModal from "../components/CatImageModal";

interface IHomeEntryProps {
  /**  */
  images: CatImage[];
  /**  */
  loadImages(): void;
  /**  */
  toggleFavourite(image: CatImage): void;
}

export default function Home(props: React.PropsWithChildren<IHomeEntryProps>) {
  const { images, loadImages, toggleFavourite } = props;
  const [selImage, setSelImage] = useState<CatImage>();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLoadImagesClick = async () => {
    loadImages();
    setTimeout(() => {
      setLoading(false);
      if (images.length % 4 === 0) {
        window.scrollBy(0, 350);
      }
    }, 3000);
  };

  const handleShowImageClick = (id: string) => {
    const image = images.find((x) => x.id === id);
    setSelImage(image);
    setShow(true);
  };

  const imagesMarkup =
    images.length === 0 ? undefined : (
      <div className="wrapper mt-4">
        <Row md={3} xs={1} lg={4} className="g-4">
          {images?.map((item) => (
            <Col key={item.id} onClick={() => handleShowImageClick(item.id)}>
              <div>
                <CatImageCard image={item} />
              </div>
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

  useEffect(() => {
    if (images.length > 0) setLoading(false);
  }, [images]);

  return (
    <>
      <NavbarComponent />
      {imagesMarkup}
      <Container>
        <Row md={1} xs={1} lg={1} className="g-4">
          <Col>
            <Button
              ref={buttonRef}
              onClick={() => {
                setLoading(true);
                handleLoadImagesClick();
              }}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  &nbsp;Loading...
                </>
              ) : (
                <>Load More</>
              )}
            </Button>
          </Col>
        </Row>
      </Container>
      {modalMarkup}
    </>
  );
}
