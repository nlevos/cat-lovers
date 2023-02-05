import React, { useEffect } from "react";
// import { Col, Container, Row } from 'react-bootstrap'
// import { MovieCard } from '../components/MovieCard'
import NavbarComponent from "../components/NavbarComponent";
// import { PaginationComp } from '../components/PaginationComp'
// import { MovieContext } from '../context/MovieContext'
import agent from "../api/agent";
import { CatImage } from "../models/catImage";
import { Col, Row } from "react-bootstrap";
import CatImageCard from "../components/CatImageCard";
import { Breed } from "../models/breed";
import CatBreedCard from "../components/CatBreedCard";

export interface IBreedsEntryProps {
  /**  */
  breeds: Breed[];
  /**  */
  images: CatImage[];
  /**  */
  loadImages(): void;
  /**  */
  loadImagesByBreed(breedId: string): void;
  /**  */
  toggleFavourite(image: CatImage): void;
}

export default function Breeds(
  props: React.PropsWithChildren<IBreedsEntryProps>
) {
  const { breeds, images, loadImages, toggleFavourite } = props;

  // const {trendings,trendingTotalPages}=useContext(MovieContext)

  // const imgs = agent.CatImages.list(10).then(() => {});
  // console.table(imgs);

  const breedsMarkup =
    breeds.length === 0 ? (
      <h2>There is no breeds info loaded</h2>
    ) : (
      <div className="wrapper mt-4">
        <Row md={3} xs={1} lg={4} className="g-4">
          {breeds?.map((item) => (
            <Col key={item.id}>
              <CatBreedCard
                breed={item}
                // tvShow={false}
              />
            </Col>
          ))}
        </Row>
      </div>
    );

  const imagesMarkup =
    images.length === 0 ? undefined : (
      <div className="wrapper mt-4">
        <Row md={3} xs={1} lg={4} className="g-4">
          {images?.map((item) => (
            <Col key={item.id}>
              <CatImageCard
                image={item}
                // tvShow={false}
              />
            </Col>
          ))}
        </Row>
      </div>
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
      <h1>test</h1>
      {breedsMarkup}
      {/* {imagesMarkup} */}
      {/* <Container className='mt-4'>
  <Row md={3} xs={1} lg={4} className="g-4">
    {trendings?.map((item)=>
          <Col key={item.id}>
  <MovieCard movie={item}/>
          </Col>
    )}
      
      </Row>
      <div className="mt-5 d-flex justify-content-center">
    <PaginationComp totalPages={trendingTotalPages}/>
      </div>
      </Container> */}
    </>
  );
}
