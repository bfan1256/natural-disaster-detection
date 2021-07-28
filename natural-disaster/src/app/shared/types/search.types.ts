export interface Search {
  search_id: string;
  url: string;
  result: Array<any>;
}

export interface Event {
  num: string;
  dataset: string;
  title: string;
  type: string;
  url: string;
  imageUrl: string;
  narr: string;
  num_of_tweets: number;
  score: string;
}
