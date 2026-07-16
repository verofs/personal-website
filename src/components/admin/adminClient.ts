export function csrfToken() {
  return document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("vfs_admin_csrf="))
    ?.split("=")[1] ?? "";
}

export async function adminFetch(path: string, init: RequestInit = {}) {
  const response = await fetch(path, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      "x-csrf-token": csrfToken(),
    },
  });
  if (!response.ok) {
    let message = "Request failed";
    try {
      const data = (await response.json()) as { error?: string };
      message = data.error ?? message;
    } catch {
      // Keep the generic message when the response is not JSON.
    }
    throw new Error(message);
  }
  return response;
}
