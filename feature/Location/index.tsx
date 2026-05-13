import AutoLocation from "@/components/AutoLocation";
import ManualLocation from "@/components/ManualLocation";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

export default function LocationScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();

  useEffect(() => {
    console.log("Location screen param - type:", type);
  }, [type]);

  if (type === "manual") {
    return <ManualLocation />;
  }

  return <AutoLocation />;
}
