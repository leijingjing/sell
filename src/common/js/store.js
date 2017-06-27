export function setStorage (id, key, val) {
  let storage = window.localStorage._seller_;
  if (!storage) {
    storage = {};
    storage[id] = {};
  } else {
    storage = JSON.parse(storage);
    if (!storage[id]) {
      storage[id] = {};
    }
  }
  storage[id][key] = val;
  window.localStorage._seller_ = JSON.stringify(storage);
}

export function getStorage (id, key, def) {
  let storage = window.localStorage._seller_;
  if (!storage) {
    return def;
  }
  let ret = JSON.parse(storage)[id];
  if (!ret) {
    return def;
  }
  return ret[key] || def;
}
