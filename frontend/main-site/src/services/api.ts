
import { Language, Professor } from "@/types";
import { languages } from "@/data/languages";
import { professors } from "@/data/professors";

// Simulate API delay for testing
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Language APIs
export const fetchLanguages = async (): Promise<Language[]> => {
  // Simulate API call
  await delay(800);
  return languages;
};

export const fetchLanguageById = async (id: string): Promise<Language | undefined> => {
  await delay(500);
  return languages.find(lang => lang.id === id);
};

// Professor APIs
export const fetchProfessors = async (): Promise<Professor[]> => {
  await delay(800);
  return professors;
};

export const fetchProfessorById = async (id: string): Promise<Professor | undefined> => {
  await delay(500);
  return professors.find(prof => prof.id === id);
};

// More API functions can be added as needed
