import { useState } from "react";

export function useMongo() {
  const [app, setApp] = useState<Realm.App | undefined>(undefined);

  const initialize = async (appId: string) => {
    setApp(await Realm.App({ appId }));
  };
}
