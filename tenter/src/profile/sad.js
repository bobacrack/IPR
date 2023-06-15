import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profile from "./Profile";
import { useNavigate, useParams, MemoryRouter } from "react-router-dom";
import { collection, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn().mockReturnValue({ uid: "default-uid" }),
}));

jest.mock("../firebase", () => ({
    database: {},
}));

jest.mock("firebase/firestore", () => ({
    collection: jest.fn(),
    doc: jest.fn(),
    getDoc: jest.fn(),
    deleteDoc: jest.fn(),
    updateDoc: jest.fn(),
}));

describe("Profile component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders profile information correctly", async () => {
        const mockTentData = {
            name: "John Doe",
            url: "https://example.com/profile-image.jpg",
        };

        userID = useParams.mockReturnValueOnce({ uid: "user-uid" });
        tentData = getDoc.mockResolvedValueOnce({ exists: true, data: () => mockTentData });

        render(<MemoryRouter>
            <Profile uid={userID} fileList={[tentData]} />
        </MemoryRouter>
        );

        await waitFor(() =>
            expect(screen.getByText(/John Doe/i)).toBeInTheDocument()
        );
        expect(screen.getByAltText("Profile")).toHaveAttribute(
            "src",
            "https://example.com/profile-image.jpg"
        );
    });

    test("opens delete modal on delete button click", () => {
        render(
            <MemoryRouter>
                <Profile uid="user-uid" />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole("button", { name: "Delete" }));

        expect(screen.getByText("Delete account?")).toBeInTheDocument();
    });

    test("closes delete modal on cancel button click", () => {
        render(<MemoryRouter>
            <Profile uid="user-uid" />
        </MemoryRouter>);

        fireEvent.click(screen.getByRole("button", { name: "Delete" }));
        fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

        expect(screen.queryByText("Delete account?")).not.toBeInTheDocument();
    });
    /*
        test("deletes user account and tent on modal confirm", async () => {
            deleteDoc.mockResolvedValueOnce();
    
            render(<Profile />);
    
            fireEvent.click(screen.getByRole("button", { name: "Delete" }));
            fireEvent.click(screen.getByRole("button", { name: "Yes" }));
    
            expect(auth.currentUser.delete).toHaveBeenCalled();
            expect(deleteDoc).toHaveBeenCalledWith(
                doc(collection(), "tents"),
                "user-uid"
            );
            expect(deleteDoc).toHaveBeenCalledWith(
                doc(collection(), "user"),
                "user-uid"
            );
    
            expect(screen.queryByText("Delete account?")).not.toBeInTheDocument();
        });
    
        test("opens update modal on edit button click", () => {
            render(<Profile />);
    
            fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    
            expect(screen.getByText("Update account")).toBeInTheDocument();
        });
    
        test("closes update modal on cancel button click", () => {
            render(<Profile />);
    
            fireEvent.click(screen.getByRole("button", { name: "Edit" }));
            fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    
            expect(screen.queryByText("Update account")).not.toBeInTheDocument();
        });
    
        test("updates user and tent information on modal save", async () => {
            updateDoc.mockResolvedValueOnce();
            useParams.mockReturnValueOnce({ uid: "user-uid" });
    
            render(<Profile />);
    
            fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    
            fireEvent.change(screen.getByLabelText("Enter your name"), {
                target: { value: "John" },
            });
            fireEvent.change(screen.getByLabelText("Enter your last name"), {
                target: { value: "Doe" },
            });
    
            fireEvent.click(screen.getByRole("button", { name: "Save" }));
    
            expect(updateDoc).toHaveBeenCalledWith(
                doc(collection(), "tents"),
                "user-uid",
                { name: "John Doe" }
            );
    
            expect(updateDoc).toHaveBeenCalledWith(
                doc(collection(), "user"),
                "user-uid",
                { firstname: "John", lastname: "Doe" }
            );
    
            expect(screen.queryByText("Update account")).not.toBeInTheDocument();
        });*/
});