import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { Form, Input, Button } from "antd";

import { UPDATE_CONTACT } from "../../graphql/queries";

const UpdateContact = (props) => {
  const [id] = useState(props.id);
  const [firstName] = useState(props.firstName);
  const [lastName] = useState(props.lastName);
  const [form] = Form.useForm();

  const [updateContact] = useMutation(UPDATE_CONTACT);

  const onFinish = (values) => {
    const { firstName, lastName } = values;
    updateContact({
      variables: {
        id,
        firstName,
        lastName,
      },
      optimisticResponse: {
        __typeName: "Mutation",
        updateContact: {
          __type: "Contact",
          id,
          firstName,
          lastName,
        },
      },
    });
    props.onButtonClick();
  };

  return (
    <Form
      form={form}
      name="update-contact-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        firstName: firstName,
        lastName: lastName,
      }}
      size="large"
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input
          onChange={(e) =>
            props.updateStateVariable("firstName", e.target.value)
          }
          placeholder="i.e. John"
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input
          onChange={(e) =>
            props.updateStateVariable("lastName", e.target.value)
          }
          placeholder="i.e. Smith"
        />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("firstName") &&
                !form.isFieldTouched("lastName")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Contact
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateContact;
