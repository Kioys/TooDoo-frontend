const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export { delay };

export const getModalConfig = (title, content) => {
  return {
    title,
    content,
  };
};
