"use client";

import { meet, MeetSidePanelClient } from "@googleworkspace/meet-addons";
import { useEffect, useState } from "react";

export default function Page() {
  const [sidePanelClient, setSidePanelClient] = useState<MeetSidePanelClient>();

  // Launches the main stage when the main button is clicked.
  async function startActivity() {
    if (!sidePanelClient) {
      throw new Error("Side Panel is not yet initialized!");
    }
    await sidePanelClient.startActivity({
      mainStageUrl: "/mainstage",
    });
  }

  /**
   * Prepares the Add-on Side Panel Client.
   */
  useEffect(() => {
    (async () => {
      const session = await meet.addon.createAddonSession({
        cloudProjectNumber:
          process.env.NEXT_PUBLIC_GOOGLE_CLOUD_PROJECT_NUMBER ?? "",
      });
      setSidePanelClient(await session.createSidePanelClient());
    })();
  }, []);

  return (
    <>
      <div>This is the Add-on Side Panel. Only you can see this.</div>
      <button onClick={startActivity}>Launch Activity in Main Stage.</button>
    </>
  );
}
