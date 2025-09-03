import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

export default function ExerciseExplorer() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch all exercise translations in English (with caching)
  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      setError(null);

      try {
        // ✅ Check localStorage cache
        const cached = localStorage.getItem("englishExercises");
        if (cached) {
          setExercises(JSON.parse(cached));
          setLoading(false);
          return;
        }

        let allExercises = [];
        let url = "https://wger.de/api/v2/exercise-translation/?limit=50"; // start page

        while (url) {
          const response = await fetch(url);
          const data = await response.json();

          // ✅ Only keep English translations
          const englishOnly = data.results.filter((ex) => ex.language === 2);

          allExercises = [...allExercises, ...englishOnly];
          url = data.next; // keep fetching until no "next"
        }

        // ✅ Save to state + cache
        setExercises(allExercises);
        localStorage.setItem("englishExercises", JSON.stringify(allExercises));
      } catch (err) {
        console.error("Error loading exercises:", err);
        setError("Failed to load exercises. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  // ✅ Filtered exercises based on search
  const filteredExercises = exercises.filter((ex) =>
    ex.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic (applied on filtered results)
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentExercises = filteredExercises.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredExercises.length / itemsPerPage);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Reset page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // ✅ Save favorite exercise
  const saveExercise = (exercise) => {
    const stored = JSON.parse(localStorage.getItem("savedExercises")) || [];
    const exists = stored.find((ex) => ex.id === exercise.id);
    if (!exists) {
      const updated = [...stored, exercise];
      localStorage.setItem("savedExercises", JSON.stringify(updated));
      alert(`${exercise.name} saved to profile!`);
    } else {
      alert(`${exercise.name} is already saved.`);
    }
  };

  // ✅ Add exercise to today's workout
  const addToWorkout = (exercise) => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const stored = JSON.parse(localStorage.getItem("workouts")) || [];

    // Find if today's workout already exists
    let todayWorkout = stored.find((w) => w.date === today);

    if (todayWorkout) {
      // Avoid duplicates
      const exists = todayWorkout.exercises.find((ex) => ex.id === exercise.id);
      if (!exists) {
        todayWorkout.exercises.push({
          id: exercise.id,
          name: exercise.name,
          sets: 3,
          reps: 10,
          weight: 0,
        });
      } else {
        alert(`${exercise.name} is already in today's workout.`);
        return;
      }
    } else {
      // Create a new workout entry
      todayWorkout = {
        id: Date.now(),
        date: today,
        category: "custom",
        exercises: [
          {
            id: exercise.id,
            name: exercise.name,
            sets: 3,
            reps: 10,
            weight: 0,
          },
        ],
      };
      stored.push(todayWorkout);
    }

    localStorage.setItem("workouts", JSON.stringify(stored));
    alert(`${exercise.name} added to today's workout!`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1">Explore Our Workouts</h1>
      <p>Choose the workouts that you are interested in. Seek medical advice from a experts</p>

      {/* ✅ Search bar */}
      <div className="mb-6 mt-6">
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {loading && <p>Loading exercises...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && currentExercises.length === 0 && (
        <p>No matching exercises found.</p>
      )}

      <ul className="space-y-4">
        {currentExercises.map((ex) => (
          <li
            key={ex.id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <h3 className="font-semibold text-lg">{ex.name || "Unnamed Exercise"}</h3>
            <p
              className="text-gray-700 text-sm mt-2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(ex.description || "No description"),
              }}
            />
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => saveExercise(ex)}
                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Add to favourite
              </button>
              <button
                onClick={() => addToWorkout(ex)}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add to Workout
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      {filteredExercises.length > itemsPerPage && (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
