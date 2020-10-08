import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import mapStyles from "./mapStyles.js";
import "./Map.css";
import {
  correctAnswer,
  pickRandomCapital,
  incorrectAnswer,
  addMarker,
  resetMarkers,
  endGame,
  resetScore,
  setHighScore,
} from "../../actions/index.js";
import { store } from "react-notifications-component";

const correctAnswerNotification = {
  title: "Wonderful!",
  message: "Congratulations, you got that right",
  type: "success",
  insert: "top",
  container: "top-right",
  animationIn: ["animated", "fadeIn"],
  animationOut: ["animated", "fadeOut"],
  dismiss: {
    duration: 2000,
  },
};

const incorrectAnswerNotification = {
  title: "Incorrect!",
  message: "Oh no, that's not the one",
  type: "danger",
  insert: "top",
  container: "top-right",
  animationIn: ["animated", "fadeIn"],
  animationOut: ["animated", "fadeOut"],
  dismiss: {
    duration: 2000,
  },
};

const newCapitalToGuessNotification = {
  title: "New task!",
  type: "info",
  insert: "top",
  message: " ",
  container: "top-right",
  animationIn: ["animated", "fadeIn"],
  animationOut: ["animated", "fadeOut"],
  dismiss: {
    duration: 5000,
  },
};

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};
const mapDefaultZoom = 5;
const mapCenter = { lat: 47.15984, lng: 15.06128 };
const mapOptions = {
  styles: mapStyles,
  disableDefaultUI: true,
};

const INIT_GUESS = {
  lat: null,
  lng: null,
  time: null,
};

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  });
  const [guess, setGuess] = useState(INIT_GUESS);
  const [selected, setSelected] = useState(null);
  const randomCapital = useSelector((state) => state.randomCapitalReducer);
  const { capitals } = useSelector((state) => state.dataReducer);
  const isGameOn = useSelector((state) => state.gameReducer);
  const history = useSelector((state) => state.markersHistoryReducer);
  const { km, points } = useSelector((state) => state.scoreReducer);
  const { h_points } = useSelector((state) => state.highScoreReducer);
  const dispatch = useDispatch();

  if (loadError) return <div>Load error</div>;
  if (!isLoaded) return <div>Loading...</div>;

  const getRandomCapitalToGuess = () => {
    const len = capitals.length;
    let randomIndex = Math.floor(Math.random() * len);
    if (len != history.length)
      while (history.indexOf(randomIndex) != -1) {
        randomIndex = Math.floor(Math.random() * len);
      }
    else {
      store.addNotification({
        ...correctAnswerNotification,
        message: "Congratulations you knew all the capitals of Europe",
      });
    }
    dispatch(addMarker(randomIndex));
    console.log(randomIndex);
    console.log(capitals[randomIndex].CapitalName);
    dispatch(pickRandomCapital(randomIndex));
    store.addNotification({
      ...newCapitalToGuessNotification,
      message:
        newCapitalToGuessNotification.message +
        `Point to ${capitals[randomIndex].CapitalName}`,
    });
  };
  //https://www.movable-type.co.uk/scripts/latlong.html
  const checkAnswer = () => {
    const distanceThreshold = 50000;
    const R = 6371e3; // metres
    const t1 = (capitals[randomCapital].CapitalLatitude * Math.PI) / 180; // φ, λ in radians
    const t2 = (guess.lat * Math.PI) / 180;
    const dt =
      ((guess.lat - capitals[randomCapital].CapitalLatitude) * Math.PI) / 180;
    const dl =
      ((guess.lng - capitals[randomCapital].CapitalLongitude) * Math.PI) / 180;

    const a =
      Math.sin(dt / 2) * Math.sin(dt / 2) +
      Math.cos(t1) * Math.cos(t2) * Math.sin(dl / 2) * Math.sin(dl / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    const distanceInKm = (d / 1000).toFixed(2);
    console.log(d);
    if (d <= distanceThreshold) {
      dispatch(correctAnswer());
      store.addNotification(correctAnswerNotification);
    } else {
      dispatch(incorrectAnswer(distanceInKm));
      store.addNotification(incorrectAnswerNotification);
    }
    if (km - distanceInKm <= 0) {
      dispatch(endGame());
      dispatch(resetScore());
      dispatch(resetMarkers());
      if (points > h_points) {
        dispatch(setHighScore(points));
      }
    } else {
      getRandomCapitalToGuess();
    }
  };

  return (
    <div className="map-holder">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={mapDefaultZoom}
        center={mapCenter}
        options={mapOptions}
        onClick={(event) => {
          if (isGameOn)
            setGuess({
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              time: new Date(),
            });
        }}
      >
        {!isGameOn
          ? (() => {
              setGuess(INIT_GUESS);
            },
            capitals.map((capital) => (
              <Marker
                key={capital.CapitalName}
                position={{
                  lat: parseFloat(capital.CapitalLatitude),
                  lng: parseFloat(capital.CapitalLongitude),
                }}
                onClick={() => {
                  setSelected(capital);
                }}
              />
            )))
          : (() => {
              pickRandomCapital();
            },
            guess.lat != null ? (
              <Marker
                key={guess.time.toISOString()}
                position={{
                  lat: guess.lat,
                  lng: guess.lng,
                }}
              />
            ) : (
              ""
            ))}

        {selected ? (
          <InfoWindow
            position={{
              lat: parseFloat(selected.CapitalLatitude),
              lng: parseFloat(selected.CapitalLongitude),
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              Here is {selected.CapitalName} the capital of
              {" " + selected.CountryName}
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <div className="action-buttons">
        <button
          className="answer-button"
          disabled={!isGameOn}
          onClick={checkAnswer}
        >
          Confirm
        </button>
        <button
          className="answer-button"
          disabled={!isGameOn}
          onClick={() => setGuess(INIT_GUESS)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
