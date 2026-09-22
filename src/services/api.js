const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const ADMIN_TOKEN_KEY = 'ssr_admin_token';
const ADMIN_USER_KEY = 'ssr_admin_user';

// A dead token used to be invisible: every write 401'd, each caller swallowed it, and the
// portal kept looking signed in. Dropping the session here lets the shell send the
// operator back to the login screen instead.
export function clearAdminSession() {
  try {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
  } catch {
    // localStorage can throw in a private window; a failed cleanup must not mask the
    // original error the caller is about to receive.
  }
}

async function fetchApi(endpoint, options = {}) {
  // `skipAuthRedirect` is for the login call itself, where a 401 means "wrong password"
  // rather than "your session died" and must not fire the session-expired signal.
  const { skipAuthRedirect = false, ...fetchOptions } = options;
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...fetchOptions.headers
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const result = await response.json();

    if (!response.ok) {
      if (response.status === 401 && !skipAuthRedirect) {
        clearAdminSession();
        window.dispatchEvent(
          new CustomEvent('ssr:unauthorized', { detail: { message: result.message } })
        );
      }
      throw new Error(result.message || 'API request failed');
    }

    return result;
  } catch (error) {
    console.warn(`[API Service Warning] ${endpoint}:`, error.message);
    throw error;
  }
}

// 1. Availability & Quote API
export const apiCheckAvailability = async (checkIn, checkOut, adults = 1) => {
  return await fetchApi(`/availability?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}`);
};

export const apiGetQuote = async (quoteParams) => {
  return await fetchApi('/availability/quote', {
    method: 'POST',
    body: JSON.stringify(quoteParams)
  });
};

// Property capacity derived at runtime from the units marked `active`.
// Returns { activeUnits, activeCottages, activeTents, cottageAdults, tentAdults, totalAdults }.
export const apiGetCapacity = async () => {
  return await fetchApi('/availability/capacity');
};

// 2. Bookings API
export const apiCreateBooking = async (bookingData) => {
  return await fetchApi('/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData)
  });
};

export const apiGetBookings = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v) params.append(k, v);
  });
  const query = params.toString() ? `?${params.toString()}` : '';
  return await fetchApi(`/bookings${query}`);
};

export const apiUpdateBookingStatus = async (id, updateData) => {
  return await fetchApi(`/bookings/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify(updateData)
  });
};

// 3. Enquiries API
export const apiSubmitEnquiry = async (enquiryData) => {
  return await fetchApi('/enquiries', {
    method: 'POST',
    body: JSON.stringify(enquiryData)
  });
};

export const apiGetEnquiries = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v) params.append(k, v);
  });
  const query = params.toString() ? `?${params.toString()}` : '';
  return await fetchApi(`/enquiries${query}`);
};

export const apiUpdateEnquiry = async (id, updateData) => {
  return await fetchApi(`/enquiries/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updateData)
  });
};

// 4. Units & Blocked Dates API
export const apiGetUnits = async () => {
  return await fetchApi('/units');
};

// Owner-only. `status` must be one of the Unit model's enum values:
// 'active' | 'maintenance' | 'renovation' | 'private_block'.
export const apiUpdateUnitStatus = async (unitId, status) => {
  return await fetchApi(`/units/${unitId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
};

// Owner-only. Full inventory CRUD — the whole inventory is owner-controlled and there
// is deliberately no staff-level access to it.
export const apiCreateUnit = async (unitData) => {
  return await fetchApi('/units', {
    method: 'POST',
    body: JSON.stringify(unitData)
  });
};

// Partial update. Sends only the fields present in `unitData`; pricing is NOT handled
// here — it lives behind /units/:id/pricing so there is a single writer for paise.
export const apiUpdateUnit = async (unitId, unitData) => {
  return await fetchApi(`/units/${unitId}`, {
    method: 'PATCH',
    body: JSON.stringify(unitData)
  });
};

// Owner-only. Refused server-side with a 409 if the unit has bookings or blocked dates.
export const apiDeleteUnit = async (unitId) => {
  return await fetchApi(`/units/${unitId}`, { method: 'DELETE' });
};

export const apiGetBlocks = async () => {
  return await fetchApi('/blocks');
};

export const apiCreateBlock = async (blockData) => {
  return await fetchApi('/blocks', {
    method: 'POST',
    body: JSON.stringify(blockData)
  });
};

export const apiDeleteBlock = async (id) => {
  return await fetchApi(`/blocks/${id}`, {
    method: 'DELETE'
  });
};

// 5. Auth API
export const apiLogin = async (email, password) => {
  return await fetchApi('/auth/login', {
    method: 'POST',
    skipAuthRedirect: true,
    body: JSON.stringify({ email, password })
  });
};

export const apiGetMe = async () => {
  return await fetchApi('/auth/me');
};

// 6. Pricing API
export const apiUpdateUnitPricing = async (unitId, pricingData) => {
  return await fetchApi(`/units/${unitId}/pricing`, {
    method: 'PATCH',
    body: JSON.stringify(pricingData)
  });
};

export const apiUpdatePricingByType = async (typeData) => {
  return await fetchApi('/units/pricing/by-type', {
    method: 'PATCH',
    body: JSON.stringify(typeData)
  });
};
