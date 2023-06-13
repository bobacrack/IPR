import React, { useState, useEffect } from "react";
import "./Profile.css";
import { database } from '../firebase';
import { collection, doc, getDoc, deleteDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { useParams } from "react-router-dom";
import { Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';




export default function Profile() {
    const navigate = useNavigate();

    const { uid } = useParams();
    const [tent, setTent] = useState([]);

    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

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

        setOpen(false);
    }

    return (
        <div className="profile">
            <div className="profileContainer">
                {tent && <h2>{tent.name}   { }</h2>}
                <div className="picture" style={{ backgroundImage: `url(${tent.url})` }}>
                    {tent && <img src={tent.url} alt="Profile" />}

                </div>
                <div className="formButton">
                    <div>
                        <Button icon={<EditOutlined />} type="primary" size="large">
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
                open={open}
                onOk={handleDelete}
                onCancel={hideModal}
                okText="delete"
                cancelText="cancel"
            >
                <p>Are you sure you want to delete your account?</p>
            </Modal>
        </div>



    );
}

