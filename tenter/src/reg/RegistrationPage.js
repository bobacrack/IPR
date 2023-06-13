import React, { useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Form, Input, DatePicker } from 'antd';
import "./RegistrationPage.css";
import { database } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64Data = reader.result.split(',')[1];
            resolve(base64Data);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}

async function addDocumentToCollection(documentData, document) {
    try {
        const collectionRef = collection(database, document);
        const docRef = await addDoc(collectionRef, documentData);
        console.log('Document added with ID:', docRef.id);
        return docRef.id
    } catch (error) {
        console.error('Error adding document:', error);
        return ""
    }
    return "";
}

export default function RegistrationPage() {
    const [form] = Form.useForm();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(null); // Change the initial state to null
    const [password, setPassword] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'firstname':
                setFirstname(value);
                break;
            case 'lastname':
                setLastname(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);


    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleRemove = (file) => {
        // Remove the file from the file list
        setFileList((prevFileList) => prevFileList.filter((f) => f.uid !== file.uid));
    };

    const handleUpload = (options) => {
        const { file, onSuccess, onError } = options;


        // Simulate file upload process
        setTimeout(() => {
            // Process the uploaded file here (e.g., send it to a server or save it locally)
            console.log('Uploaded file:', file);

            // Update the file list state
            setFileList((prevFileList) => [...prevFileList, file]);

            // Call the success callback to indicate successful upload
            onSuccess();

            // Or call the error callback to indicate upload failure
            // onError('Upload failed');
        }, 2000);
        fileList.forEach(element => {
            console.log(element);
        });
    };

    const handleChange = (info) => {
        let fileList = [...info.fileList];

        // Limit the number of uploaded files
        fileList = fileList.slice(0, 1);

        // Update the file list state
        setFileList(fileList);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const onFinish = (values) => {
        console.log(values);
    };

    function calculateAge(dateOfBirth) {
        const birthDate = new Date(dateOfBirth);
        const currentDate = new Date();

        let age = currentDate.getFullYear() - birthDate.getFullYear();

        const monthDifference = currentDate.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }


    async function signUp(e) {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                console.log(userCredential);
                var picture = {
                    url: "",
                    name: firstname + " " + lastname,
                    uuid: userCredential.user.uid
                }

                await fileToString(fileList[0].originFileObj)
                    .then((fileContent) => {
                        console.log('File content:', fileContent);
                        picture.url = fileContent;
                        // Perform further processing with the file content
                    })
                    .catch((error) => {
                        console.error('Error converting file to string:', error);
                    });

                var doc = await addDocumentToCollection(picture, "tents");

                const data = {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    age: calculateAge(age),
                    password: password,
                    picture: 'tents/' + doc,
                    uuid: userCredential.user.uid
                };

                // Call the function to add the document to the collection
                addDocumentToCollection(data, "user");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    /*
        async function save() {
    
            var picture = {
                url: "",
                name: 'sdsd'
            }
    
            await fileToString(fileList[0].originFileObj)
                .then((fileContent) => {
                    console.log('File content:', fileContent);
                    picture.url = fileContent;
                    // Perform further processing with the file content
                })
                .catch((error) => {
                    console.error('Error converting file to string:', error);
                });
    
            var doc = await addDocumentToCollection(picture, "tents");
    
            const data = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                age: calculateAge(age),
                password: password,
                picture: 'tents/' + doc,
            };
    
            // Call the function to add the document to the collection
            addDocumentToCollection(data, "user");
        }
    */
    function anyToBlob(value) {
        const blob = new Blob([value], { type: 'application/octet-stream' });
        return blob;
    }

    function fileToString(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const fileContent = reader.result; // Extract the base64 string
                resolve(fileContent);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    }

    return (
        <div className="registration-container">
            <Form className="registration-form" form={form} layout="vertical" onFinish={onFinish} validateTrigger="onBlur">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your name.",
                        }
                    ]}
                >
                    <Input type="text" name="firstname" value={firstname} onChange={handleInputChange} placeholder="Enter your name" />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your last name.",
                        }
                    ]}
                >
                    <Input type="text" name="lastname" value={lastname} onChange={handleInputChange} placeholder="Enter your last name" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your email address.",
                        },
                    ]}
                >
                    <Input type="text" name="email" value={email} onChange={handleInputChange} placeholder="Enter your email address" />
                </Form.Item>
                <Form.Item
                    label="Age"
                    name="age"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your age.",
                        },
                    ]}
                >
                    <DatePicker value={age} onChange={(date) => setAge(date)} style={{ width: '100%' }} placeholder="Select your age" />
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
                    <Input type="password" name="password" value={password} onChange={handleInputChange} placeholder="Enter your password" />
                </Form.Item>

                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    customRequest={handleUpload}
                    onRemove={handleRemove}
                    onChange={handleChange}
                    key="file-upload-component" // Add a unique key to the Upload component
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>

                <Form.Item>
                    <button onClick={signUp} type="submit">Register</button>
                </Form.Item>
            </Form>
        </div>
    );
}
