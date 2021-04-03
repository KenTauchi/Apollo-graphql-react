import React, { useState, useEffect } from "react";

import { Form, Input, Button } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";
import { ADD_CONTACT, GET_CONTACTS } from "../../graphql/queries";

const getStyles = () => ({
  title: {
    fontSize: 50,
    padding: "15px",
    marginBottom: "50px",
  },
});

const AddContact = () => {
  const [id] = useState(uuidv4());
  const [addContact] = useMutation(ADD_CONTACT);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    addContact({
      variables: {
        id,
        firstName,
        lastName,
      },
      optimisticResponse: {
        __typename: "Mutation",
        addContact: {
          __typename: "Contact",
          id,
          firstName,
          lastName,
        },
      },
      update: (proxy, { data: { addContact } }) => {
        const data = proxy.readQuery({ query: GET_CONTACTS });
        proxy.writeQuery({
          query: GET_CONTACTS,
          data: {
            ...data,
            contacts: [...data.contacts, addContact],
          },
        });
      },
    });
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      name="add-contact-form"
      layout="inline"
      size="large"
      style={{ marginBottom: "40px" }}
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input placeholder="i.e. John" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input placeholder="i.e. Smith" />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldTouched("firstName") ||
              !form.isFieldTouched("lastName") ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Contact
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddContact;
