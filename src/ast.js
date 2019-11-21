import {
  deleted, added, unchange, updated, nested,
} from './constants';


const buildAst = (obj1, obj2) => {
  const allKeys = Object.keys({ ...obj1, ...obj2 });
  return allKeys.reduce((acc, key) => {
    const deletedValue = obj1[key];
    const addedValue = obj2[key];
    if (addedValue instanceof Object && deletedValue instanceof Object) {
      return [...acc, { children: buildAst(deletedValue, addedValue), name: key, type: nested }];
    }
    if (addedValue === deletedValue) {
      return [...acc, { value: addedValue, type: unchange, name: key }];
    }
    if (addedValue === undefined) {
      return [...acc, { value: deletedValue, type: deleted, name: key }];
    }
    if (deletedValue === undefined) {
      return [...acc, { value: addedValue, type: added, name: key }];
    }
    return [...acc, {
      type: updated, deletedValue, addedValue, name: key,
    }];
  }, []);
};

export default buildAst;
