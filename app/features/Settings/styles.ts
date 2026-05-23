import { StyleSheet } from "react-native";

const TEXT_COLOR = "#E3F2FD";
const SUB_COLOR = "#90CAF9";
const CARD_BG = "rgba(255,255,255,0.07)";
const ACCENT = "#4FC3F7";
const INACTIVE = "rgba(255,255,255,0.45)";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: SUB_COLOR,
    marginBottom: 4,
    marginLeft: 4,
  },
  row: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    gap: 10,
  },
  rowTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: TEXT_COLOR,
  },
  switchGroup: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  unitLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: INACTIVE,
    minWidth: 36,
    textAlign: "center",
    textAlignVertical: "center",
    flexShrink: 1,
    flexWrap: "wrap",
    alignSelf: "center",
  },
  unitLabelActive: {
    color: ACCENT,
    fontWeight: "700",
  },
});

export { ACCENT, TEXT_COLOR };
export default styles;
