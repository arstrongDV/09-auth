'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteForm.module.css'
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik'
import * as Yup from "yup";
import { createNote } from '../../lib/api/clientApi';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';

export interface ToDoFormValues {
    title: string,
    content: string,
    tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
    // tag: string;
}

// const initialValues: ToDoFormValues = {
//     title: '',
//     content: '',
//     tag: 'Todo' 
// };

const NoteForm = () => {
//     const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     tag: 'Todo' as const
//   });Partial<Record<keyof ToDoFormValues, string>>
  const [errors, setErrors] = useState <Partial<Record<keyof ToDoFormValues, string>>>({});

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { back, push } = useRouter();

    const queryClient = useQueryClient();

    const postToDoMutation = useMutation({
    mutationFn: (values: ToDoFormValues) => createNote(values),
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({queryKey: ['notes']})
      back();
    }
  })

const handleCancel = () => back();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDraft({
            ...draft,
            [name]: name === 'tag' ? value as ToDoFormValues['tag'] : value,
        });

        if(errors[name as keyof ToDoFormValues]){
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name as keyof ToDoFormValues];
                return newErrors;
            });
        }
    }

const validate = () => {
    const newErrors: Partial<Record<keyof ToDoFormValues, string>> = {};
    if (draft.title.length < 3) newErrors.title = "Title must be at least 3 characters";
    if (draft.content.length > 50) {
        newErrors.content = "Content is too long";
    } else if (!draft.content || draft.content.length < 3) {
        newErrors.content = "Content must be at least 3 characters";
    }
    if (!draft.tag) newErrors.tag = "Tag is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault(); 
    if (validate()) {
      postToDoMutation.mutate(draft);
    }
  };

  return (
    // <Formik
    //     initialValues={initialValues}
    //     validationSchema={FormSchema}
    //     onSubmit={handleSubmit}
    // >
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <input 
                    id="title" 
                    type="text" 
                    name="title" 
                    className={css.input} 
                    value={draft.title}
                    onChange={handleChange}
                />
                {/* <span name="title" className={css.error} /> */}
                {/* <ErrorMessage component="span" name="title" className={css.error} /> */}
                {errors.title && <span className={css.error}>{errors.title}</span>}
            </div>

            

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    rows={8}
                    className={css.textarea}
                    value={draft.content}
                    onChange={handleChange}
                />
                {errors.content && <span className={css.error}>{errors.content}</span>}
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <select id="tag" name="tag" className={css.select} value={draft.tag} onChange={handleChange}>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
                {errors.tag && <span className={css.error}>{errors.tag}</span>}
            </div>

            <div className={css.actions}>
                <button onClick={handleCancel} type="button" className={css.cancelButton}>
                Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={postToDoMutation.isPending}
                >
                Create note
                </button>
            </div>
        </form>
    // </Formik>
  )
}

export default NoteForm
