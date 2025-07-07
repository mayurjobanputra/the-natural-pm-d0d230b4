import { create } from 'zustand';

interface AssessmentData {
  name: string;
  email: string;
  experience: string;
  background: string;
  goal: string;
  challenge: string;
  timeline: string;
}

interface AppState {
  // Assessment state
  assessmentData: AssessmentData | null;
  setAssessmentData: (data: AssessmentData) => void;
  
  // UI state
  currentSection: string;
  setCurrentSection: (section: string) => void;
  
  // Form state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Assessment state
  assessmentData: null,
  setAssessmentData: (data) => set({ assessmentData: data }),
  
  // UI state
  currentSection: 'hero',
  setCurrentSection: (section) => set({ currentSection: section }),
  
  // Form state
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));