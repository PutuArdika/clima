import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "react-native-paper";
import styles from "../features/Weather/styles";

type Props = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  value: string;
  label: string;
  cardBg: string;
  textColor: string;
  subColor: string;
};

export default function WeatherCard({
  icon,
  value,
  label,
  cardBg,
  textColor,
  subColor,
}: Props) {
  return (
    <View style={[styles.card, { backgroundColor: cardBg }]}>
      <MaterialCommunityIcons name={icon} size={28} color={subColor} />
      <Text style={[styles.cardValue, { color: textColor }]}>{value}</Text>
      <Text style={[styles.cardLabel, { color: subColor }]}>{label}</Text>
    </View>
  );
}
