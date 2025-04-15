export const accumulateYield = (tips) => {
  return tips?.reduce((acc, tip) => {
    if (tip.status === "won") {
      return acc + (tip.potentialReturn - tip.spent);
    } else if (tip.status === "failed") {
      return acc - tip.spent;
    }
    return acc;
  }, 0);
};

export const countTipsByStatus = (tips) => {
  return tips?.reduce(
    (acc, tip) => {
      if (tip.status === "won") {
        acc.won++;
      } else if (tip.status === "failed") {
        acc.failed++;
      } else if (tip.status === "pending") {
        acc.pending++;
      }
      return acc;
    },
    { won: 0, failed: 0, pending: 0 }
  );
};
