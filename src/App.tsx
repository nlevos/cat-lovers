// import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import React, { useEffect } from "react";
import { useState } from "react";
import { CatImage } from "./models/catImage";
import agent from "./api/agent";
import Breeds from "./pages/Breeds";
import Favourites from "./pages/Favourites";
import NotFound from "./pages/NotFound";
import { Breed } from "./models/breed";
import AllBreeds from "./pages/AllBreeds";

function App() {
  const [images, setImages] = useState<CatImage[]>([]);
  const [favImages, setFavImages] = useState<CatImage[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [allBreeds, setAllBreeds] = useState<Breed[]>([]);

  const loadBreeds = async () => {
    console.log("loadBreeds");
    agent.Breeds.list().then((res) => {
      setAllBreeds(res);
      console.table(res);
    });
  };

  const loadImagesByBreed = async (breedId: string) => {
    let _images = [...images];
    agent.CatImages.listByBreed(breedId, 10).then((res) => {
      let newImages = res.filter((x) => {
        return !_images.find((image) => image.id === x.id);
      });
      _images.push(...newImages);
      setImages(_images);
      console.table(res);
    });
  };

  const loadImages = async () => {
    let _images = [...images];
    const imgs = agent.CatImages.list(10).then((res) => {
      let newImages = res.filter((x) => {
        return !_images.find((image) => image.id === x.id);
      });
      _images.push(...newImages);
      setImages(_images);
      console.table(res);
    });

    let _breeds = [...breeds];
    _images.forEach((image) => {
      if (image.breeds && image.breeds.length > 0) {
        image.breeds.forEach((breed) => {
          let _breed = _breeds.find((x) => x.id === breed.id);
          if (!_breed) {
            _breed = { ...breed };
            _breed.demoImageUrl = image.url;
            _breeds.push(_breed);
          }
        });
      }
    });

    setBreeds(_breeds);
  };

  const handleToggleFavouriteClick = (image: CatImage) => {
    let _images = [...images];
    image.isFavourite = !image.isFavourite;
    let index = _images.findIndex((x) => x.id === image.id);
    _images[index] = image;
    setImages(_images);

    let _favImages = _images.filter((x) => x.isFavourite);
    setFavImages(_favImages);
  };

  useEffect(() => {
    console.log("useEffect");
    if (images.length === 0) {
      loadImages();
    }
    if (allBreeds.length === 0) {
      loadBreeds();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              images={images}
              loadImages={loadImages}
              toggleFavourite={handleToggleFavouriteClick}
            />
          }
        />
        <Route
          path="/breeds"
          element={
            <Breeds
              breeds={breeds}
              images={images}
              loadImages={loadImages}
              loadImagesByBreed={loadImagesByBreed}
              toggleFavourite={handleToggleFavouriteClick}
            />
          }
        />
        <Route
          path="/allbreeds"
          element={
            <AllBreeds
              breeds={allBreeds}
              images={images}
              loadImages={loadImages}
              loadImagesByBreed={loadImagesByBreed}
              toggleFavourite={handleToggleFavouriteClick}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <Favourites
              images={favImages}
              toggleFavourite={handleToggleFavouriteClick}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/movies" element={<Movies />} />
        <Route path="/tv-series" element={<TvSeries />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:id" element={<ShowInfo />} />
        <Route path="/tv/:id" element={<ShowTvInfo />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
