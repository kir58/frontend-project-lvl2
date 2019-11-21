import {
  deleted, added, unchanged, updated, nested,
} from './constants';


const buildAst = (obj1, obj2) => {
  const allKeys = Object.keys({ ...obj1, ...obj2 });
  return allKeys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (value1 instanceof Object && value2 instanceof Object) {
      return [...acc, { children: buildAst(value1, value2), name: key, type: nested }];
    }
    if (value1 === value2) {
      return [...acc, { value: value1, type: unchanged, name: key }];
    }
    if (value2 === undefined) {
      return [...acc, { value: value1, type: deleted, name: key }];
    }
    if (value1 === undefined) {
      return [...acc, { value: value2, type: added, name: key }];
    }
    return [...acc, {
      type: updated, deletedValue: value1, addedValue: value2, name: key,
    }];
  }, []);
};

export default buildAst;
