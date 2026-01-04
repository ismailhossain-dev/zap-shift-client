// import React, { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import Brands from "./Brands/Brands";
import Reviews from "../Reviews/Reviews";
import Work from "./Work";
import Service from "./Service";
//fetch reviews data
const reviewPromise = fetch("/reviews.json").then((res) => res.json());

//fetch work data

const workPromise = fetch("/works.json").then((res) => res.json());

//fetch serive data
const servicePromise = fetch("/services.json").then((res) => res.json());
// console.log(servicePromise);
const Home = () => {
  return (
    <div>
      <Banner />
      <div className="mx-auto grid-cols-1  lg:grid-cols-3 gap-6">
        <Work workPromise={workPromise} />
      </div>

      <Service servicePromise={servicePromise}></Service>
      <Brands />
      <Reviews reviewsPromise={reviewPromise} />
    </div>
  );
};

export default Home;
