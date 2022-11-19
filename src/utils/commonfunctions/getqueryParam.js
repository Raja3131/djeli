const getqueryParam = data => {
  let datasize = Object.keys(data).length;
  let initial = '?';

  Object.keys(data).map(function (key, index) {
    initial = initial.concat(`${key}=${data[key]}`);
    index != datasize - 1 && (initial = initial.concat('&'));
  });
  console.log(initial, 'MyqueryString');
  return initial;
};

export default getqueryParam;
