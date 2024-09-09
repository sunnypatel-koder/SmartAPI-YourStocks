import { SmartAPI } from "smartapi-javascript";
import { NextResponse } from "next/server";
import { authenticator } from "otplib";
import axios from "axios";

const smartAPI = new SmartAPI({
  api_key: "KetPT1qL", // Replace with your actual API key
});

export async function POST(req) {
  try {
    // Parse the incoming JSON payload
    const { clientCode, pin } = await req.json();

    const totp = "DZ5OFGJPMAR4PJDFEM556YD2VI";

    // Validate input
    if (!clientCode || !pin) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const token = authenticator.generate(totp);

    // Generate session
    const sessionData = await smartAPI.generateSession(clientCode, pin, token);

    if (!sessionData || sessionData.status === false) {
      console.error("Failed to generate session:", sessionData);
      return NextResponse.json(
        { error: "Failed to generate session" },
        { status: 400 }
      );
    }

    console.log("Mic check mic check");

    // Fetch profile
    const profileData = await smartAPI.getProfile();

    // const holdingsData = await smartAPI.getAllHolding();

    // Fetch all holdings
    const { data: holdingsData } = await axios({
      method: "get",
      url: "https://apiconnect.angelone.in/rest/secure/angelbroking/portfolio/v1/getAllHolding",
      headers: {
        Authorization: `Bearer ${sessionData.data.jwtToken}`, // Use JWT token for authentication
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-UserType": "USER",
        "X-SourceID": "WEB",
        "X-ClientLocalIP": "CLIENT_LOCAL_IP",
        "X-ClientPublicIP": "CLIENT_PUBLIC_IP",
        "X-MACAddress": "MAC_ADDRESS",
        "X-PrivateKey": "KetPT1qL",
      },
    });

    // Fetch all fund and margin RMS
    const { data: fundInfo } = await axios({
      method: "get",
      url: "https://apiconnect.angelone.in/rest/secure/angelbroking/user/v1/getRMS",
      headers: {
        Authorization: `Bearer ${sessionData.data.jwtToken}`, // Use JWT token for authentication
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-UserType": "USER",
        "X-SourceID": "WEB",
        "X-ClientLocalIP": "CLIENT_LOCAL_IP",
        "X-ClientPublicIP": "CLIENT_PUBLIC_IP",
        "X-MACAddress": "MAC_ADDRESS",
        "X-PrivateKey": "KetPT1qL",
      },
    });

    return NextResponse.json(
      {
        profile: profileData,
        holdings: holdingsData,
        fundInfo: fundInfo,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// import { SmartAPI } from "smartapi-javascript";
// import { NextResponse } from "next/server";
// import { authenticator } from "otplib";

// const smartAPI = new SmartAPI({
//   api_key: "KetPT1qL", // Replace with your actual API key
// });

// // Define your headers
// const headers = {
//   "Content-Type": "application/json",
//   "X-ClientLocalIP": "Your_Local_IP", // Replace with actual local IP
//   "X-ClientPublicIP": "Your_Public_IP", // Replace with actual public IP
//   "X-MACAddress": "Your_MAC_Address", // Replace with actual MAC Address
//   "Accept": "application/json",
//   "X-PrivateKey": "Your_Private_Key", // Replace with your actual private key
//   "X-UserType": "USER",
//   "X-SourceID": "WEB",
//   "Authorization": "Bearer Your_JWT_Token" // Replace with actual JWT token
// };

// export async function POST(req) {
//   try {
//     // Parse the incoming JSON payload
//     const { clientCode, pin } = await req.json();

//     const totp = "DZ5OFGJPMAR4PJDFEM556YD2VI";

//     // Validate input
//     if (!clientCode || !pin) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const token = authenticator.generate(totp);

//     // Generate session
//     const sessionData = await smartAPI.generateSession(clientCode, pin, token, { headers });

//     if (!sessionData || sessionData.status === false) {
//       console.error("Failed to generate session:", sessionData);
//       return NextResponse.json(
//         { error: "Failed to generate session" },
//         { status: 400 }
//       );
//     }

//     // Fetch profile
//     const profileData = await smartAPI.getProfile({ headers });

//     return NextResponse.json(profileData, { status: 200 });
//   } catch (error) {
//     console.error("Unexpected error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
