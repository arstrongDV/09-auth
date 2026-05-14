import { create } from 'zustand'
import { ToDoFormValues } from '@/components/NoteForm/NoteForm';
import { persist } from 'zustand/middleware';

interface Store {
    draft: ToDoFormValues
    setDraft: (note: ToDoFormValues) => void;
    clearDraft: () => void;
}

const initialDraft: ToDoFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<Store>()(
    persist(
        (set) => ({
            draft: initialDraft,
            setDraft: (note) => set(() => ({draft: note})),
            clearDraft: () => set(() => ({draft: initialDraft})),
        }),
        {
            name: 'note-draft',
            partialize: (state) => ({ draft: state.draft })
        }
    )
)