/**
 * Lightweight LocalStorage Cache for Temporary Booking Holds
 * Safeguard: Mobile number is never stored in plain text.
 * LocalStorage serves only as a recovery cache; backend is always source of truth.
 */

const HOLD_STORAGE_KEY = 'ssr_active_hold_v1';

// Obfuscate phone so it is never readable as plain text in browser storage/devtools
const obfuscate = (str) => {
  if (!str) return '';
  try {
    return btoa(encodeURIComponent(str).split('').reverse().join(''));
  } catch {
    return '';
  }
};

const deobfuscate = (str) => {
  if (!str) return '';
  try {
    return decodeURIComponent(atob(str).split('').reverse().join(''));
  } catch {
    return '';
  }
};

/**
 * Save active hold pointer
 */
export function saveActiveHold({ bookingReference, expiresAt, phone, mobile }) {
  if (!bookingReference) return;
  try {
    const rawPhone = (phone || mobile || '').replace(/\D/g, '').slice(-10);
    const payload = {
      reference: bookingReference,
      expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
      _t: obfuscate(rawPhone)
    };
    localStorage.setItem(HOLD_STORAGE_KEY, JSON.stringify(payload));
    window.dispatchEvent(new CustomEvent('ssr:hold_updated'));
  } catch (err) {
    console.warn('[HoldCache] Failed to save active hold to localStorage:', err);
  }
}

/**
 * Read active hold
 * Returns null if expired or missing
 */
export function getActiveHold() {
  try {
    const raw = localStorage.getItem(HOLD_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.reference) {
      clearActiveHold();
      return null;
    }

    // Quick client expiry check
    if (parsed.expiresAt && new Date(parsed.expiresAt) <= new Date()) {
      clearActiveHold();
      return null;
    }

    return {
      reference: parsed.reference,
      expiresAt: parsed.expiresAt,
      mobile: deobfuscate(parsed._t)
    };
  } catch {
    clearActiveHold();
    return null;
  }
}

/**
 * Clear active hold
 */
export function clearActiveHold() {
  try {
    localStorage.removeItem(HOLD_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('ssr:hold_updated'));
  } catch {
    // ignore
  }
}
