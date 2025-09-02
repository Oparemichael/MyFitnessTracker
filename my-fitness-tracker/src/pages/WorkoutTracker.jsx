import React, { useState, useEffect } from "react";

const workoutPlans = {
  chest: [
    {
      day: 1,
      exercises: [
        { name: "Push Ups", reps: "5 reps" },
        { name: "Jumping Jacks", reps: "50 reps" },
        { name: "Incline Push Ups", reps: "10 reps" },
      ],
    },
    {
      day: 2,
      exercises: [
        { name: "Wide Push Ups", reps: "10 reps" },
        { name: "Burpees", reps: "15 reps" },
        { name: "Diamond Push Ups", reps: "8 reps" },
      ],
    },
  ],
  legs: [
    {
      day: 1,
      exercises: [
        { name: "Squats", reps: "15 reps" },
        { name: "Lunges", reps: "10 reps each leg" },
        { name: "Calf Raises", reps: "20 reps" },
      ],
    },
  ],
  abs: [
    {
      day: 1,
      exercises: [
        { name: "Plank", reps: "30 sec" },
        { name: "Sit Ups", reps: "15 reps" },
        { name: "Leg Raises", reps: "12 reps" },
      ],
    },
  ],
};

export default function WorkoutTracker() {
  const [category, setCategory] = useState(null);
  const [day, setDay] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [finished, setFinished] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem("workoutProgress"));
    if (savedProgress) {
      if (
        window.confirm(
          `Continue your ${savedProgress.category} workout from Day ${savedProgress.day}?`
        )
      ) {
        setCategory(savedProgress.category);
        setDay(savedProgress.day);
        setCurrentExercise(savedProgress.exerciseIndex);
      }
    }
  }, []);

  // Save progress
  const saveProgress = (cat, dayNum, exerciseIndex) => {
    localStorage.setItem(
      "workoutProgress",
      JSON.stringify({
        category: cat,
        day: dayNum,
        exerciseIndex,
      })
    );
  };

  const startWorkout = (cat) => {
    setCategory(cat);
    setDay(1);
    setCurrentExercise(0);
    setFinished(false);
    saveProgress(cat, 1, 0);
  };

  const handleFinishExercise = () => {
    const total = workoutPlans[category].find((d) => d.day === day).exercises
      .length;

    if (currentExercise + 1 < total) {
      setCurrentExercise(currentExercise + 1);
      saveProgress(category, day, currentExercise + 1);
    } else {
      setFinished(true);

      // Move to next day if available
      const nextDayExists = workoutPlans[category].some((d) => d.day === day + 1);
      if (nextDayExists) {
        setDay(day + 1);
        setCurrentExercise(0);
        saveProgress(category, day + 1, 0);
      } else {
        // No more days → clear progress
        localStorage.removeItem("workoutProgress");
      }
    }
  };

  const resetProgress = () => {
    localStorage.removeItem("workoutProgress");
    setCategory(null);
    setDay(1);
    setCurrentExercise(0);
    setFinished(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {!category ? (
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h1 className="text-2xl font-bold mb-4">Choose Workout Category</h1>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(workoutPlans).map((cat) => (
              <button
                key={cat}
                onClick={() => startWorkout(cat)}
                className="p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 capitalize"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h1 className="text-xl font-bold mb-4 capitalize">
            {category} - Day {day} Workout
          </h1>

          {finished ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">🎉 Day {day - 1} Complete!</h2>
              <p className="text-gray-600">
                {workoutPlans[category].some((d) => d.day === day)
                  ? "Ready for your next workout?"
                  : "You've completed all workouts for this category!"}
              </p>
              <button
                onClick={resetProgress}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Reset Progress
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-lg font-semibold">
                {
                  workoutPlans[category].find((d) => d.day === day).exercises[
                    currentExercise
                  ].name
                }
              </h2>
              <p className="text-gray-600 mb-4">
                {
                  workoutPlans[category].find((d) => d.day === day).exercises[
                    currentExercise
                  ].reps
                }
              </p>

              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2">
                Start
              </button>
              <button
                onClick={handleFinishExercise}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Finish
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
