import React, { useEffect, useState } from "react";
// import { Col, Container, Row } from 'react-bootstrap'
// import { MovieCard } from '../components/MovieCard'
import NavbarComponent from "../components/NavbarComponent";
// import { PaginationComp } from '../components/PaginationComp'
// import { MovieContext } from '../context/MovieContext'
import agent from "../api/agent";
import { CatImage } from "../models/catImage";
import { Button, Col, Modal, Row } from "react-bootstrap";
import CatImageCard from "../components/CatImageCard";

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
      <h2>You haven't any favourites</h2>
    ) : (
      <div className="wrapper mt-4">
        <Row md={3} xs={1} lg={4} className="g-4">
          {images?.map((item) => (
            <Col key={item.id} onClick={() => handleShowImageClick(item.id)}>
              <CatImageCard
                image={item}
                // tvShow={false}
              />
            </Col>
          ))}
        </Row>
      </div>
    );

  const breedsMarkup =
    selImage && selImage.breeds && selImage.breeds.length > 0 ? (
      <>
        Breeds:&nbsp;
        {selImage.breeds
          .map((breed) => breed.name + " (" + breed.alt_names + ")")
          .join(", ")}
        <br />
        <br />
      </>
    ) : undefined;

  const modalMarkup = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Image information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CatImageCard
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
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant={selImage && selImage.isFavourite ? "danger" : "primary"}
          onClick={() => {
            if (selImage) {
              toggleFavourite(selImage);
              setShow(false);
            }
          }}
        >
          {selImage && selImage.isFavourite
            ? "Remove from favourites"
            : "Add to favourites"}
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  useEffect(() => {
    // if (images.length === 0) {
    //   loadImages();
    // }
    // const imgs = agent.CatImages.list(10).then((res) => {
    //   console.table(res);
    // });
    // console.table(imgs);
    // if (this.state.breeds.length===0) {
    //     (async () => {
    //         try {
    //             this.setState({breeds: await this.getBreeds()});
    //         } catch (e) {
    //             //...handle the error...
    //             console.error(e)
    //         }
    //     })();
    // }
  }, []);

  return (
    <>
      <NavbarComponent />
      <h2>My favourites</h2>
      {imagesMarkup}
      {modalMarkup}
    </>
  );
}
