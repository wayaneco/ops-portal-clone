import * as React from "react";

import { Html, Body, Img, Link } from "@react-email/components";

interface LoginTemplateProps {
  email: string;
  confirmationLink: string;
}

export const LoginTemplate: React.FC<Readonly<LoginTemplateProps>> = ({
  email,
  confirmationLink,
}) => (
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
                        Hello{" "}
                        <strong
                          style={{
                            color: "#006f66",
                          }}
                        >
                          {email}
                        </strong>
                        ,
                      </h1>
                      <p
                        style={{
                          fontSize: "25px",
                          marginBottom: "2rem",
                        }}
                      >
                        You have requested to login to{" "}
                        <strong>Everest Effect</strong> using your email. If you
                        do not recognize the request please ignore this email.
                      </p>
                      <p
                        style={{
                          fontSize: "25px",
                        }}
                      >
                        This link will expired in <strong>60 minutes</strong>{" "}
                        and can be only used once. You can request again if the
                        link is expired.
                      </p>
                    </div>
                  </td>
                </tr>
                {/* <tr>
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
                </tr> */}
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
                        Sign in to your account
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
