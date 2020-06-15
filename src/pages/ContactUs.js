import React from "react";
import "./LegalDocuments.css";
import Footer from "./Footer";
import Header from "../components/Header";
import { Form, Input, InputNumber, Button } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",

  },
  
};
const ContactUs = () => {

    const onFinish = values => {
        console.log(values);
      };
      
  return (
    <div className="docsPage">
      <Header />
      <div className="docsContainer">
        <span className="docsHeading">Contact Us</span>
        <hr style={{ margin: "2rem 0" }} />
        <div className="aboutUsMainContainer">
          <div className="aboutUs">
            <Form
              {...layout}
              name="nest-messages"
              onSubmit={onFinish}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={["user", "name"]}
                label="Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "email"]}
                label="Email"
                rules={[
                  {
                    type: "email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              
              <Form.Item name={["user", "subject"]} label="Subject">
                <Input />
              </Form.Item>
              <Form.Item name={["user", "message"]} label="Message">
                <Input.TextArea />
              </Form.Item>
              <div className="submitButton">
              <Form.Item >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
              </div>
            </Form>
          </div>
          <div className="aboutUs">
            <span className="docsSubHeading" style={{marginTop:0}}>Contact Info</span>
            <div className="docsPara">

            Visitorsdeals.com
            <br />
            No 61C 2nd Floor Changkat Thambi Dollah
            <br />
            Off Jalan Pudu 55100 Kuala Lumpur .
            <br />
            <br />
            T 03 21417892
            <br />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
