const styles = {
  root: ({ style: { root = {} } = {} }) => ({
    paddingLeft: 40,
    paddingRight: 40,
    minHeight: 78,
    ...root,
  }),
  title: {
    flex: "0 0 auto",
  },
  searchContainer: ({ style: { searchContainer = {} } = {} }) => ({
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    ...searchContainer,
  }),
};

export default styles;
