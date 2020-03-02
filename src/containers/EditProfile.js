import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config/configAWS";
import "./EditProfile.css";
import { API } from "aws-amplify";
import { s3Upload } from "../utils/awsLib";

export default function EditProfile(props) {
  const file = useRef(null);
  const [summary, setSummary] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return summary.length > 0 && name.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    setIsLoading(true);
    try {
      const attachment = file.current ? await s3Upload(file.current) : null;

      await editProfile({
        userName: name,
        userSummary: summary,
        userProfileImage: attachment
      });

      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function editProfile(userProfile) {
    return API.post("astrogacollections-backend", "/updateUserProfile", {
      body: userProfile
    });
  }

  return (
    <div className="EditProfile">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="name">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            value={name}
            placeholder="Name"
            type="text"
            onChange={e => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="summary">
          <ControlLabel>Summary</ControlLabel>
          <FormControl
            value={summary}
            placeholder="Summary"
            componentClass="textarea"
            onChange={e => setSummary(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="file">
          <ControlLabel>Profile Picture</ControlLabel>
          <FormControl onChange={handleFileChange} type="file" />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Save
        </LoaderButton>
      </form>
    </div>
  );
}