import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "./tasksSlice";
import { setScore } from "../game/gameSlice";
import { calculateScore } from "../../utils/game";
import {
  timeSVG,
  rewardSmallSVG,
  clearSVG,
  checkSVG,
} from "../../utils/svgCollection";
import Timer from "../timer/Timer";

export default function Task({ task, keyNum }) {
  const dispatch = useDispatch();
  const totalTime = task.estimatedTime;
  const isGameStarted = useSelector((state) => state.game.started);
  const difficulty = useSelector((state) => state.game.difficulty);

  const displayReward = (value) => {
    const display = [];
    for (let i = 0; i < value; i++) {
      display.push(true);
    }
    return display;
  };

  const handleDelete = () => {
    if (isGameStarted) {
      dispatch(setScore({ score: calculateScore(task, difficulty, false) }));
      dispatch(deleteTask({ id: task.id }));
    } else {
      dispatch(deleteTask({ id: task.id }));
    }
  };

  const handleComplete = () => {
    dispatch(setScore({ score: calculateScore(task, difficulty, true) }));
    dispatch(deleteTask({ id: task.id }));
  };

  return (
    <li key={keyNum} className="flex py-5 my-2 bg-black">
      <p className="box-content w-2/5 ml-7 overflow-clip">{task.task}</p>
      <div className="flex justify-around w-3/5 mx-2">
        <p
          className={isGameStarted && !keyNum ? "animate-fadeInOut" : "hidden "}
        >
          🟢
        </p>
        {timeSVG}
        {isGameStarted && !keyNum ? (
          <Timer
            initialTime={task.estimatedTime}
            task={task}
            difficulty={difficulty}
          />
        ) : (
          <p>
            {`${totalTime} `}
            <span>minutes</span>
          </p>
        )}

        <div className="w-1/5">
          {displayReward(task.reward).map((task, i) => {
            return <i key={i}>{rewardSmallSVG}</i>;
          })}
        </div>
      </div>
      <div className="m-auto">
        <button
          onClick={handleComplete}
          className={isGameStarted && !keyNum ? "font-bold" : "hidden"}
        >
          {checkSVG}
        </button>
        <button onClick={handleDelete} className={"font-bold"}>
          {clearSVG}
        </button>
      </div>
    </li>
  );
}
