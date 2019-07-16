const optionCss = {
  option: props => {
    const { option, wordWrap, optionStyle, rtl } = props;
    return {
      color: option.disabled && "#bbb",
      pointerEvents: option.disabled && "none",
      fontSize: 18,
      whiteSpace: wordWrap ? "normal" : "nowrap",
      height: wordWrap ? "auto" : 24,
      direction: rtl && "rtl",
      ...optionStyle,
    };
  },
};

export default optionCss;
