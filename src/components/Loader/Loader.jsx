
import { RotatingLines } from 'react-loader-spinner';
import scss from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={scss.loader}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};