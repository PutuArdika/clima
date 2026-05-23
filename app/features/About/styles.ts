import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 12,
  },
  version: {
    color: "#90CAF9",
    fontSize: 14,
    fontWeight: "500",
    marginTop: -6,
  },
  icon: {
    width: 110,
    height: 110,
    marginVertical: 8,
    borderRadius: 24,
  },
  author: {
    color: "#E3F2FD",
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    color: "#90CAF9",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  socialRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 4,
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.07)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  socialLabel: {
    color: "#E3F2FD",
    fontSize: 13,
    fontWeight: "500",
  },
});

export default styles;
