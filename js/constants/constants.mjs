import { loadLocalStorage } from "../events/auth/loadLocalStorage.mjs";
const yourProfile = loadLocalStorage(`UserName`);

const API_BASE = "https://v2.api.noroff.dev";
export const API_REGISTER = `${API_BASE}/auth/register`;
export const API_LOGIN = `${API_BASE}/auth/login`;
export const API_POST = `${API_BASE}/auction/listings`;
export const API_AUCTION = `${API_BASE}/auction/listings?&_active=true&_bids=true`;
export const API_AUCTION_BIDS = `${API_AUCTION}?&_bids=true&_seller=true&_author=true`;
export const API_PROFILE = `${API_BASE}/auction/profiles/${yourProfile}?&_wins=true&_listings=true`;
