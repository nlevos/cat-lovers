// import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import React from "react";
import { useState } from "react";
import { CatImage } from "./models/catImage";
import agent from "./api/agent";

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

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home images={images} loadImages={loadImages} />}
        />
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
