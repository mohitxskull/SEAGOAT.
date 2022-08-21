const Uniq = (a: any[]) =>
  a.sort().filter((item, pos, ary) => !pos || item !== ary[pos - 1]);

export default Uniq;
