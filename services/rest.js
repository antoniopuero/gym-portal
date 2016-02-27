import superagent from "superagent";
import getError from "../utils/client-errors";

function request({method, url, send, query={}, headers={}}) {
  return new Promise((resolve, reject) => {
    superagent[method](url)
      .query(query)
      .set(headers)
      .send(send)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
  });
}

async function wrappedRequest({ method, url, send, query, headers }) {
  try {
    return await request({ method, url, send, query, headers});
  } catch (err) {
    throw getError(err);
  }
}

async function get(data) {
  return await wrappedRequest({ method: "get", ...data });
}

async function post(data) {
  return await wrappedRequest({ method: "post", ...data });
}

async function put(data) {
  return await wrappedRequest({ method: "put", ...data });
}

async function del(data) {
  return await wrappedRequest({ method: "delete", ...data });
}

export async function login (data) {
  let res = await post({
    url: '/auth/login',
    send: data
  });

  localStorage.setItem("user", JSON.stringify(res));

  return res;
}

export async function signup (data) {
  const res = await post({
    url: '/auth/signup',
    send: data
  });
  localStorage.setItem('user', JSON.stringify(res));
  return res;
}

export async function logout (data) {
  const res = await post({
    url: '/auth/logout',
    send: data
  });
  localStorage.removeItem('user');
  return res;
}

export async function checkSession (data) {
  const res = await post({
    url: '/auth/session',
    send: data
  });
  return res;
}