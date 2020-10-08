import React, { Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addMarker,
  endGame,
  pickRandomCapital,
  resetMarkers,
  resetScore,
  startGame,
} from "../../actions";
import "./SideBar.css";
import { store } from "react-notifications-component";

const newCapitalToGuessNotification = {
  title: "Game started!",
  type: "info",
  insert: "top",
  message: " ",
  container: "top-right",
  animationIn: ["animated", "fadeIn"],
  animationOut: ["animated", "fadeOut"],
  dismiss: {
    duration: 2000,
  },
};

export default function SideBar() {
  const { km, points } = useSelector((state) => state.scoreReducer);
  const isGameOn = useSelector((state) => state.gameReducer);
  const markers = useSelector((state) => state.markersHistoryReducer);
  const { isLoaded, capitals } = useSelector((state) => state.dataReducer);
  const highScore = useSelector((state) => state.highScoreReducer);
  const dispatch = useDispatch();

  return (
    <div className="side-bar">
      <div className="title">
        <h1>Capital Guesser</h1>
        <hr />
      </div>
      <div className="action-list">
        {!isGameOn ? (
          <button
            className="game-state-button"
            disabled={!isLoaded}
            onClick={() => {
              let randomIndex = Math.floor(Math.random() * capitals.length);
              dispatch(addMarker(randomIndex));
              dispatch(pickRandomCapital(randomIndex));
              dispatch(startGame());
              store.addNotification({
                ...newCapitalToGuessNotification,
                message:
                  newCapitalToGuessNotification.message +
                  `Point to ${capitals[randomIndex].CapitalName}`,
              });
            }}
          >
            Start Game
          </button>
        ) : (
          <button
            className="game-state-button"
            onClick={() => {
              dispatch(endGame());
              dispatch(resetMarkers());
              dispatch(resetScore());
            }}
          >
            End Game
          </button>
        )}
      </div>
      <div className="score-board">
        <ul>
          {points} cities placed
          <br />
          {km.toFixed(2)} Kilometers left
        </ul>
        <ul>Highscore: {highScore.h_points}</ul>
      </div>
    </div>
  );
}
