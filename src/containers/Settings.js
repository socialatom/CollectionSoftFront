import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import React from "react";
import "./Settings.css";

export default function Settings(props) {
    return (
        <div className="Settings">
            <LinkContainer to="/settings/email">
                <LoaderButton block bsSize="large">Change Email</LoaderButton>
            </LinkContainer>
            <LinkContainer to="/settings/password">
                <LoaderButton block bsSize="large">Change Password</LoaderButton>
            </LinkContainer>
        </div>
    );
}
