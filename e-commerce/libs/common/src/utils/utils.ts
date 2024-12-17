// export const dtoToQueryString = <T extends Record<string, any>>(
export const dtoToQueryString = (dto: any): string => {
  const params = new URLSearchParams();

  Object.entries(dto).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        // If the value is an array, append each value with the same key
        value.forEach((item) => params.append(key, String(item)));
      } else {
        // Otherwise, append the value directly
        params.append(key, String(value));
      }
    }
  });

  return params.toString(); // Generates query string dynamically
};
