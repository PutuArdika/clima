import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },
  scrollContent: {
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  city: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },
  country: {
    fontSize: 16,
    marginTop: 4,
    marginBottom: 16,
    textAlign: "center",
  },
  tempRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  conditionIcon: {
    width: 64,
    height: 64,
  },
  temp: {
    fontSize: 72,
    fontWeight: "200",
    letterSpacing: -2,
  },
  condition: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center",
  },
  feelsLike: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 32,
  },
  cardRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
    gap: 6,
  },
  cardValue: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  cardLabel: {
    fontSize: 11,
    textAlign: "center",
  },
  updated: {
    marginTop: 32,
    fontSize: 11,
    textAlign: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  errorText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 8,
  },
  retryBtn: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  aqiBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
  },
  aqiWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 28,
    gap: 0,
  },
  aqiTable: {
    width: "100%",
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingHorizontal: 4,
    marginTop: 16,
  },
  aqiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  aqiRowLabel: {
    fontSize: 13,
  },
  aqiRowValue: {
    fontSize: 13,
    fontWeight: "600",
  },
  aqiText: {
    fontSize: 13,
  },
  aqiUnit: {
    fontSize: 11,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: 12,
  },
  poweredRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 24,
    marginBottom: 8,
  },
  poweredText: {
    fontSize: 11,
  },
  poweredLogo: {
    width: 200,
    height: 48,
  },
});

export default styles;
