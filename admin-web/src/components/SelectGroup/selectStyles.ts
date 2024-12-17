export const selectStyles = {
  option: (styles, { isFocused }) => ({
    ...styles,
    color: "white",
    backgroundColor: isFocused ? "gray" : "#333",
  }),
  control: (styles) => ({
    ...styles,
    backgroundColor: "#333",
    borderColor: "#444",
    minWidth: "300px",
    width: "100%",
  }),
  input: (styles) => ({
    ...styles,
    color: "#ccc",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#ccc",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "#aaa",
  }),
};
