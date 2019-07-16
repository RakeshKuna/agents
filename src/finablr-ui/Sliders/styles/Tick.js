const style = {
  tickMark: ({ style: { tickMark = {} } = {}, isVertical }) => ({
    position: "absolute",
    marginTop: !isVertical ? 14 : -0.5,
    width: !isVertical ? 1 : 6,
    height: !isVertical ? 5 : 1,
    marginLeft: !isVertical ? 0 : 10,
    backgroundColor: "rgb(200,200,200)",
    ...tickMark, // Tick Mark style
  }),
  tickValue: ({ style: { tickValue = {} } = {}, isVertical }) => ({
    position: "absolute",
    marginTop: !isVertical ? 22 : -5,
    marginLeft: !isVertical ? 0 : 20,
    fontSize: 10,
    textAlign: "center",
    ...tickValue, // Tick Value style
  }),
};

export default style;
