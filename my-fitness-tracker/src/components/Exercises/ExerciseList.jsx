// src/components/Exercises/ExerciseList.jsx
import { useState, useEffect } from 'react';
import { fetchExercises, fetchExercisesByMuscle } from '../../services/fitnessApi';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMuscle, setSelectedMuscle] = useState(null);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        setLoading(true);
        const data = selectedMuscle 
          ? await fetchExercisesByMuscle(selectedMuscle)
          : await fetchExercises();
        setExercises(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, [selectedMuscle]);

  if (loading) return <div>Loading exercises...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Exercises</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Muscle Group
        </label>
        <select
          onChange={(e) => setSelectedMuscle(e.target.value)}
          className="border rounded p-2 w-full md:w-1/3"
        >
          <option value="">All Exercises</option>
          <option value="1">Biceps</option>
          <option value="2">Quadriceps</option>
          {/* Add more muscle groups as needed */}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold">{exercise.name}</h3>
            <p className="text-gray-600 mt-2">
              {exercise.description.substring(0, 100)}...
            </p>
            <div className="mt-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {exercise.category.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;