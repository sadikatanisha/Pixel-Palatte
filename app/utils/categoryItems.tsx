import { Globe } from "lucide-react";
import { ReactNode } from "react";

interface iAppProps {
  id: number;
  name: string;
  title: string;
  image: ReactNode;
}

export const categoryItems: iAppProps[] = [
  {
    id: 0,
    name: "templates",
    title: "Templates",
    image: <Globe />,
  },
  {
    id: 1,
    name: "uikit",
    title: "Ui-Kit",
    image: <Globe />,
  },
  {
    id: 2,
    name: "icon",
    title: "Icon",
    image: <Globe />,
  },
];
