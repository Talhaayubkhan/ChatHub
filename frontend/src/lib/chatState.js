const MAX_MESSAGE_LENGTH = 2000;

export const normalizeMessageText = (value = "") =>
  String(value).trim().slice(0, MAX_MESSAGE_LENGTH);

export const formatMessageTime = (value, now = new Date()) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const elapsedMilliseconds = Math.max(0, now.getTime() - date.getTime());
  const minutes = Math.floor(elapsedMilliseconds / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: date.getFullYear() === now.getFullYear() ? undefined : "numeric",
  });
};

export const readStoredJson = (storage, key, fallback) => {
  try {
    const value = storage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const writeStoredJson = (storage, key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const createManagedSocket = (connect, server) => {
  const socket = connect(server, { withCredentials: true });
  return { socket, dispose: () => socket.disconnect() };
};

export { MAX_MESSAGE_LENGTH };
