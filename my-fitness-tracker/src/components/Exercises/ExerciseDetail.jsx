// src/components/Exercises/ExerciseDetail.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchExerciseDetails } from '../../services/fitnessApi';

const ExerciseDetail = () => {
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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadExercise();
  }, [id]);

  if (loading) return <div>Loading exercise details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!exercise) return <div>Exercise not found</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{exercise.name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Description</h3>
          <p className="text-gray-700">{exercise.description}</p>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Muscles</h3>
            <div className="flex flex-wrap gap-2">
              {exercise.muscles.map(muscle => (
                <span key={muscle.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {muscle.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Instructions</h3>
          <ol className="list-decimal pl-5 space-y-2">
            {exercise.instructions.map((instruction, index) => (
              <li key={index} className="text-gray-700">{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;