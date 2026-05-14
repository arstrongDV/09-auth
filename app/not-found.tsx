import React from 'react'
import css from './error.module.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page is not found.',
  openGraph: {
    title: 'Page not exist',
    description: 'The current page does not exist.',
    url: `https://notehub.com/notes/`,
    images: {
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt: 'noteHub-img'
    }
  }
}

const Error = () => {

  return (
    <div>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  )
}

export default Error
