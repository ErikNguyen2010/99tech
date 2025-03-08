var sum_to_n_a = function (n) {
  // use for to loop n time and sum into variable sum
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

var sum_to_n_b = function (n) {
  // use Array.from to create an array with n length and element + 1 , then use reduce to sum array
  const arrayInteger = Array.from({ length: n }, (v, i) => i + 1);

  const result = arrayInteger.reduce((i, j) => i + j, 0);
  return result;
};

var sum_to_n_c = function (n) {
  // use existing formula to sum n integer
  return (n * (n + 1)) / 2;
};

sum_to_n_a(41);
sum_to_n_b(41);
sum_to_n_c(5);
