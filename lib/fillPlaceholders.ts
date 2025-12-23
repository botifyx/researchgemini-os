
export function fillPlaceholders(text: string, values: Record<string, string>): string {
  return text.replace(/{{(.*?)}}/g, (match, p1) => {
    const key = p1.trim();
    return values[key] || match; // Keep the placeholder if no value is provided to show the user it's missing
  });
}
