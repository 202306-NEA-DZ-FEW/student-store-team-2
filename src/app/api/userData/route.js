import { getCurrentUser } from "@/lib/authDetails";
import { getDocumentByIdFromFirestore } from "@/lib/firestore";

export async function GET(request) {
    try {
        const authToken = request.headers.get("Authorization"); // Retrieve the authentication token from the request headers

        const user = await getCurrentUser(authToken); // Pass the authToken to getCurrentUser
        const username = user ? await getDocumentByIdFromFirestore(user) : null;

        const responseData = { data: { user, username, authToken } };

        return new Response(JSON.stringify(responseData), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200,
        });
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
