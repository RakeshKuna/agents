const panelRoot = ({ style: { panel: { root } = {} } = {} }) => ({
  ...root,
});
const paneldisabled = ({ style: { panel: { disabled } = {} } = {} }) => ({
  backgroundColor: "inherit",
  ...disabled,
});
const panelexpanded = ({ style: { panel: { expanded } = {} } = {} }) => ({
  margin: "1px 0",
  ...expanded,
});
const headingRoot = ({ style: { heading: { root } = {} } = {} }) => ({
  ...root,
});
const headingExpanded = ({ style: { heading: { expanded } = {} } = {} }) => ({
  ...expanded,
});
const headingFocused = ({ style: { heading: { focused } = {} } = {} }) => ({
  ...focused,
});
const headingDisabled = ({ style: { heading: { disabled } = {} } = {} }) => ({
  ...disabled,
});
const headingContent = ({ style: { heading: { content } = {} } = {} }) => ({
  ...content,
});
const headingExpandIcon = ({ style: { heading: { expandIcon } = {} } = {}, rtl }) => ({
  right: rtl ? "auto" : 8,
  left: !rtl ? "auto" : 8,
  ...expandIcon,
});
const bodyRoot = ({ style: { body } = {}, rtl }) => ({
  textAlign: rtl ? "right" : "",
  ...body,
});
const actionRoot = ({ style: { action: { root } = {} } = {} }) => ({
  ...root,
});
const actionAction = ({ style: { action: { action } = {} } = {} }) => ({
  ...action,
});

const styles = {
  rootStyle: ({ rootStyle, rtl }) => ({
    direction: rtl ? "rtl" : "ltr",
    ...rootStyle,
  }),
  disabled: {
    extend: paneldisabled,
  },
  expanded: {
    extend: panelexpanded,
  },
  root: {
    extend: panelRoot,
  },
  headingRoot: {
    extend: headingRoot,
  },
  headingExpanded: {
    extend: headingExpanded,
  },
  headingFocused: {
    extend: headingFocused,
  },
  headingDisabled: {
    extend: headingDisabled,
  },
  headingContent: {
    extend: headingContent,
  },
  headingExpandIcon: {
    extend: headingExpandIcon,
  },
  bodyRoot: {
    extend: bodyRoot,
  },
  actionRoot: {
    extend: actionRoot,
  },
  action: {
    extend: actionAction,
  },
};

export default styles;
