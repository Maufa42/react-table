import React from "react";

const EditableRow = ({editFormData,handleEditFormChange,handleCancelClick}) => {
  console.log("EDITABLE ROW IS TRIGGERED ");
  // console.log("CONTACT-ID",editFormData.id)
  return (
    <tr>
      <td>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter Your Name..."
          value={editFormData.fullName}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="address"
          required="required"
          placeholder="Enter Your Address..."
          value={editFormData.address}
          onChange={handleEditFormChange}

        />
      </td>
      <td>
        <input
          type="number"
          name="phoneNumber"
          required="required"
          placeholder="Enter Your phone Number..."
          value={editFormData.phoneNumber}
          onChange={handleEditFormChange}

        />
      </td>
      <td>
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter Your Email..."
          value={editFormData.email}
          onChange={handleEditFormChange}

        />
      </td>
      <td>
        <button type="Submit">Save</button>
        <button type="Submit" onClick={handleCancelClick}>Cancel</button>

      </td>
    </tr>
  );
};

export default EditableRow;
