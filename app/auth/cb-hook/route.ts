import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

import { UserService } from "@/utils/supabase/services";
import getNodeSDK from "@/utils/corbado/nodeSdk";

import { middleware } from "./middleware";
import { handler } from "./handler";

enum CorbadoWebhookActions {
  authMethods = 'authMethods',
  passwordVerify = 'passwordVerify'
}

enum CorbadoUserStatus {
  notExists = 'not_exists',
  exists = 'exists'
}

async function getUserStatus(username: string) {
  const user = await UserService.findByEmail(username);
  const isCorbadoUser = user != null && user.user_metadata.isCorbadoUser;

  if (!user || isCorbadoUser) {
    return CorbadoUserStatus.notExists;
  } else {
    return CorbadoUserStatus.exists;
  }
}

async function verifyPassword(username: string, password: string) {
  try {
    const res = await UserService.verifyPassword(username, password);
    if (!res) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function handleCbHook(request: NextRequest) {

  const reqBody = await request.json()
  const corbadoAction = reqBody.action;

  // console.log(request);
  console.log(request.headers);
  console.log(reqBody);

  const corbado = getNodeSDK();
  try {

    switch (corbadoAction) {
      case CorbadoWebhookActions.authMethods: {
        const status = await getUserStatus(reqBody.data.username);
        console.log(`getUserStatus: ${reqBody.data.username}: ${status}`);
        return NextResponse.json({
          data: {
            status: status
          }
        }, { 
          status: 200
        });
        break;
      }

      case CorbadoWebhookActions.passwordVerify: {

        const isValid = await verifyPassword(
          reqBody.data.username,
          reqBody.data.password
        )

        console.log(`passwordVerify: ${reqBody.data.username}: ${isValid}`);
        return NextResponse.json({
          data: {
            success: isValid
          }
        }, { 
          status: 200
        });


        // request = corbado.webhooks.getPasswordVerifyRequest(req);

    //     // Now check if the given username and password is
    //     // valid. Implement verifyPassword() function below.
    //     const isValid = await verifyPassword(
    //       request.data.username,
    //       request.data.password
    //     );
    //     response = corbado.webhooks.getPasswordVerifyResponse(isValid);
    //     res.json(response);
    //     break;
      }
    }

    // Get the webhook action and act accordingly. Every CorbadoSDK
    // webhook has an action.;
    
    // switch (corbado.webhooks.getAction(req)) {
    //   // Handle the "authMethods" action which basically checks
    //   // if a user exists on your side/in your database.
    //   case corbado.webhooks.WEBHOOK_ACTION.AUTH_METHODS: {
    //     request = corbado.webhooks.getAuthMethodsRequest(req);
    //     // Now check if the given user/username exists in your
    //     // database and send status. Implement getUserStatus()
    //     // function below.
    //     const status = await getUserStatus(request.data.username);
    //     response = corbado.webhooks.getAuthMethodsResponse(status);
    //     res.json(response);
    //     break;
    //   }

    //   // Handle the "passwordVerify" action which basically checks
    //   // if the given username and password are valid.
    //   case corbado.webhooks.WEBHOOK_ACTION.PASSWORD_VERIFY: {
    //     request = corbado.webhooks.getPasswordVerifyRequest(req);

    //     // Now check if the given username and password is
    //     // valid. Implement verifyPassword() function below.
    //     const isValid = await verifyPassword(
    //       request.data.username,
    //       request.data.password
    //     );
    //     response = corbado.webhooks.getPasswordVerifyResponse(isValid);
    //     res.json(response);
    //     break;
    //   }
    //   default: {
    //     return res.status(400).send("Bad Request");
    //   }
    // }
  } catch (error) {
    // We expose the full error message here. Usually you would
    // not do this (security!) but in this case CorbadoSDK is the
    // only consumer of your webhook. The error message gets
    // logged at CorbadoSDK and helps you and us debugging your
    // webhook.
    console.log(error);

    // If something went wrong just return HTTP status
    // code 500. For successful requests CorbadoSDK always
    // expects HTTP status code 200. Everything else
    // will be treated as error.
    // return res.status(500).send(error.message);
  }

  return NextResponse.json({
    data: {
      status: CorbadoUserStatus.notExists
    }
  }, { 
    status: 200
  });

}

export const POST = handler(
  middleware,
  handleCbHook
)