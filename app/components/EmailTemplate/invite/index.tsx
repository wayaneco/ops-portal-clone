import * as React from "react";

import { Html, Body, Img, Link } from "@react-email/components";

interface InviteEmailTemplateProps {
  email: string;
  client: string;
  confirmationLink: string;
  fullName: string;
  password: string;
  role: string;
}

export const InviteEmailTemplate: React.FC<
  Readonly<InviteEmailTemplateProps>
> = ({ email, client, confirmationLink, fullName, password, role }) => (
  <Html>
    <Body>
      <table
        style={{
          margin: "50px auto",
          width: "600px",
        }}
      >
        <tbody>
          <tr>
            <td>
              <table>
                <tr>
                  <td>
                    <Img
                      src={`https://mma.prnewswire.com/media/1582703/EE_Logo.jpg?p=twitter`}
                      alt="Everest Effect Logo"
                      style={{
                        width: "250px",
                        height: "auto",
                      }}
                    />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table>
                <tr>
                  <td>
                    <div>
                      <h1
                        style={{
                          fontSize: "35px",
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
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table>
                      <tr>
                        <td>
                          <div
                            style={{
                              marginTop: "1rem",
                            }}
                          >
                            <p
                              style={{ fontSize: "20px", marginBottom: "0px" }}
                            >
                              <span>
                                Email: <strong>{email}</strong>
                              </span>
                            </p>
                            <p
                              style={{ fontSize: "20px", marginTop: "0.5rem" }}
                            >
                              <span>
                                Password: <strong>{password}</strong>
                              </span>
                            </p>
                          </div>
                          <div
                            style={{ fontSize: "20px", marginTop: "1.5rem" }}
                          >
                            <strong>Note:</strong> Do not share your credentials
                            to anyone.
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table>
                <tr>
                  <td>
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
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </Body>
  </Html>
);
