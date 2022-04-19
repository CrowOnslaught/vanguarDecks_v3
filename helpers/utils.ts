const objectToQueryString = (obj: Record<string, string | string[]>) => {
  const str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(
        encodeURIComponent(p) + '=' + encodeURIComponent(String(obj[p]))
      );
    }
  return str.join('&');
};

export { objectToQueryString };
