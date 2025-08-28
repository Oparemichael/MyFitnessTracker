import React, { useEffect, useState } from "react";

export default function ExerciseExplorer() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch all exercise translations in English (with caching)
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

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentExercises = exercises.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(exercises.length / itemsPerPage);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Exercise Explorer</h1>

      {loading && <p>Loading exercises...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && currentExercises.length === 0 && (
        <p>No English exercises found.</p>
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
              dangerouslySetInnerHTML={{ __html: ex.description }}
            />
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      {exercises.length > itemsPerPage && (
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
