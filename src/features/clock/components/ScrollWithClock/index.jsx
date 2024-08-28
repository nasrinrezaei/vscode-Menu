import PropTypes from "prop-types";
import classes from "./index.module.scss";
import { useEffect, useRef, memo, useMemo } from "react";

function ScrollWithClock({ basedHeight = 200 }) {
  const min = useRef(null);
  const hour = useRef(null);
  const degreeBasedOnPx = useMemo(() => 360 / basedHeight, [basedHeight]);

  useEffect(() => {
    const scrollEvent = () => {
      min.current.style.transform = `rotate(${degreeBasedOnPx * window.scrollY}deg)`;
      hour.current.style.transform = `rotate(${Math.floor((degreeBasedOnPx * window.scrollY) / 30) * 2.5}deg)`;
    };
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);
  return (
    <>
      <div>
        <div className={classes["scroll-with-clock"]} />
        <div className={classes["scroll-with-clock__clock"]}>
          <div className={classes["scroll-with-clock__clock-hands-container"]}>
            <div
              className={
                classes["scroll-with-clock__clock-hands-container-minute-hand"]
              }
              ref={min}
            />
            <div
              className={
                classes["scroll-with-clock__clock-hands-container-hour-hand"]
              }
              ref={hour}
            />
          </div>
        </div>
      </div>
    </>
  );
}

ScrollWithClock.propTypes = {
  basedHeight: PropTypes.number,
};
export default memo(ScrollWithClock);
