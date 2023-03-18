import { NavLink, Outlet } from 'react-router-dom';
import css from './Layout.module.scss';

export const Layout = () => {
  
    return (
      <>
        <header className={css.header}>
        <NavLink
            to="/"
            className={css.navLink}
            style={({ isActive }) => ({
              color: isActive ? '#f53b57' : '#485460',
            })}
          >
            All courses
          </NavLink>
          <NavLink
            to="/course"
            className={css.navLink}
            style={({ isActive }) => ({
              color: isActive ? '#f53b57' : '#485460',
            })}
          >
            Course
          </NavLink>
        </header>
        <main className={css.main}>
          <Outlet />
        </main>
      </>
    );
  };