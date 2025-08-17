// src/services/fitnessApi.js
const API_BASE = 'https://wger.de/api/v2';

export const fetchExercises = async () => {
  const response = await fetch(`${API_BASE}/exercise/`);
  if (!response.ok) throw new Error('Failed to fetch exercises');
  return response.json();
};

export const fetchExerciseDetails = async (id) => {
  const response = await fetch(`${API_BASE}/exerciseinfo/${id}/`);
  if (!response.ok) throw new Error('Failed to fetch exercise details');
  return response.json();
};

export const fetchExercisesByMuscle = async (muscleId) => {
  const response = await fetch(`${API_BASE}/exercise/?muscle=${muscleId}`);
  if (!response.ok) throw new Error('Failed to fetch exercises by muscle');
  return response.json();
};

export const fetchMuscleGroups = async () => {
  const response = await fetch(`${API_BASE}/muscle/`);
  if (!response.ok) throw new Error('Failed to fetch muscle groups');
  return response.json();
};