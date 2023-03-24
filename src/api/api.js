export const fetcher = async (path) => {
  const response = await fetch(path, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Fetch request failed");
  }

  return await response.json();
};
