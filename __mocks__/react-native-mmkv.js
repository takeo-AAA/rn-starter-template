const createMMKV = () => {
  const store = new Map();
  return {
    getString: key => store.get(key),
    getBoolean: key => store.get(key),
    getNumber: key => store.get(key),
    set: (key, value) => store.set(key, value),
    remove: key => store.delete(key),
    clearAll: () => store.clear(),
    contains: key => store.has(key),
  };
};

module.exports = {createMMKV};
