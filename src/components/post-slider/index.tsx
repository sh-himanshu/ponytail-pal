import Slider, { Settings as SliderProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import FullPost from "./FullPost";
import CloseSlider from "./CloseSlider";
import { Modal } from "react-overlays";
import { closePopUp } from "../../features/toggle/toggleSlice";

const PostSlider = () => {
  const popUpState = useAppSelector(({ toggle }) => toggle.popUp);
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts);
  const postKeys = [...Object.keys(posts)].reverse();
  const settings: SliderProps = {
    dots: false,
    arrows: false,
    centerMode: true,
    lazyLoad: "ondemand",
    slidesToShow: 1,
    centerPadding: "40px",
    speed: 500,
    // afterChange: (index) =>
    //   console.log("afterChange", posts[postKeys[index]].text),
    // beforeChange: (current, next) => console.log("beforeChange", current, next),
    // onEdge: (direction) =>
    //   console.log("onEdge", console.log("FETCH MORE POSTS", direction)),
  };

  return (
    <Modal
      show={popUpState.show}
      renderBackdrop={(props) => (
        <div {...props} className="fixed  inset-0  bg-black/90" />
      )}
      aria-labelledby="modal-label"
    >
      <div className="fixed inset-0 flex items-center z-50">
        <Slider {...settings} className="w-full">
          {postKeys.map((key, index) => (
            <FullPost post={posts[key]} key={`post-${index}`} date={key} />
          ))}
        </Slider>
        <CloseSlider onClick={() => dispatch(closePopUp())} />
      </div>
    </Modal>
  );
};

export default PostSlider;
