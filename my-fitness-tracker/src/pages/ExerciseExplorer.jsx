import { useEffect, useState } from 'react';
import { 
  fetchMuscleGroups, 
  fetchExercisesByMuscle, 
  fetchExerciseDetails 
} from '../services/fitnessApi';

const ExerciseExplorer = () => {
  const [muscles, setMuscles] = useState([]);
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseDetails, setExerciseDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Load muscle groups
  useEffect(() => {
    const loadMuscles = async () => {
      try {
        const data = await fetchMuscleGroups();
        setMuscles(data.results);
      } catch (err) {
        console.error('Error loading muscles:', err);
      }
    };
    loadMuscles();
  }, []);

// Load exercises when muscle changes
useEffect(() => {
  if (!selectedMuscle) return;
  const loadExercises = async () => {
    setLoading(true);
    try {
      const data = await fetchExercisesByMuscle(selectedMuscle);

      // ✅ Keep only English (language.id === 2) and valid names
      const englishExercises = data.results.filter(
        (ex) => ex.language?.id === 2 && ex.name
      );

      setExercises(englishExercises);
    } catch (err) {
      console.error('Error loading exercises:', err);
    } finally {
      setLoading(false);
    }
  };
  loadExercises();
}, [selectedMuscle]);

  // Load details when an exercise is selected
  useEffect(() => {
    if (!selectedExercise) return;
    const loadDetails = async () => {
      setDetailsLoading(true);
      try {
        const data = await fetchExerciseDetails(selectedExercise);
        setExerciseDetails(data);
      } catch (err) {
        console.error('Error loading details:', err);
      } finally {
        setDetailsLoading(false);
      }
    };
    loadDetails();
  }, [selectedExercise]);

  const filteredExercises = exercises.filter((ex) =>
  (ex.name || "").toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className="min-h-screen w-screen bg-gray-100 p-6 flex">
      {/* Sidebar: Muscles */}
      <aside className="w-1/4 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Muscle Groups</h2>
        <ul className="space-y-2">
          {muscles.map(muscle => (
            <li key={muscle.id}>
              <button
                className={`w-full text-left px-3 py-2 rounded-md ${
                  selectedMuscle === muscle.id
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setSelectedMuscle(muscle.id)}
              >
                {muscle.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Exercises</h2>
            <input
              type="text"
              placeholder="Search exercises..."
              className="border rounded-md px-3 py-1 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading && <p className="text-gray-500">Loading exercises...</p>}

          {!loading && filteredExercises.length === 0 && (
            <p className="text-gray-500">No exercises found.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredExercises.map(ex => (
              <div
                key={ex.id}
                className="border rounded-lg p-4 hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold text-gray-800">{ex.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {ex.description
                    ? ex.description.slice(0, 120) + '...'
                    : 'No description available'}
                </p>
                <button 
                  onClick={() => setSelectedExercise(ex.id)}
                  className="mt-3 text-blue-600 text-sm hover:underline"
                >
                  View Details →
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Exercise Details Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button 
              onClick={() => { setSelectedExercise(null); setExerciseDetails(null); }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            {detailsLoading && <p>Loading details...</p>}
            {!detailsLoading && exerciseDetails && (
              <>
                <h2 className="text-2xl font-bold mb-2">{exerciseDetails.name}</h2>
                <p className="text-gray-700 mb-4">{exerciseDetails.description || 'No description available'}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">Primary Muscles</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {exerciseDetails.muscles?.map(m => (
                        <li key={m.id}>{m.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Secondary Muscles</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {exerciseDetails.muscles_secondary?.map(m => (
                        <li key={m.id}>{m.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800">Equipment</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {exerciseDetails.equipment?.map(eq => (
                      <li key={eq.id}>{eq.name}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseExplorer;
