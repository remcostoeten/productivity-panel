import { motion } from "framer-motion";

interface OptionButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center py-1.5 pr-1.5 pl-2.5 w-full rounded-md border border-solid bg-neutral-900 border-neutral-800 mb-3"
      onClick={onClick}
    >
      <div className="flex flex-col items-start self-stretch pr-2 my-auto w-6">
        <motion.img
          loading="lazy"
          src={icon}
          alt=""
          className="object-contain w-4 aspect-square"
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="flex flex-col flex-1 shrink items-start self-stretch pr-56 my-auto text-sm leading-none text-center capitalize whitespace-nowrap basis-0 min-w-[70px] text-zinc-100">
        <span>{label}</span>
      </div>
      <div className="flex flex-col justify-center items-center self-stretch pr-1 pl-1.5 my-auto rounded border border-solid border-neutral-800 h-[25px] w-[26px]">
        <motion.img
          loading="lazy"
          src="http://b.io/ext_15-"
          alt=""
          className="object-contain w-4 aspect-square"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.button>
  );
};

export default OptionButton;
