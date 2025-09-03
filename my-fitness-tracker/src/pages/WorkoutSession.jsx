import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WorkoutSession() {
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let stored = [];
    try {
      stored = JSON.parse(localStorage.getItem("workouts")) || [];
    } catch {
      stored = [];
    }

    const today = new Date().toISOString().split("T")[0];
    const todayWorkout = stored.find((w) => w.date === today);

    if (!todayWorkout || todayWorkout.exercises.length === 0) {
      alert("No exercises found for today.");
      navigate("/log");
      return;
    }

    setWorkout(todayWorkout);
  }, [navigate]);

  const saveProgress = () => {
    if (!workout) return;
    let stored = [];
    try {
      stored = JSON.parse(localStorage.getItem("workouts")) || [];
    } catch {
      stored = [];
    }

    const index = stored.findIndex((w) => w.date === workout.date);
    if (index >= 0) stored[index] = workout;
    else stored.push(workout);

    localStorage.setItem("workouts", JSON.stringify(stored));
  };

  const handleNext = () => {
    saveProgress();
    if (!workout) return;

    if (currentIndex + 1 < workout.exercises.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("🎉 Workout Complete!");
      navigate("/log");
    }
  };

  const handleQuit = () => {
    if (window.confirm("Quit workout? Progress will be saved.")) {
      saveProgress();
      navigate("/log");
    }
  };

  if (!workout) return <p>Loading workout...</p>;

  const exercise = workout.exercises[currentIndex] || {};

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Workout Session</h1>

      <div className="p-6 bg-white shadow rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-2">{exercise.name || "Unnamed Exercise"}</h2>
        <p className="text-gray-600 mb-4">
          Sets: {exercise.sets || 0} | Reps: {exercise.reps || 0} | Weight: {exercise.weight || 0}kg
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setPaused(!paused)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            {paused ? "Resume" : "Pause"}
          </button>
          <button
            onClick={handleNext}
            disabled={paused}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Next
          </button>
          <button
            onClick={handleQuit}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Quit
          </button>
        </div>

        {paused && <p className="mt-4 text-red-500 font-semibold">Paused</p>}
        <p className="mt-4 text-gray-500">
          Exercise {currentIndex + 1} of {workout.exercises.length}
        </p>
      </div>
    </div>
  );
}
