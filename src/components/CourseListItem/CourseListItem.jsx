import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../../components/Video/Video';
import scss from './CourseListItem.module.scss';
import {FcCheckmark} from "react-icons/fc";
import {BsHash} from "react-icons/bs";
 
export const CoursesListItem = ({
  courseInfo: {
    id,
    tags,
    title,
    lessonsCount,
    rating,
    meta: { skills, courseVideoPreview },
    previewImageLink,
  },
}) => {
  const [hover, setHover] = useState(false);

  const videoOptions = {
    controls: false,
    responsive: true,
    fluid: true,
    autoplay: true,
    muted: true,
    sources: [
      {
        src: courseVideoPreview?.link,
        type: 'application/x-mpegURL',
      },
    ],
    techOrder: ['html5'],
  };

  const playMovie = e => {
    setHover(true);
  };
  const stopMovie = e => {
    setHover(false);
  };

  return (
    <li className={scss.listItem}>
      <Link to={`course/${id}`}>
        <div className={scss.videoContainer} onMouseEnter={playMovie} onMouseLeave={stopMovie}>
          {hover ? (
            <Video options={videoOptions} />
          ) : (
            <img src={previewImageLink + '/cover.webp'} alt={title} />
          )}
        </div>

        <div  className={scss.textContainer}>
          <h2 className={scss.courseTitle}>{title}</h2>
          <div className={scss.info}>
            <p>Lessons: {lessonsCount}</p>
            <p>Rating: {rating} </p>
          </div>
          <div>
            <ul className={scss.skillsList}>
              <h3 className={scss.skillsTitle} >Skills:</h3>
              {skills?.map(skill => (
                <li className={scss.skillsItem} key={skill}>{<FcCheckmark/>} {skill}</li>
              ))}
            </ul>
            <ul className={scss.tagsList}>
              <h3 className={scss.skillsTitle}>Tags:</h3>
              {tags?.map(tag => (
                <li key={tag}>{<BsHash/>}{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </li>
  );
};
