'use client'

import { useState } from 'react'
import css from './NotesPage.module.css'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { useDebouncedCallback } from 'use-debounce'
import { fetchNotes } from '@/lib/api/clientApi';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import { useRouter } from 'next/navigation'

interface NotesProps {
  tag: string | undefined;
}

function Notes({ tag }: NotesProps) {
  const [page, setPage] = useState(1);

  const [inputValue, setInputValue] = useState(''); 
  const [searchQuery, setSearchQuery] = useState('');

  const { push } = useRouter();

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setPage(1); // 🔥 reset сторінки
  }, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, searchQuery, tag],
    queryFn: () => fetchNotes({
          page: page,
          search: searchQuery,
          tag: tag
    }),
    placeholderData: keepPreviousData
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
  <div className={css.app}>
    <header className={css.toolbar}>
    <SearchBox
      searchQuery={inputValue}
      onChange={(value: string) => {
        setInputValue(value);
        debouncedSearch(value);
      }}
    />
      <button className={css.button} onClick={() => push('/notes/action/create')}>Create note +</button>
    </header>

    {data?.notes && (
      <NoteList notes={data?.notes || []} />
    )} 

    {data && data?.totalPages > 1 && (
        <Pagination totalPages={data?.totalPages} currentPage={page} onPageChange={setPage} />
      )}
  </div>
  )
}

export default Notes;