import { PlayerProvider } from "./PlayerContext";
import PersistentBottomPlayer from "./PersistentBottomPlayer";

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlayerProvider>
      {children}
      <PersistentBottomPlayer />
    </PlayerProvider>
  );
}
