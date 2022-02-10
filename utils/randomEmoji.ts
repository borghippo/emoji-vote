const MAX_ID = 16;

export const getRandomEmoji: (notThisOne?: number) => number = (notThisOne) => {
  const emojiID = Math.floor(Math.random() * MAX_ID) + 1;

  if (emojiID !== notThisOne) return emojiID;
  return getRandomEmoji(notThisOne);
};

export const getOptionsForVote = () => {
  const firstId = getRandomEmoji();
  const secondId = getRandomEmoji(firstId);

  return [firstId, secondId];
};
