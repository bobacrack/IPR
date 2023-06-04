import React from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { useState } from 'react';
import { Form, Input, DatePicker } from "antd";
import "./RegistrationPage.css";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function RegistrationPage() {
    const [form] = Form.useForm();
    const [nameError, setNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [ageError, setAgeError] = useState("");

    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const ageRegex = /^(0?[1-9]|[1-9][0-9])$/;

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
        {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-xxx',
            percent: 50,
            name: 'image.png',
            status: 'uploading',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-5',
            name: 'image.png',
            status: 'error',
        },
    ]);
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const validateName = (_, value) => {
        if (value && !nameRegex.test(value)) {
            setNameError("Please enter a valid name.");
        } else {
            setNameError("");
        }
    };

    const validateLastName = (_, value) => {
        if (value && !nameRegex.test(value)) {
            setLastNameError("Please enter a valid last name.");
        } else {
            setLastNameError("");
        }
    };

    const validateEmail = (_, value) => {
        if (value && !emailRegex.test(value)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError("");
        }
    };

    const validateAge = (_, value) => {
        if (value && !ageRegex.test(value)) {
            setAgeError("Please enter a valid age.");
        } else {
            setAgeError("");
        }
    };

    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <div className="registration-container">
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                validateTrigger="onBlur"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    validateFirst
                    rules={[
                        {
                            required: true,
                            message: "Please enter your name.",
                        },
                        {
                            validator: validateName,
                        },
                    ]}
                    validateStatus={nameError ? "error" : ""}
                    help={nameError}
                >
                    <Input placeholder="Enter your name" />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="lastName"
                    validateFirst
                    rules={[
                        {
                            required: true,
                            message: "Please enter your last name.",
                        },
                        {
                            validator: validateLastName,
                        },
                    ]}
                    validateStatus={lastNameError ? "error" : ""}
                    help={lastNameError}
                >
                    <Input placeholder="Enter your last name" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    validateFirst
                    rules={[
                        {
                            required: true,
                            message: "Please enter your email address.",
                        },
                        {
                            validator: validateEmail,
                        },
                    ]}
                    validateStatus={emailError ? "error" : ""}
                    help={emailError}
                >
                    <Input placeholder="Enter your email address" />
                </Form.Item>
                <Form.Item
                    label="Age"
                    name="age"
                    validateFirst
                    rules={[
                        {
                            required: true,
                            message: "Please enter your age.",
                        },
                        {
                            validator: validateAge,
                        },
                    ]}
                    validateStatus={ageError ? "error" : ""}
                    help={ageError}
                >
                    <DatePicker style={{ width: '100%' }} placeholder="Select your age" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    validateFirst
                    rules={[
                        {
                            required: true,
                            message: "Please enter your password.",
                        }
                    ]}
                >
                    <Input placeholder="Enter your last name" />
                </Form.Item>


                <>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img
                            alt="example"
                            style={{
                                width: '100%',
                            }}
                            src={previewImage}
                        />
                    </Modal>
                </>
                <Form.Item>
                    <button type="submit">Register</button>
                </Form.Item>
            </Form>
        </div>
    );
}
