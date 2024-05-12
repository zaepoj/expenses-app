import { HiQuestionMarkCircle } from "react-icons/hi/index.js";

type HelperIconProps = {
  helperText: string;
};

const HelperIcon = ({ helperText }: HelperIconProps) => {
  // Helper Icon with tooltip
  return (
    <div className="flex items-center group">
      <HiQuestionMarkCircle className="question text-2xl" />
      <label className="invisible absolute z-[999] opacity-0 transition-opacity text-almostWhite bg-indigo-900 p-1 group-hover:visible group-hover:opacity-100 rounded ml-8">
        {helperText}
      </label>
    </div>
  );
};

export default HelperIcon;
