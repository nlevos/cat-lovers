// import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import React from "react";
import { useState } from "react";
import { CatImage } from "./models/catImage";
import agent from "./api/agent";
import Breeds from "./pages/Breeds";
import Favourites from "./pages/Favourites";
import NotFound from "./pages/NotFound";

function App() {
  const [images, setImages] = useState<CatImage[]>([]);

  const loadImages = async () => {
    // await loadTotals();
    let _images = [...images];
    const imgs = agent.CatImages.list(10).then((res) => {
      _images.push(...res);
      setImages(_images);
      console.table(res);
    });
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
  };

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
          element={<Breeds images={images} loadImages={loadImages} />}
        />
        <Route
          path="/favourites"
          element={<Favourites images={images} loadImages={loadImages} />}
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
