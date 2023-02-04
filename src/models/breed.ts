import { Image } from "./image";

export interface Breed {
  id: string;
  name: string;
  alt_names?: string;
  decription?: string;
  demoImageUrl?: string;
  image?: Image;
}
