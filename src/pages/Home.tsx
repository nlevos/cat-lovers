import React, { useEffect, useState } from "react";
// import { Col, Container, Row } from 'react-bootstrap'
// import { MovieCard } from '../components/MovieCard'
import NavbarComponent from "../components/NavbarComponent";
// import { PaginationComp } from '../components/PaginationComp'
// import { MovieContext } from '../context/MovieContext'
import agent from "../api/agent";
import { CatImage } from "../models/catImage";
import { Col, Container, Row, Button, Modal } from "react-bootstrap";
import CatImageCard from "../components/CatImageCard";

interface IHomeEntryProps {
  /**  */
  images: CatImage[];
  /**  */
  loadImages(): void;
}

export default function Home(props: React.PropsWithChildren<IHomeEntryProps>) {
  const { images, loadImages } = props;
  const [selImage, setSelImage] = useState<CatImage>();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLoadImagesClick = async () => {
    loadImages();
  };

  const handleShowImageClick = (id: string) => {
    const image = images.find((x) => x.id === id);
    setSelImage(image);
    setShow(true);
  };

  // const {trendings,trendingTotalPages}=useContext(MovieContext)

  // const imgs = agent.CatImages.list(10).then(() => {});
  // console.table(imgs);

  const imagesMarkup =
    images.length === 0 ? undefined : (
      <div className="wrapper mt-4">
        <Row md={3} xs={1} lg={4} className="g-4">
          {images?.map((item) => (
            <Col key={item.id} onClick={() => handleShowImageClick(item.id)}>
              <div>
                <CatImageCard
                  image={item}
                  // tvShow={false}
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );

  const modalMarkup = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CatImageCard
          image={selImage}
          // tvShow={false}
        />
        <br />
        Woohoo, you're reading this text in a modal!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );

  useEffect(() => {
    if (images.length === 0) {
      loadImages();
    }

    const imgs = agent.CatImages.list(10).then((res) => {
      console.table(res);
    });

    console.table(imgs);

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
      {imagesMarkup}
      <Container>
        <Row md={3} xs={1} lg={4} className="g-4">
          <Col>
            <Button onClick={() => handleLoadImagesClick()}>Load More</Button>
          </Col>
        </Row>
      </Container>
      {modalMarkup}
    </>
  );
}
