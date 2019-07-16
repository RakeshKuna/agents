function css(...args) {
  const classes = [];
  args.forEach(arg => {
    const argType = typeof arg;
    if (argType === "string" || argType === "number") {
      classes.push(arg);
    } else if (argType === "array") {
      const arrayClasses = css(...arg);
      if (arrayClasses) {
        classes.push(arg);
      }
    } else if (argType === "object") {
      Object.entries(arg).forEach(([key, value]) => {
        if (value) {
          classes.push(key);
        }
      });
    }
  });
  return classes.join(" ");
}

const ucFirst = txt => `${txt.charAt(0).toUpperCase()}${txt.slice(1)}`;

const replaceText = (text, key, replaceKey) =>
  text.replace(new RegExp(`\\{${key}\\}`, "gi"), replaceKey);

const emptyFunction = () => {};

export { css, ucFirst, replaceText, emptyFunction };
