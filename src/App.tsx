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
    agent.Breeds.list().then((res) => {
      setAllBreeds(res);
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
    });
  };

  const loadImages = async () => {
    let _images = [...images];
    agent.CatImages.list(10).then((res) => {
      let newImages = res.filter((x) => {
        return !_images.find((image) => image.id === x.id);
      });
      _images.push(...newImages);
      setImages(_images);
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
              loadImagesByBreed={loadImagesByBreed}
              toggleFavourite={handleToggleFavouriteClick}
            />
          }
        />
        <Route
          path="/allbreeds"
          element={
            <Breeds
              breeds={allBreeds}
              images={images}
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
      </Routes>
    </>
  );
}

export default App;
