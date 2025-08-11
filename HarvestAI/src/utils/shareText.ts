export const stripHtml = (s?: string) =>
  (s ?? '').replace(/<\/?[^>]+(>|$)/g, '').trim();

export const recipeCopyText = ({
  title,
  score,
  calories,
  ingredients,
  steps,
}: {
  title: string;
  score?: number;
  calories?: string;
  ingredients?: string[];
  steps?: string[];
}) => {
  const ratingText = score ? `Rating: ${Math.round(score / 20)}/5` : '';
  const caloriesText = calories ? `Calories: ${calories}` : '';

  const ingredientsText = ingredients?.length
    ? `Ingredients:\n${ingredients.map((i) => `• ${i}`).join('\n')}\n`
    : '';

  const stepsText = steps?.length
    ? `Preparation:\n${steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`
    : 'No Instructions Found';

  return [
    `🍽️ ${title}`,
    ratingText,
    caloriesText && `${caloriesText}\n`,
    ingredientsText,
    stepsText,
  ]
    .filter(Boolean)
    .join('\n');
};

