import { useState, useEffect } from "react";

export const useProgressData = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("workouts")) || [];
    setWorkouts(stored);
  }, []);

  const totalWorkouts = workouts.length;
  const lastWorkout = workouts[workouts.length - 1]?.date || "N/A";

  const totalWeight = workouts.reduce(
    (sum, w) =>
      sum +
      w.exercises.reduce(
        (s, ex) =>
          s + (ex.weight || 0) * (ex.reps || 0) * (ex.sets || 1),
        0
      ),
    0
  );

  return { workouts, totalWorkouts, lastWorkout, totalWeight };
};
