import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  skyBox: {
    width: "100%",
    height: 180,
    marginBottom: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#0D2B4E",
    borderRadius: 20,
    overflow: "hidden",
  },
  sunWrapper: {
    position: "absolute",
    alignSelf: "center",
    top: 40,
    backgroundColor: "transparent",
    zIndex: 0,
    elevation: 0,
  },
  cloud: {
    position: "absolute",
    backgroundColor: "transparent",
    zIndex: 1,
    elevation: 1,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitle: {
    color: "#666",
    textAlign: "center",
  },
  spinner: {
    marginVertical: 16,
  },
  icon: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    width: "100%",
  },
  coordsBox: {
    marginTop: 16,
    padding: 20,
    backgroundColor: "#152A4A",
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    gap: 8,
  },
  coordText: {
    fontWeight: "600",
    color: "#1565C0",
  },
});

export default styles;
