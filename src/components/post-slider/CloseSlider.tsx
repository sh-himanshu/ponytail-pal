import { IoMdClose } from "react-icons/io";

const CloseSlider = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      {...props}
      className="p-2 bg-gray-300/20 absolute top-5 right-5 rounded-full"
    >
      <IoMdClose className="h-6 w-6 text-gray-50" />
    </button>
  );
};

export default CloseSlider;
