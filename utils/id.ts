export function generateUniqueId(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}

