export const createQueryString = (params: {
  [key: string]: string | undefined;
}): string => {
  const queryParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value) {
      queryParams.append(key, value);
    }
  });

  return queryParams.toString();
};
