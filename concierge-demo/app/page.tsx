import ChatWindow from "@/components/ChatWindow";
import { getActiveProperty } from "@/lib/knowledgeBase";

export default function Home() {
  const kb = getActiveProperty();

  return (
    <ChatWindow
      propertyName={kb.property.name}
      hostName={kb.host.name}
      hostPhone={kb.host.contactPhone}
      hostEmail={kb.host.contactEmail}
    />
  );
}
