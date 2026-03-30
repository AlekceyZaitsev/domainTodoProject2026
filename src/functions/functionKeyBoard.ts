export function functionKeyBoard(
  event: React.KeyboardEvent<HTMLInputElement>,
  nameKey: string,
  functions?: () => void,
  parameters?: string
) {
  if (event.key.toLowerCase() === nameKey.toLowerCase()) {
    if (parameters.length && parameters.trim()) {
      return functions();
    }
  }
}
