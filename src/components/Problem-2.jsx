import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

// ... (import statements remain unchanged)
// ... (import statements remain unchanged)

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [onlyEven, setOnlyEven] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(
          `https://contact.mediusware.com/api/contacts/?format=json&page=${page}&search=${searchTerm}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched contacts:", data);
        setContacts((prevContacts) => [...prevContacts, ...data.results]);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, [page, searchTerm]);

  const openModalA = () => {
    setShowModalA(true);
    setShowModalB(false);
    setShowModalC(false);
  };

  const openModalB = () => {
    setShowModalA(false);
    setShowModalB(true);
    setShowModalC(false);
  };

  const openModalC = (contactId) => {
    setSelectedContactId(contactId);
    setShowModalA(false);
    setShowModalB(false);
    setShowModalC(true);
  };

  const closeModal = () => {
    setShowModalA(false);
    setShowModalB(false);
    setShowModalC(false);
    setSearchResults([]); // Clear search results when closing modal
  };

  const handleEvenCheckboxChange = (e) => {
    setOnlyEven(e.target.checked);
  };

  const handleSearchInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Update search results based on the input
    const results = onlyEven
      ? contacts.filter((contact) => contact.id % 2 === 0)
      : contacts.filter(
          (contact) =>
            contact.phone.toLowerCase().includes(searchTerm) ||
            contact.country.name.toLowerCase().includes(searchTerm)
        );

    setSearchResults(results);
  };

  // Define the contacts to be displayed in the modal
  const contactsToDisplay = searchTerm === "" ? contacts : searchResults;

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={openModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={openModalB}
          >
            US Contacts
          </button>
        </div>

        <Modal show={showModalA} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>All Contacts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              placeholder="Search contacts"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            {contactsToDisplay.map((contact) => (
              <div
                key={contact.id}
                onClick={() => openModalC(contact.id)}
                style={{ cursor: "pointer" }}
              >
                {contact.phone} - {contact.country.name}
              </div>
            ))}
          </Modal.Body>
          {/* ... */}
        </Modal>

        <Modal show={showModalB} onHide={closeModal} centered>
          {/* Similar structure as Modal A, but display only US contacts */}
          <Modal.Header closeButton>
            <Modal.Title>US Contacts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              placeholder="Search contacts"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            {contactsToDisplay
              .filter((contact) => contact.country === "US")
              .map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => openModalC(contact.id)}
                  style={{ cursor: "pointer" }}
                >
                  {contact.name} - {contact.country}
                </div>
              ))}
          </Modal.Body>
          {/* ... */}
        </Modal>

        <Modal show={showModalC} onHide={closeModal} centered>
          {/* Display detailed contact information */}
          <p>Contact Details for ID: {selectedContactId}</p>
          {/* Add more details here based on the selected contact */}
        </Modal>
      </div>
    </div>
  );
};

export default Problem2;
