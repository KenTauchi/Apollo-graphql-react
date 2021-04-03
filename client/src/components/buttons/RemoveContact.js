import React from "react";
import { useMutation } from "@apollo/client";
import { filter, update } from "lodash";

import { DeleteOutlined } from "@ant-design/icons";
import { GET_CONTACTS, REMOVE_CONTACT } from "../../graphql/queries";

const RemoveContact = ({ id, firstName, lastName }) => {
  const [removeContact] = useMutation(REMOVE_CONTACT);

  const handleButtonClick = () => {
    let result = window.confirm(
      "Are you sure you want to delete thid contact?"
    );
    if (result) {
      removeContact({
        variables: {
          id,
        },
        optimisticResponse: {
          __typeName: "Mutation",
          removeContact: "Contact",
          id,
          firstName,
          lastName,
        },
        update: (proxy, { data: { removeContact } }) => {
          const { contacts } = proxy.readQuery({ query: GET_CONTACTS });
          proxy.writeQuery({
            query: GET_CONTACTS,
            data: {
              contacts: filter(contacts, (c) => {
                return c.id !== removeContact.id;
              }),
            },
          });
        },
      });
    }
  };
  return (
    <DeleteOutlined
      key="delete"
      style={{ color: "red" }}
      onClick={handleButtonClick}
    />
  );
};

export default RemoveContact;
