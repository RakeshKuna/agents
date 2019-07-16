const extendByKey = key => ({ style = {} }) => ({ ...(style[key] ? style[key] : {}) });

export default extendByKey;
