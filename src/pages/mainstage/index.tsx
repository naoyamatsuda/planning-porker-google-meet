"use client";

import { useEffect, useRef, useState } from "react";
import {
  CoDoingClient,
  CoDoingState,
  meet,
} from "@googleworkspace/meet-addons/meet.addons";
import { CLOUD_PROJECT_NUMBER } from "@/constant";
import { fromBytes, toBytes } from "@/utils/byte";

type MyState = {
  someString: string;
  someNumber: number;
};

export default function Page() {
  const [count, setCount] = useState(0);
  const [myStateStr, setMyStateStr] = useState<string>("");

  const coDoingClientRef = useRef<CoDoingClient | null>(null);

  useEffect(() => {
    (async () => {
      const session = await meet.addon.createAddonSession({
        cloudProjectNumber: CLOUD_PROJECT_NUMBER,
      });
      await session.createMainStageClient();

      const coDoingClient = await session.createCoDoingClient({
        activityTitle: "ACTIVITY_TITLE",
        onCoDoingStateChanged(coDoingState: CoDoingState) {
          const newState = fromBytes<MyState>(coDoingState.bytes);
          setMyStateStr(newState.someString);
        },
      });
      coDoingClientRef.current = coDoingClient;
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // コンポーネントのアンマウント時にクリーンアップ
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold">Counter: {count}</h1>
        <h1 className="text-4xl font-bold">myStateStr: {myStateStr}</h1>
        <button
          onClick={() => {
            const temp = myStateStr + "a";

            if (coDoingClientRef.current) {
              coDoingClientRef.current.broadcastStateUpdate({
                bytes: toBytes({ someString: temp, someNumber: 0 }),
              });
            }
          }}
        >テスト</button>
      </div>
    </>
  );
}
