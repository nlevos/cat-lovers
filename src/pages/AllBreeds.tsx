import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { Button, Col, Modal, Row } from "react-bootstrap";
import CatBreedCard from "../components/CatBreedCard";
import { IBreedsEntryProps } from "./Breeds";
import { Breed } from "../models/breed";

export default function AllBreeds(
  props: React.PropsWithChildren<IBreedsEntryProps>
) {
  const { breeds } = props;
  const [show, setShow] = useState(false);
  const [selBreed, setSelBreed] = useState<Breed>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowModal = (id: string) => {
    const breed = breeds.find((x) => x.id === id);
    setSelBreed(breed);
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
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const breedsMarkup =
    breeds.length === 0 ? (
      <h2>There is no breeds info loaded</h2>
    ) : (
      <div className="wrapper mt-4">
        <Row md={3} xs={1} lg={4} className="g-4">
          {breeds?.map((item) => (
            <Col key={item.id} onClick={() => handleShowModal(item.id)}>
              <CatBreedCard
                breed={item}
                // tvShow={false}
              />
            </Col>
          ))}
        </Row>
      </div>
    );

  useEffect(() => {}, []);

  return (
    <>
      <NavbarComponent />
      {breedsMarkup}
      {modalMarkup}
    </>
  );
}
