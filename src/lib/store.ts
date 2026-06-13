import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  sidebarOpen: boolean
  toggleSidebar: () => void
  selectedDocuments: string[]
  toggleDocument: (fileName: string) => void
  selectAllDocuments: (fileNames: string[]) => void
  deselectAllDocuments: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      selectedDocuments: [],
      toggleDocument: (fileName) => set((state) => ({
        selectedDocuments: state.selectedDocuments.includes(fileName)
          ? state.selectedDocuments.filter(f => f !== fileName)
          : [...state.selectedDocuments, fileName]
      })),
      selectAllDocuments: (fileNames) => set({ selectedDocuments: fileNames }),
      deselectAllDocuments: () => set({ selectedDocuments: [] }),
    }),
    {
      name: 'insightos-storage',
    }
  )
)
