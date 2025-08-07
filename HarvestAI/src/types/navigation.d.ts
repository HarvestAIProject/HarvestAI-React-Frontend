export type RootStackParamList = {
  Main: undefined;
  Camera: undefined;
  Favourites: undefined;
  RecipeOverview: { item: ResultItem };
  RecipePage: { item: ResultItem; score: number | null};
  Search: undefined;
  Categories: undefined;
};