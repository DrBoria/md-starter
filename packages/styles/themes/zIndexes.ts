const zIndexes = {
  background: -10,
  animatedElements: -1,
  content: 0,
  overlay: 100,
  navigationElement: 1000,
  alert: 10000,
};

export type ZIndexName = keyof typeof zIndexes;

export default zIndexes;
