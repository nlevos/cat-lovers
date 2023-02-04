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

  const loadImages = async () => {
    console.log("loadImages");
    // await loadTotals();
    let _images = [...images];
    const imgs = agent.CatImages.list(10).then((res) => {
      _images.push(...res);
      setImages(_images);
      console.table(res);
    });

    let _breeds = [...breeds];
    //debugger;
    _images.forEach((image) => {
      //debugger;
      if (image.breeds && image.breeds.length > 0) {
        // debugger;
        image.breeds.forEach((breed) => {
          let _breed = _breeds.find((x) => x.id === breed.id);
          // debugger;
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
    // if (image.isFavourite) {
    //   image.isFavourite = false;
    // } else {
    //   image.isFavourite = false;
    // }

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
            <Breeds breeds={breeds} images={images} loadImages={loadImages} />
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
