import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const ContactDetails = () => {
  const { contactId } = useParams();
  const [contactDetails, setContactDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch contact details using the contactId parameter from the URL
    const fetchContactDetails = async () => {
      try {
        const response = await fetch(
          `https://contact.mediusware.com/api/contacts/${contactId}/`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched contact details:", data);

        // Set the details of the selected contact
        setContactDetails(data);
      } catch (error) {
        console.error("Error fetching contact details:", error);
      }
    };

    fetchContactDetails();
  }, [contactId]);

  return (
    <Modal show={true} onHide={() => navigate("/")} centered>
      <Modal.Header closeButton>
        <Modal.Title>Contact Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {contactDetails && (
          <div>
            {/* Display detailed contact information here */}
            <p>Name: {contactDetails.name}</p>
            <p>Country: {contactDetails.country.name}</p>
            {/* Add more details as needed */}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactDetails;
