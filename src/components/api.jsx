// api.js
export const fetchContacts = async (page = 1) => {
  try {
    const response = await fetch(
      `https://contact.mediusware.com/api/contacts/?format=json&page=${page}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

export const fetchCountryContacts = async (country, page = 1) => {
  try {
    const response = await fetch(
      `https://contact.mediusware.com/api/country-contacts/${country}/?format=json&page=${page}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching contacts for ${country}:`, error);
    throw error;
  }
};
