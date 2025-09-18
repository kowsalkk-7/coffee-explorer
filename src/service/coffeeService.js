const API_URL = "https://api.sampleapis.com/coffee/hot";

async function getAll() {
  const res = await fetch(API_URL);
  return res.json();
}

async function create(data) {
  return { id: Date.now(), ...data };
}

async function update(id, data) {
  return { id, ...data };
}

async function remove(id) {
  return id;
}

export default { getAll, create, update, remove };
