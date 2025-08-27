// src/pages/ExerciseDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchExerciseDetails } from "../services/fitnessApi";

const ExerciseDetails = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExercise = async () => {
      try {
        setLoading(true);
        const data = await fetchExerciseDetails(id);
        setExercise(data);
      } catch (err) {
        setError("Failed to load exercise details.");
      } finally {
        setLoading(false);
      }
    };
    loadExercise();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading exercise...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;
  if (!exercise) return <p className="text-center mt-10">Exercise not found.</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {exercise.name}
      </h1>

      {/* Description */}
      <p className="text-gray-700 mb-6">
        {exercise.description || "No description available."}
      </p>

      {/* Info Badges */}
      <div className="flex flex-wrap gap-3 mb-6">
        {exercise.category && (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            {exercise.category.name}
          </span>
        )}

        {exercise.muscles?.length > 0 && (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
            {exercise.muscles.map(m => m.name).join(", ")}
          </span>
        )}

        {exercise.equipment?.length > 0 && (
          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
            Equipment: {exercise.equipment.map(e => e.name).join(", ")}
          </span>
        )}
      </div>

      {/* Images */}
      {exercise.images?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {exercise.images.map((img, i) => (
            <img
              key={i}
              src={img.image}
              alt={`${exercise.name} example ${i + 1}`}
              className="rounded-lg shadow-md"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No images available.</p>
      )}
    </div>
  );
};

export default ExerciseDetails;
