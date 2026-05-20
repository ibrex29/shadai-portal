export const metadata = {
  title: "Settings",
};
import SettingsClient from "./settings-client";

export default function SettingsPage() {
  return (
    <main style={{ padding: "24px" }}>
      <SettingsClient />
    </main>
  );
}
