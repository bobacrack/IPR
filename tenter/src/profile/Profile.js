import React, { useState, useEffect } from "react";
import "./Profile.css";
import { database } from '../firebase';
import { collection, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { useParams } from "react-router-dom";
import { Button, Modal, Form, Input, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });


export default function Profile() {
    const navigate = useNavigate();

    const { uid } = useParams();
    const [tent, setTent] = useState([]);

    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    var [firstname, setFirstname] = useState('');
    var [lastname, setLastname] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    const showModal = () => {
        setOpenDelete(true);
    };

    const hideModal = () => {
        setOpenDelete(false);
    };

    const showUpdate = () => {
        setOpenUpdate(true);
    };

    const hideUpdate = () => {
        setOpenUpdate(false);
    };

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(database, 'tents', String(uid));
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    const tentData = docSnapshot.data();
                    setTent(tentData);
                } else {
                    console.log(`No tent document found with uid: ${uid}`);
                }
            } catch (error) {
                console.error('Error fetching tent document:', error);
            }
        };

        fetchData();

    }, [uid]);



    async function deleteDocument(collectionRef, documentId) {
        try {
            await deleteDoc(doc(collectionRef, documentId));
            console.log("Document deleted successfully.");
        } catch (error) {
            console.error("Error deleting document:", error);
            throw error;
        }
    }
    const onFinish = (values) => {
        console.log(values);
    };

    async function updateDocument(collectionRef, documentId, updatedData) {
        try {
            await updateDoc(doc(collectionRef, documentId), updatedData);
            console.log("Document updated successfully.");
        } catch (error) {
            console.error("Error updating document:", error);
            throw error;
        }
    }

    function handleDelete() {
        const user = auth.currentUser;
        if (user) {
            user.delete()
                .then(() => {
                    console.log('User account deleted successfully.');
                })
                .catch((error) => {
                    console.error('Error deleting user account:', error);
                });
            navigate("/login");
        }

        const tentRef = collection(database, "tents");
        const userRef = collection(database, "user");

        deleteDocument(tentRef, user.uid)
            .then(() => {
                console.log('Tent deleted successfully.');
            })
            .catch((error) => {
                console.error('Error deleting tent:', error);
            });

        deleteDocument(userRef, user.uid)
            .then(() => {
                console.log('User deleted successfully.');
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            });

        setOpenDelete(false);
    }

    async function handleUpdate() {
        const user = auth.currentUser;
        var names = tent.name.split(' ');
        var picture = {
            name: (firstname !== "" ? firstname : names[0]) + " " + (lastname !== "" ? lastname : names[1])
        }
        if (fileList.length > 0) {
            await fileToString(fileList[0].originFileObj)
                .then((fileContent) => {
                    console.log('File content:', fileContent);
                    picture.url = fileContent;
                    // Perform further processing with the file content
                })
                .catch((error) => {
                    console.error('Error converting file to string:', error);
                });
        }
        var doc = await updateDocument(collection(database, 'tents'), user.uid, picture)

        // Call the function to add the document to the collection

        const data = {
            firstname: firstname != "" ? firstname : names[0],
            lastname: lastname,
        };
        updateDocument(collection(database, 'user'), user.uid, data);
        setOpenUpdate(false);
        window.location.reload()
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'firstname':
                setFirstname(value);
                break;
            case 'lastname':
                setLastname(value);
                break;
            default:
                break;
        }
    };

    return (
        <div className="profile">
            <div className="profileContainer">
                {tent && <h2>{tent.name}   { }</h2>}
                <div className="picture" style={{ backgroundImage: `url(${tent.url})` }}>
                    {tent && <img src={tent.url} alt="Profile" />}

                </div>
                <div className="formButton">
                    <div>
                        <Button onClick={showUpdate} icon={<EditOutlined />} type="primary" size="large">
                            Edit
                        </Button>
                    </div>
                    <div>
                        <Button onClick={showModal} icon={<DeleteOutlined />} type="primary" size="large">
                            Delete
                        </Button>
                    </div>

                </div>
            </div>
            <Modal
                title="Delete account?"
                open={openDelete}
                onOk={handleDelete}
                onCancel={hideModal}
                okText="delete"
                cancelText="cancel"
            >
                <p>Are you sure you want to delete your account?</p>
            </Modal>

            <Modal
                title="update account"
                open={openUpdate}
                onOk={handleUpdate}
                onCancel={hideUpdate}
                okText="save"
                cancelText="cancel"
            >

                <Input type="text" name="firstname" value={firstname} onChange={handleInputChange} placeholder="Enter your name" />

                <Input type="text" name="lastname" value={lastname} onChange={handleInputChange} placeholder="Enter your last name" />
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
            </Modal>
        </div>



    );
}

