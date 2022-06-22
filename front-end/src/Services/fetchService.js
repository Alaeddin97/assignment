function ajax(url, requestMethod, jwt, requestBody) {
  const fetchData = {
    headers: {
      "Content-Type": "application/json",
    },
    method: requestMethod,
  };
  if (requestBody) fetchData.body = JSON.stringify(requestBody);
  if (jwt) fetchData.headers.Authorization = `Bearer ${jwt}`;

  return fetch(url, fetchData).then((response) => {
    if (response.status === 200) return response.json();
  });
}
export default ajax;
