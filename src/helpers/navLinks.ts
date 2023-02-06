import { HomeIcon, HashtagIcon, HeartIcon } from "@heroicons/react/24/outline";

export const nav_links = [
  {
    id: 1,
    title: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    id: 2,
    title: "Filtered Breeds",
    icon: HashtagIcon,
    href: "/breeds",
  },
  {
    id: 3,
    title: "All Breeds",
    icon: HashtagIcon,
    href: "/allbreeds",
  },
  {
    id: 4,
    title: "My Favourites",
    icon: HeartIcon,
    href: "/favourites",
  },
];
