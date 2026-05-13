import { View as RNView } from "react-native";

type Props = {
  size: number;
};

export default function CloudShape({ size }: Props) {
  return (
    <RNView style={{ width: size, height: size * 0.6, position: "relative" }}>
      <RNView
        style={{
          position: "absolute",
          bottom: 0,
          left: size * 0.05,
          width: size * 0.9,
          height: size * 0.35,
          backgroundColor: "#FFFFFF",
          borderRadius: size * 0.18,
        }}
      />
      <RNView
        style={{
          position: "absolute",
          bottom: size * 0.25,
          left: size * 0.1,
          width: size * 0.3,
          height: size * 0.3,
          backgroundColor: "#FFFFFF",
          borderRadius: size * 0.15,
        }}
      />
      <RNView
        style={{
          position: "absolute",
          bottom: size * 0.28,
          left: size * 0.28,
          width: size * 0.4,
          height: size * 0.4,
          backgroundColor: "#FFFFFF",
          borderRadius: size * 0.2,
        }}
      />
      <RNView
        style={{
          position: "absolute",
          bottom: size * 0.2,
          left: size * 0.55,
          width: size * 0.28,
          height: size * 0.28,
          backgroundColor: "#FFFFFF",
          borderRadius: size * 0.14,
        }}
      />
    </RNView>
  );
}
