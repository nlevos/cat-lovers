import React, { useEffect, useRef, useState } from "react";
// import { Col, Container, Row } from 'react-bootstrap'
// import { MovieCard } from '../components/MovieCard'
import NavbarComponent from "../components/NavbarComponent";
// import { PaginationComp } from '../components/PaginationComp'
// import { MovieContext } from '../context/MovieContext'
import agent from "../api/agent";
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
    setLoading(true);
    loadImages();
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
    if (images.length > 10 && buttonRef && buttonRef.current !== null) {
      //buttonRef.current.scrollIntoView();
      window.scrollBy(0, 350);
      //emailRef.current.focus();
    }
  }, [images]);

  return (
    <>
      <NavbarComponent />
      {imagesMarkup}
      <Container>
        <Row md={1} xs={1} lg={1} className="g-4">
          <Col>
            <Button ref={buttonRef} onClick={() => handleLoadImagesClick()}>
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
            {/* <div ref={buttonRef}></div> */}
          </Col>
        </Row>
      </Container>
      {modalMarkup}
    </>
  );
}
