export type RootStackParamList = {
  Main: undefined;
  Camera: undefined;
  Favourites: undefined;
  Cart: undefined;
  RecipeOverview: { item: ResultItem };
  RecipePage: { item: ResultItem; score: number | null};
  Search: undefined;
  Categories: undefined;
  CategoriesResults: { results: ResultItem[]; title: string };
  Product: { product: Product };
};