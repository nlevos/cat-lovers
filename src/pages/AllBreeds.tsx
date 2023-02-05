import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import CatBreedCard from "../components/CatBreedCard";
import { IBreedsEntryProps } from "./Breeds";
import { Breed } from "../models/breed";
import { CatImage } from "../models/catImage";
import CatImageCard from "../components/CatImageCard";

export default function AllBreeds(
  props: React.PropsWithChildren<IBreedsEntryProps>
) {
  const { breeds, images, loadImagesByBreed } = props;
  const [show, setShow] = useState(false);
  const [selBreed, setSelBreed] = useState<Breed>();
  const [selImages, setSelImages] = useState<CatImage[]>();
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLoadImagesClick = async () => {
    setLoading(true);
    if (selBreed?.id) loadImagesByBreed(selBreed?.id);
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
    debugger;
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
            {/* list of images */}
            <div className="wrapper mt-4">
              <Row md={3} xs={1} lg={4} className="g-4">
                {selImages?.map((item) => (
                  <Col
                    key={item.id}
                    // onClick={() => handleShowImageClick(item.id)}
                  >
                    <div>
                      <CatImageCard
                        image={item}
                        size="small"
                        // tvShow={false}
                      />
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

        {/* <CatImageCard
          image={selImage}
          // tvShow={false}
        />
        <br />
        {breedsMarkup}
        <Button
          onClick={() => {
            navigator.clipboard.writeText(selImage?.url || "");
          }}
        >
          Copy to clipboard to share
        </Button> */}
      </Modal.Body>
      <Modal.Footer>
        {/* <Button
          variant={selImage && selImage.isFavourite ? "danger" : "primary"}
          onClick={() => {
            if (selImage) toggleFavourite(selImage);
          }}
        >
          {selImage && selImage.isFavourite
            ? "Remove from favourites"
            : "Add to favourites"}
        </Button> */}
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
      <h2 style={{ color: "black" }}>There is no breeds info loaded</h2>
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
  }, [images]);

  return (
    <>
      <NavbarComponent />
      {breedsMarkup}
      {modalMarkup}
    </>
  );
}
