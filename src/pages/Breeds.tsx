import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { CatImage } from "../models/catImage";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import CatImageCard from "../components/CatImageCard";
import { Breed } from "../models/breed";
import CatBreedCard from "../components/CatBreedCard";
import CatImageModal from "../components/CatImageModal";

export interface IBreedsEntryProps {
  /**  */
  breeds: Breed[];
  /**  */
  images: CatImage[];
  /**  */
  loadImagesByBreed(breedId: string): void;
  /**  */
  toggleFavourite(image: CatImage): void;
}

export default function Breeds(
  props: React.PropsWithChildren<IBreedsEntryProps>
) {
  const { breeds, images, loadImagesByBreed, toggleFavourite } = props;
  const [show, setShow] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [selBreed, setSelBreed] = useState<Breed>();
  const [selImages, setSelImages] = useState<CatImage[]>();
  const [selImage, setSelImage] = useState<CatImage>();
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseImage = () => setShowImage(false);

  const handleLoadImagesClick = async () => {
    setLoading(true);
    if (selBreed?.id) loadImagesByBreed(selBreed?.id);
  };

  const handleShowImageClick = (id: string) => {
    const image = images.find((x) => x.id === id);
    setSelImage(image);
    setShowImage(true);
  };

  const handleShowModal = (id: string) => {
    const breed = breeds.find((x) => x.id === id);
    setSelBreed(breed);
    let _images = images.filter(
      (x) =>
        x.breeds &&
        x.breeds.length > 0 &&
        x.breeds.findIndex((y) => y.id === breed?.id) != -1
    );
    if (_images) setSelImages(_images);
    setShow(true);
  };

  const modalMarkup = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "black" }}>
          Breed : {selBreed?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selImages && selImages.length > 0 ? (
          <>
            <div className="wrapper mt-4">
              <Row md={3} xs={1} lg={4} className="g-4">
                {selImages?.map((item) => (
                  <Col
                    key={item.id}
                    onClick={() => handleShowImageClick(item.id)}
                  >
                    <div>
                      <CatImageCard image={item} size="small" />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </>
        ) : (
          <p style={{ color: "black" }}>
            There are no images for this breed loaded, click the button to load
            some:
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={loading} onClick={() => handleLoadImagesClick()}>
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
            <>Load breed images</>
          )}
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const breedsMarkup =
    breeds.length === 0 ? (
      <h2 style={{ color: "white" }}>There is no breeds info loaded</h2>
    ) : (
      <div className="wrapper mt-4">
        <Row md={3} xs={1} lg={4} className="g-4">
          {breeds?.map((item) => (
            <Col key={item.id} onClick={() => handleShowModal(item.id)}>
              <CatBreedCard breed={item} />
            </Col>
          ))}
        </Row>
      </div>
    );

  const catModalMarkup = (
    <CatImageModal
      show={showImage}
      image={selImage}
      onHide={handleCloseImage}
      onToggleFavourite={toggleFavourite}
    ></CatImageModal>
  );

  useEffect(() => {
    setLoading(false);
    if (selBreed) {
      let _images = images.filter(
        (x) =>
          x.breeds &&
          x.breeds.length > 0 &&
          x.breeds.findIndex((y) => y.id === selBreed?.id) != -1
      );
      if (_images) setSelImages(_images);
    }
  }, [images, selBreed]);

  return (
    <>
      <NavbarComponent />
      <h1>Filtered Breeds</h1>
      {breedsMarkup}
      {modalMarkup}
      {catModalMarkup}
    </>
  );
}
