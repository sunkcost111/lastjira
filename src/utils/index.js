const isFalsy = (value) => (value === 0 ? false : !value);
//在一个函数不能修改原对象
export const cleanObject = (object) => {
  const result = JSON.parse(JSON.stringify(object));
  Object.keys(result).forEach((key) => {
    const value = result[key];
    //当value为0时，会被误删除
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
