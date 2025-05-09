// src/lib/useGuestId.ts
'use client';

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

export function useGuestId() {
  const [guestId, setGuestId] = useState<string | null>(null);

  useEffect(() => {
    let id = Cookies.get("guest_id");
    if (!id) {
      id = uuidv4();
      Cookies.set("guest_id", id, { expires: 30 });
    }
    setGuestId(id);
  }, []);

  return guestId;
}
