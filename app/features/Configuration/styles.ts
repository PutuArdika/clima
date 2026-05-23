import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0A1628",
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
    color: "#90CAF9",
    marginBottom: 4,
    marginLeft: 4,
  },
  row: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 16,
    paddingVertical: 14,
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
    color: "#E3F2FD",
  },
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  colorSwatch: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  dropdownText: {
    flex: 1,
    color: "#E3F2FD",
    fontSize: 14,
    fontWeight: "500",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  dropdownList: {
    backgroundColor: "#152A4A",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    width: "100%",
    maxHeight: 420,
    padding: 16,
  },
  dropdownTitle: {
    color: "#90CAF9",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.1,
    marginBottom: 12,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  dropdownItemActive: {
    backgroundColor: "rgba(79,195,247,0.12)",
  },
  dropdownItemText: {
    flex: 1,
    color: "rgba(255,255,255,0.65)",
    fontSize: 14,
  },
  dropdownItemTextActive: {
    color: "#E3F2FD",
    fontWeight: "600",
  },
  previewContainer: {
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    height: 140,
  },
  previewHeader: {
    height: 48,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  previewHeaderText: {
    color: "#E3F2FD",
    fontWeight: "700",
    fontSize: 15,
  },
  previewBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  previewBodyText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 13,
  },
});

export default styles;
