import { useState, useEffect, useCallback, useRef } from "react";

const REPO = "GAodren/JobOffers";
const FILE_PATH = "public/swipes.json";
const API_BASE = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

async function fetchSwipes() {
  if (!TOKEN) return {};
  try {
    const res = await fetch(API_BASE, {
      headers: { Authorization: `token ${TOKEN}` },
    });
    if (res.status === 404) return {};
    if (!res.ok) throw new Error("Failed to fetch swipes");
    const data = await res.json();
    return JSON.parse(atob(data.content));
  } catch {
    return {};
  }
}

async function getSha() {
  if (!TOKEN) return null;
  try {
    const res = await fetch(API_BASE, {
      headers: { Authorization: `token ${TOKEN}` },
    });
    if (res.status === 404) return null;
    const data = await res.json();
    return data.sha;
  } catch {
    return null;
  }
}

async function pushSwipes(swipes) {
  if (!TOKEN) return;
  const content = btoa(unescape(encodeURIComponent(JSON.stringify(swipes, null, 2))));
  const sha = await getSha();
  const body = { message: "Update swipes", content };
  if (sha) body.sha = sha;

  await fetch(API_BASE, {
    method: "PUT",
    headers: {
      Authorization: `token ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function useSwipeHistory() {
  const [swipes, setSwipes] = useState({});
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef(null);

  useEffect(() => {
    fetchSwipes().then((data) => {
      setSwipes(data);
      setLoading(false);
    });
  }, []);

  const debouncedPush = useCallback((newSwipes) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      pushSwipes(newSwipes);
    }, 2000);
  }, []);

  const recordSwipe = useCallback(
    (jobId, action) => {
      setSwipes((prev) => {
        const updated = {
          ...prev,
          [jobId]: {
            action,
            timestamp: new Date().toISOString(),
            ...(action === "liked" ? { status: "to_apply" } : {}),
          },
        };
        debouncedPush(updated);
        return updated;
      });
    },
    [debouncedPush]
  );

  const updateStatus = useCallback(
    (jobId, status) => {
      setSwipes((prev) => {
        const updated = {
          ...prev,
          [jobId]: { ...prev[jobId], status },
        };
        debouncedPush(updated);
        return updated;
      });
    },
    [debouncedPush]
  );

  const dismissJob = useCallback(
    (jobId) => {
      setSwipes((prev) => {
        const updated = {
          ...prev,
          [jobId]: { ...prev[jobId], action: "dismissed" },
        };
        debouncedPush(updated);
        return updated;
      });
    },
    [debouncedPush]
  );

  const likedIds = Object.entries(swipes)
    .filter(([, v]) => v.action === "liked")
    .map(([id]) => id);

  const swipedIds = Object.keys(swipes);

  return {
    swipes,
    loading: loading,
    swipedIds,
    likedIds,
    recordSwipe,
    updateStatus,
    dismissJob,
  };
}
