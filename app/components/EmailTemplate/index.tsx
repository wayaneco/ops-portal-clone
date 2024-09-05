import * as React from "react";

import { Html, Body, Img, Link } from "@react-email/components";

interface EmailTemplateProps {
  fullName: string;
  client: string;
  role: string;
  confirmationLink: string;
  password: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  fullName,
  client,
  role,
  confirmationLink,
  password,
}) => (
  <Html>
    <Body>
      <div
        style={{
          margin: "50px auto",
          width: "600px",
        }}
      >
        <div
          style={{
            padding: "2rem 0",
          }}
        >
          <Img
            src={`https://mma.prnewswire.com/media/1582703/EE_Logo.jpg?p=twitter`}
            alt="Everest Effect Logo"
            style={{
              width: "250px",
              height: "auto",
            }}
          />
          <h1
            style={{
              fontSize: "30px",
            }}
          >
            Welcome, {fullName}
          </h1>
          <p
            style={{
              fontSize: "25px",
            }}
          >
            You have been invited to receive credentials for the{" "}
            <strong>{client}</strong> as <strong>{role}</strong>.
          </p>
          <p style={{ fontSize: "20px", marginTop: "1rem" }}>
            Your default password is: <strong>{password}</strong>
          </p>
          <div style={{ marginTop: "3rem" }}>
            <Link
              href={confirmationLink}
              style={{
                border: "none",
                padding: "0.8rem 1.5rem",
                borderRadius: "10px",
                fontSize: "18px",
                background: "#006F66",
                color: "white",
                cursor: "pointer",
              }}
            >
              Accept Invitation
            </Link>
          </div>
        </div>
      </div>
    </Body>
  </Html>
);
