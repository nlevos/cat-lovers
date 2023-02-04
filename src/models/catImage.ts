import { Breed } from "./breed";

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: Breed[];
  isFavourite?: boolean;

  // // [index: string]: any; // number | string | boolean;

  // filter?: Filter;
  // last_viewed_at?: string;
  // schedule?: Schedule;
  // title?: string;
}
