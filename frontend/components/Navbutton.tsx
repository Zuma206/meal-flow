import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

type Props = {
  name: string;
  icon: ReactNode;
  href?: string;
};

export default function Navbutton(props: Props) {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col items-center">
      <Link
        className="flex flex-col items-center transition hover:opacity-50"
        to={props.href ?? "#"}
      >
        <span className="text-xl">{props.icon}</span>
        <span className="text-md font-semibold">{props.name}</span>
      </Link>
      {pathname.startsWith(props.href ?? "") ? (
        <motion.div
          layoutId="navButton"
          className="h-1 w-full rounded-full bg-gray-400"
        />
      ) : (
        <div className="h-1" />
      )}
    </div>
  );
}
