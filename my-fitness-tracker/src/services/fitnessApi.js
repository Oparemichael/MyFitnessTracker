// src/services/fitnessApi.js
const API_BASE = 'https://wger.de/api/v2';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorMessage = `API error: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return response.json();
};

export const fetchExercises = async () => {
  try {
    const response = await fetch(`${API_BASE}/exercise/`);
    return handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};

export const fetchExerciseDetails = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/exerciseinfo/${id}/`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Failed to fetch exercise details for ID ${id}:`, error);
    throw error;
  }
};

export const fetchExercisesByMuscle = async (muscleId) => {
  const response = await fetch(`${API_BASE}/exercise/?muscles=${muscleId}&language=2`);
  if (!response.ok) throw new Error('Failed to fetch exercises by muscle');
  return response.json();
};

export const fetchMuscleGroups = async () => {
  try {
    const response = await fetch(`${API_BASE}/muscle/`);
    return handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch muscle groups:', error);
    throw error;
  }
};
