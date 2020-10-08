import React, { useEffect, useState } from "react";
import { SideBar, Map } from "./components";
import { useDispatch, useSelector } from "react-redux";
import ReactNotification from "react-notifications-component";
import { saveState } from "./actions";
import "./App.css";
import "react-notifications-component/dist/theme.css";

const API_URL =
  "https://cors-anywhere.herokuapp.com/http://techslides.com/demos/country-capitals.json";

export default function App() {
  const dispatch = useDispatch();
  const { isLoaded, capitals } = useSelector((state) => state.dataReducer);
  const randomCapital = useSelector((state) => state.pickRandomCapitalReducer);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(
        (result) => {
          result = result.filter(
            (element) => element.ContinentName == "Europe"
          );
          dispatch(saveState(result));
          console.log(result);
          console.log(capitals);
        },
        (error) => {
          console.error("api error");
        }
      );
  }, []);

  console.log(capitals);

  return (
    <div className="app-container">
      <ReactNotification />
      <Map />
      <SideBar />
    </div>
  );
}
