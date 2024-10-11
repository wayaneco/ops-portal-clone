import * as React from "react";

import { Html, Body, Img, Link } from "@react-email/components";

interface OTPEmailTemplate {
  email: string;
  code: string;
}

export const OTPEmailTemplate: React.FC<Readonly<OTPEmailTemplate>> = ({
  email,
  code,
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
              <table style={{ width: "100%" }}>
                <tr>
                  <td>
                    <Img
                      src={`https://mma.prnewswire.com/media/1582703/EE_Logo.jpg?p=twitter`}
                      alt="Everest Effect Logo"
                      style={{
                        width: "250px",
                        height: "auto",
                        margin: "0 auto",
                        marginBottom: "1rem",
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
                          textAlign: "left",
                        }}
                      >
                        One-Time Password Verification
                      </h1>
                      <p
                        style={{
                          fontSize: "25px",
                          textAlign: "left",
                          marginBottom: "2rem",
                        }}
                      >
                        Hello <strong>{email}</strong>,
                      </p>
                      <p
                        style={{
                          fontSize: "25px",
                          textAlign: "left",
                        }}
                      >
                        Thank you for using Everest Effect. Use this One-Time
                        Password (OTP) to complete the login request. This will
                        expire within <strong>1 minute</strong>.
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table style={{ width: "100%" }}>
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          <div
                            style={{
                              margin: "2rem 0",
                            }}
                          >
                            {code.split("").map((value: string, i: number) => (
                              <div
                                key={i}
                                style={{
                                  padding: "1rem",
                                  textAlign: "center",
                                  borderRadius: "5px",
                                  border: "1px solid #006f66",
                                  color: "#006f66",
                                  display: "inline-block",
                                  margin: "0 1rem",
                                  height: "1rem",
                                  width: "1rem",
                                }}
                              >
                                <strong>{value}</strong>
                              </div>
                            ))}
                          </div>
                          <div style={{ fontSize: "1.2rem", color: "gray" }}>
                            If you didn&apos;t request this email, you can just
                            ignore this email.
                          </div>
                        </td>
                      </tr>
                    </table>
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
