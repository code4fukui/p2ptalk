export const api = async (url, json) => {
  return new Promise(async (resolve, reject) => {
    try {
      const opt = json ? { method: "POST", body: JSON.stringify(json) } : { method: "GET" };
      const res = await fetch(url, opt);
      const txt = await res.text();
      if (!txt) {
        return resolve(null);
      }
      resolve(JSON.parse(txt));
    } catch (e) {
      reject(e);
    }
  });
};
