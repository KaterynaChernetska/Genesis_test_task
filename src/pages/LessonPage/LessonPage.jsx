import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseById } from 'services/api';
import scss from './LessonPage.module.scss';
import { Loader } from 'components/Loader/Loader';
import { BsFillLockFill } from 'react-icons/bs';
import React from 'react';
import Notiflix from 'notiflix';
import { Video } from '../../components/Video/Video';

const LessonPage = () => {
  const getButton = localStorage.getItem('Button')
    ? localStorage.getItem('Button')
    : null;

  const navigate = useNavigate();
  const { id } = useParams();
  const [isActive, setIsActive] = useState(getButton);
  const [courseInfo, setCourseInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lesson, setLesson] = useState(null);
  const playerRef = React.useRef(null);

  useEffect(() => {
    if (!id) {
      navigate('/');
      Notiflix.Notify.info('Choose course first, please');
    }
    const getCourseInfo = async () => {
      try {
        setIsLoading(true);
        const course = await getCourseById(id);
        setCourseInfo(course);
      } catch {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCourseInfo(id);
  }, [id, error, navigate]);

  if (!courseInfo) {
    return;
  }

  const { lessons, title, description,duration, rating, previewImageLink } = courseInfo;

  lessons.sort((first, second)=> first.order - second.order );

  const filterLessons = id => {
    setLesson(lessons.find(lesson => lesson.id === id));
  };

  const handleClick = id => {
    filterLessons(id);
    localStorage.setItem('Button', id);
    setIsActive(id);
  };

  const videoOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    autoplay: true,
    sources: [
      {
        src: lesson?.link || lessons[0].link,
        type: 'application/x-mpegURL',
      },
    ],
    techOrder: ['html5'],
  };

  const handlePlayer = player => {
    playerRef.current = player;

    if (localStorage.getItem('Seconds')) {
      player.currentTime(localStorage.getItem('Seconds'));
    }
    player.on('timeupdate', function () {
      localStorage.setItem('Seconds', player.cache_.currentTime);
    });
  };

  return (
    <div className={scss.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className={scss.title}>{title}</h1>
          <div className={scss.videoContainer}>
            <img src={previewImageLink + '/cover.webp'} alt={title} />
          </div>
          <div className={scss.videoInfo}>
            <p className={scss.description}>{description}</p>
          <div className={scss.info}>
              <p>Rating: {rating}</p>
            <p>Duration: {Math.round(duration/60)} min</p>
            </div>
            <h3 className={scss.lessonTitle}>Lessons:</h3>
            <div>               
              <ul className={scss.lessonsListContainer}>
                {lessons?.map(lesson => (
                  <li className={scss.listItem} key={lesson.id}>
                    <button
                      onClick={() => handleClick(lesson.id)}
                      className={isActive === lesson.id ? 'active' : undefined}
                    >
                      {lesson.order}.{lesson.title}
                      {lesson.status === 'locked' && <BsFillLockFill />}
                    </button>
                  </li>
                ))}
              </ul>
              {lesson?.status === 'locked' ? (
                <div className={scss.lockedVideoInfo}>
                  <span>This video is Locked </span>
                  <BsFillLockFill />
                </div>
              ) : (
                <Video options={videoOptions} onReady={handlePlayer} />
              )}
            </div>
          </div>
        </>
      )}
      {error !== null && <p>Oops, some error occured... Message: {error}</p>}
    </div>
  );
};

export default LessonPage;
