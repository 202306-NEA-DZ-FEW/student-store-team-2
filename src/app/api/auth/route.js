import {
    loginWithEmailAndPassword,
    registerUserWithEmailAndPassword,
} from "@/lib/authDetails";

export async function POST(request) {
    if (request.method === "POST") {
        const { formType, ...data } = await request.json(); // Read and consume the request body

        console.log(`Received a ${formType} request.`); // Log the form type

        if (formType === "registration") {
            try {
                console.log("Handling registration...");
                const user = await registerUserWithEmailAndPassword(
                    data.email,
                    data.password,
                    {
                        fullName: data.fullName,
                        email: data.email,
                        phoneNumber: data.phoneNumber,
                        // Add other user data fields here
                    }
                );
                // Handle registration success
                const responseData = { user };

                return new Response(JSON.stringify(responseData), {
                    headers: { "Content-Type": "application/json" },
                    status: 200,
                });
            } catch (error) {
                // Handle registration error
                const responseData = { error: error.message };
                console.error("Registration error:", error);
                return new Response(JSON.stringify(responseData), {
                    headers: { "Content-Type": "application/json" },
                    status: 400,
                });
            }
        } else if (formType === "login") {
            try {
                console.log("Handling login...");
                const user = await loginWithEmailAndPassword(
                    data.email,
                    data.password
                );
                // Handle login success
                const responseData = { user };
                console.log(user.uid);

                return new Response(JSON.stringify(responseData), {
                    headers: { "Content-Type": "application/json" },
                    status: 200,
                });
            } catch (error) {
                // Handle login error
                const responseData = { error: error.message };
                console.error("Login error:", error);
                return new Response(JSON.stringify(responseData), {
                    headers: { "Content-Type": "application/json" },
                    status: 400,
                });
            }
        }
    }

    // If none of the conditions match, return a generic error response with a 400 Bad Request status code.
    const errorMessage = "Invalid request";
    console.error(errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
    });
}
