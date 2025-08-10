export const stripHtml = (s?: string) =>
  (s ?? '').replace(/<\/?[^>]+(>|$)/g, '').trim();

export const recipeCopyText = (p: {
  title: string;
  score?: number;
  calories?: string;
  steps?: string[];
  url?: string;
}) => {
  const stars = typeof p.score === 'number' ? `${Math.round(p.score / 20)}/5` : undefined;

  const head = [
    `🍽️ ${p.title}`,
    stars && `Rating: ${stars}`,
    p.calories && `Calories: ${p.calories}`,
  ].filter(Boolean).join('\n');

  if (p.steps?.length) {
    const lines = p.steps.map((s, i) => `${i + 1}. ${s.replace(/\.$/, '')}.`);
    return [head, '', 'Preparation:', ...lines, p.url ? `\nLink: ${p.url}` : '']
      .filter(Boolean)
      .join('\n');
  }

  // No steps case
  return [head, '', 'No Instructions Found', p.url ? `\nLink: ${p.url}` : '']
    .filter(Boolean)
    .join('\n');
};
