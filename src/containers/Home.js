import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PageHeader, ListGroup } from "react-bootstrap";
import "./Home.css";
import { appUserMode, UserMode } from "../AppUserMode";

export default function Home(props) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {
            if (!props.isAuthenticated) {
                return;
            }
            setIsLoading(false);
        }
        onLoad();
    }, [props.isAuthenticated]);

    function landerTitle() {
        if (appUserMode === UserMode.STAFF) {
            return "Astorga Collections Staff Portal";
        } else {
            return "Astorga Collections Student Portal";
        }
    }

    function landerDescription() {
        if (appUserMode === UserMode.STAFF) {
            return "Astorga Collections Staff Portal";
        } else {
            return "Astorga Collections Student Portal";
        }
    }

    function renderLander() {
        return (
            <div className="lander">
                <h1>{landerTitle()}</h1>
                <p>{landerDescription()}</p>
                <div>
                    <Link to="/login" className="btn btn-info btn-lg">
                        Login
                    </Link>
                    <Link to="/signup" className="btn btn-success btn-lg">
                        Signup
                    </Link>
                </div>
            </div>
        );
    }

    function renderAPICallList() {
      return "";
    }

    function renderStudentHome() {
        return (
            <div className="notes">
                <PageHeader>Student Profile</PageHeader>
                <ListGroup>{!isLoading && renderAPICallList()}</ListGroup>
            </div>
        );
    }

    function renderStaffHome() {
        return (
            <div className="notes">
                <PageHeader>Staff Dashboard</PageHeader>
                <ListGroup>{!isLoading && renderAPICallList()}</ListGroup>
            </div>
        );
    }

    function renderHome() {
        if (appUserMode === UserMode.STAFF) {
            return renderStaffHome();
        } else {
            return renderStudentHome();
        }
    }

    return (
        <div className="Home">
            {props.isAuthenticated ? renderHome() : renderLander()}
        </div>
    );
}
