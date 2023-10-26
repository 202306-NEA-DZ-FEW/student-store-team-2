import { getCurrentUser } from "@/lib/authDetails";
import { getDocumentByIdFromFirestore } from "@/lib/firestore";
import Cookies from "js-cookie"; // Import the js-cookie library

export async function GET(request) {
    console.log("GET request received."); // Log the start of the function

    try {
        const authToken = request.headers.get("Authorization"); // Retrieve the authentication token from the request headers

        const user = await getCurrentUser(authToken); // Pass the authToken to getCurrentUser
        console.log("User retrieved:", user); // Log user information

        const username = user ? await getDocumentByIdFromFirestore(user) : null;
        console.log("Username retrieved:", username); // Log username information

        const responseData = { data: { user, username } };
        console.log("Response data:", responseData); // Log the response data

        return new Response(JSON.stringify(responseData), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200,
        });
    } catch (error) {
        console.error("Error:", error); // Log any errors that occur
        return new Response("Internal Server Error", { status: 500 });
    }
}
