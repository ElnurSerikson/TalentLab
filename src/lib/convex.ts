import { ConvexReactClient } from 'convex/react';

// Single shared client used by both the auth provider and fire-and-forget
// analytics writes. Null when VITE_CONVEX_URL is not configured.
const url = import.meta.env.VITE_CONVEX_URL as string | undefined;

export const convex = url ? new ConvexReactClient(url) : null;
