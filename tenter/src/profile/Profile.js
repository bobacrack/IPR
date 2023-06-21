import React, { useState, useEffect } from "react";
import "./Profile.css";
import { database } from '../firebase';
import { collection, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { useParams } from "react-router-dom";
import { Button, Modal, Form, Input, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../card/fetchUsers';
import { onAuthStateChanged } from "firebase/auth";

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

    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    var [new_firstname, setFirstname] = useState('');
    var [new_lastname, setLastname] = useState('');
    var [new_agePref, setAgePref] = useState('');
    var [new_age, setAge] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();
    const [usersData, setusersData] = useState([]);
    const [userID, setUserID] = useState(null);


    useEffect(() => {
        fetchUsers((data, error) => {
            if (data) {
                // Save the fetched users in the usersData state
                console.log("DATA Result: ", data);
                setusersData(data);
                //console.log(usersData);
            } else {
                console.error(error);
            }
        });
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUserID(uid);
            } else {
            }
        });

        return () => {
            unsubscribe();
        }
    }, []);


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


    function findMatchingId(userID, usersData) {
        const matchingUser = usersData.find(user => user.uid === userID);
        return matchingUser ? matchingUser.id : null;
    }
    const matchingUserId = findMatchingId(userID, usersData);



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

        const deleteUserEndpoint = `http://localhost:6969/api/v1/user/${matchingUserId}`; // Ersetze die URL mit der URL deines DELETE-Endpunkts

        fetch(deleteUserEndpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Weitere Header falls erforderlich
            },
        })
            .then(response => {
                if (response.ok) {
                    console.log('Benutzer erfolgreich gelöscht.');
                    // Weitere Aktionen nach erfolgreicher Löschung
                } else {
                    console.error('Fehler beim Löschen des Benutzers:', response.status);
                    // Fehlerbehandlung bei fehlgeschlagener Löschung
                }
            })
            .catch(error => {
                console.error('Fehler beim Löschen des Benutzers:', error);
                // Fehlerbehandlung bei Netzwerkfehler oder anderen Ausnahmen
            });

        setOpenDelete(false);
    }


    async function handleUpdate() {

        try {

            const userData = {
                id: matchingUserId,
                uid: userID,
                firstname: new_firstname,
                lastname: new_lastname,
                agePref: new_agePref,
                picture: "",
                age: new_age
            };

            const userUpdateResponse = await fetch(`http://localhost:6969/api/v1/user/${matchingUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (userUpdateResponse.ok) {
                console.log('User updated successfully.');
            } else {
                console.error('Error updating user:', userUpdateResponse.status);
            }

            setOpenUpdate(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating user:', error);
        }
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
            case 'agePref':
                setAgePref(parseInt(value));
                break;
            case 'age':
                setAge(parseInt(value));
            default:
                break;
        }
    };


    const user = usersData.find(user => user.uid === uid);

    return (
        <div className="profile">
            <div className="profileContainer">
                {user && <h2>{user.firstname + " " + user.lastname}   { }</h2>}
                <div className="picture" >
                    {user && <img src={user.picture} alt="Profile" />}

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
                okText="yes"
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

                <Input type="text" name="firstname" value={new_firstname} onChange={handleInputChange} placeholder="Enter your name" />

                <Input type="text" name="lastname" value={new_lastname} onChange={handleInputChange} placeholder="Enter your last name" />

                <Input type="number" name="agePref" value={new_agePref} onChange={handleInputChange} placeholder="Enter your last name" />

                <Input type="number" name="age" value={new_age} onChange={handleInputChange} placeholder="Enter your last name" />

                <Upload alt="Upload"
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

    /*


          <Button onClick={showUpdate} icon={<EditOutlined />} type="primary" size="large">
                            Edit
                        </Button>

                         <Button onClick={showModal} icon={<DeleteOutlined />} type="primary" size="large">
                            Delete
                        </Button>

 <Modal
                title="Delete account?"
                open={openDelete}
                onOk={handleDelete}
                onCancel={hideModal}
                okText="yes"
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
                <Upload alt="Upload"
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
    */
}

