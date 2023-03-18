
import React from 'react';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Loader } from './Loader/Loader';
import { Layout } from './Layout/Layout';

const CoursesPage = lazy(() => import('pages/CoursesPage/CoursesPage'));
const LessonPage = lazy(() => import('../pages/LessonPage/LessonPage.jsx'));

export const App = () => {
  
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CoursesPage />} />
            <Route path="/course" element={<LessonPage />} />
            <Route path="/course/:id" element={<LessonPage />}/>
            <Route path="*" element={<Navigate to={'/'} />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
