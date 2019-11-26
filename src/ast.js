import _ from 'lodash';

import {
  deleted, added, unchanged, updated, nested,
} from './constants';


const buildAst = (obj1, obj2) => {
  const allKeys = _.union(_.keys(obj1), _.keys(obj2));
  return allKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (value1 instanceof Object && value2 instanceof Object) {
      return { children: buildAst(value1, value2), name: key, type: nested };
    }
    if (value1 === value2) {
      return { value: value1, type: unchanged, name: key };
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return { value: value1, type: deleted, name: key };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { value: value2, type: added, name: key };
    }
    return {
      type: updated, deletedValue: value1, addedValue: value2, name: key,
    };
  });
};

export default buildAst;
