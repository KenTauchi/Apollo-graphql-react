import React, { useState } from "react";

import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import UpdateContact from "../forms/UpdateContact";
import RemoveContact from "../buttons/RemoveContact";

const getStyles = () => ({
  card: {
    width: "500px",
  },
});

const Contact = (props) => {
  const [id] = useState(props.id);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [editMode, setEditMode] = useState(false);

  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {editMode ? (
        <UpdateContact
          onButtonClick={handleButtonClick}
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          key={props.id}
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveContact id={id} firstName={firstName} lastName={lastName} />,
          ]}
        >
          {`${firstName} ${lastName}`}
        </Card>
      )}
    </div>
  );
};

export default Contact;
