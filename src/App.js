import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./component/ReadOnlyRow";
import EditableRow from "./component/EditableRow";





function App() {
  //This State Set Contacts
  const [contacts, setContacts] = useState(data);
  //This State Set FormDATAs
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });


  //State for Set Edit the Contact
  const [editContactId, setEditContactId] = useState(null);
  //State for Set The EditForm Data
  const [editFormData, setEditFormData] = useState({
    id: "",
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });
    console.log("EDIT FORM DATA",editFormData);
    console.log("EDIT CONTACT ID",editContactId);
    
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  //Handle The Form Change Event
  const handleAddFormChange = (event) => {
    console.log("INSIDE HANDLE-CHANGE ");
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    console.log("THIS IS FIELD NAME: ", fieldName);
    console.log("THIS IS FIELD VALUE: ", fieldValue);
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
    console.log("THIS IS NEWFORMDATA: ", newFormData);
  };

  //Handle the Edit action
  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      id: contact.id,
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };
    setEditFormData(formValues);
  };

  // Handle The Form-Submit Event
  const handleAddFormSubmit = (event) => {
    console.log("INSIDE HANDLE-ADD-FORM-SUBMIT")
    event.preventDefault();
    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };
    console.log("NEWCONTACT ID",newContact.id);
    const newContacts = [...contacts, newContact];
    setContacts(newContacts); 
    console.log('EVENT VALUE FULLNAME',event.target.fullName.value)
    
    event.target.fullName.value = "Paaji";
    addFormData.fullName = '';
    addFormData.address = '';
    addFormData.phoneNumber = NaN;
    addFormData.email = '';    
    // event.target.email.value = '';
    // event.target.phoneNumber.value = null;
    console.log('***EVENT VALUE FULLNAME',event.target.fullName.value)
    console.log('***EVENT VALUE FULLNAME',event.target.fullName)

  };

  console.log('EDIT FORM DATA',editFormData);


  //Handle The Edit-Form-Submit Event
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editFormData.id,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;
    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);
    
    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a Contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          required="required"
          value = {addFormData.fullName}
          onChange={handleAddFormChange}
          placeholder="Enter Your Name"
        />
        <input
          type="text"
          name="address"
          required="required"
          value = {addFormData.address}
          onChange={handleAddFormChange}
          placeholder="Enter Your address"
        />
        <input
          type="number"
          name="phoneNumber"
          required="required"
          value = {addFormData.phoneNumber}
          onChange={handleAddFormChange}
          placeholder="Enter Your Phone Number"
        />
        <input
          type="email"
          name="email"
          required="required"
          value = {addFormData.email}
          onChange={handleAddFormChange}
          placeholder="Enter Your Email"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
