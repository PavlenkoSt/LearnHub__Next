export enum ArticleFilterEnum {
  ALL = "0",
  ONLY_MINE = "1",
  ONLY_OTHERS = "2",
}

export interface IArticleSearchParams {
  page?: string;
  search?: string;
  filter?: ArticleFilterEnum;
  category?: string;
}
