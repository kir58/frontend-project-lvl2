import {
  OLD, NEW, UNCHAGE, UPDATED, NESTED,
} from './constants';


const buildAst = (obj1, obj2) => {
  const allKeys = Object.keys({ ...obj1, ...obj2 });
  return allKeys.reduce((acc, key) => {
    const oldValue = obj1[key];
    const newValue = obj2[key];
    if (newValue instanceof Object && oldValue instanceof Object) {
      return [...acc, { children: buildAst(oldValue, newValue), name: key, type: NESTED }];
    }
    if (newValue === oldValue) {
      return [...acc, { value: newValue, type: UNCHAGE, name: key }];
    }
    if (newValue === undefined) {
      return [...acc, { value: oldValue, type: OLD, name: key }];
    }
    if (oldValue === undefined) {
      return [...acc, { value: newValue, type: NEW, name: key }];
    }
    return [...acc, {
      type: UPDATED, oldValue, newValue, name: key,
    }];
  }, []);
};

export default buildAst;
