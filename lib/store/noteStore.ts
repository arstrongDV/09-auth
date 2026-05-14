import { Note, NoteTag } from '@/types/note';
import { create } from 'zustand' 
import { NotesData } from '../api/clientApi';
import { persist } from 'zustand/middleware';

interface Store {
    draft: NotesData
    setDraft: (note: NotesData) => void;
    clearDraft: () => void;
}

const initialDraft: NotesData = {
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