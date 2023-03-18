import { CoursesListItem } from 'components/CourseListItem/CourseListItem';
import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import Pagination from 'components/Pagination/Pagination';
import { getAllCourses } from '../../services/api';
import scss from './CoursesList.module.scss';
import { FcGraduationCap } from "react-icons/fc";

const CoursesList = () => {

  const getPage = localStorage.getItem("PageNumber") ? 
  localStorage.getItem("PageNumber") : 1 ;

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [perPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(getPage);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);
  
  useEffect(() => {
    const getListOfCourses = async () => {
      try {
        setIsLoading(true);
        const { courses } = await getAllCourses();
        setCourses(courses);      
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getListOfCourses();
  }, [currentPage, perPage]);

  const getActiveCourses = ()=> {
    const end = currentPage * perPage;
    const start = end - perPage;
    return courses.slice(start, end);
  }


  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    localStorage.setItem("PageNumber", pageNumber);
  };
  
  return (
    <div className={scss.container}>
        <h1 className={scss.title}>Available courses {<FcGraduationCap/>}</h1>
      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... Message: {error}</p>}      
      <ul className={scss.list}>
        {getActiveCourses()?.map(course => (           
           <CoursesListItem key={course.id} courseInfo={course} />           
        ))}
      </ul>
      <div className={scss.paginationContainer}> 
        <Pagination perPage={perPage} totalCourses={courses.length} paginate={paginate}/>
    </div>
    </div>
  );
};
export default CoursesList;
