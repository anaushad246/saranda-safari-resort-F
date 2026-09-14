const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

async function fetchApi(endpoint, options = {}) {
  const token = localStorage.getItem('ssr_admin_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const result = await response.json();

    if (!response.ok) {
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
