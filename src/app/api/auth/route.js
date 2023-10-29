import {
    handleServerGoogleLogin,
    loginWithEmailAndPassword,
    registerUserWithEmailAndPassword,
    signOutUser,
} from "@/lib/authDetails";

export async function POST(request) {
    if (request.method === "POST") {
        const { formType, ...data } = await request.json();

        if (formType === "registration") {
            try {
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
                return new Response(JSON.stringify(responseData), {
                    headers: { "Content-Type": "application/json" },
                    status: 400,
                });
            }
        } else if (formType === "login") {
            try {
                const user = await loginWithEmailAndPassword(
                    data.email,
                    data.password
                );
                // Handle login success
                const responseData = { user };

                return new Response(JSON.stringify(responseData), {
                    headers: { "Content-Type": "application/json" },
                    status: 200,
                });
            } catch (error) {
                // Handle login error
                const responseData = { error: error.message };
                return new Response(JSON.stringify(responseData), {
                    headers: { "Content-Type": "application/json" },
                    status: 400,
                });
            }
        } else if (formType === "google-login") {
            try {
                const user = await handleServerGoogleLogin(data.token);
                const responseData = {
                    user: user,
                    message: "Google login success",
                };

                return new Response(JSON.stringify(responseData), {
                    headers: { "Content-Type": "application/json" },
                    status: 200,
                });
            } catch (error) {
                console.error("Google login error:", error);

                const errorMessage = "An error occurred during Google login.";
                console.error("Google login error message:", errorMessage); // Log error

                // Return an error response with a 500 status code.
                return new Response(JSON.stringify({ error: errorMessage }), {
                    headers: { "Content-Type": "application/json" },
                    status: 500,
                });
            }
        } else if (formType === "signout") {
            // Handle user sign-out
            try {
                // Call the sign-out function if available
                await signOutUser(); // You need to implement this function

                const responseData = { message: "Sign-out success" };

                return new Response(JSON.stringify(responseData), {
                    headers: { "Content-Type": "application/json" },
                    status: 200,
                });
            } catch (error) {
                // Handle sign-out error
                const responseData = { error: error.message };
                return new Response(JSON.stringify(responseData), {
                    headers: { "Content-Type": "application/json" },
                    status: 400,
                });
            }
        }
    }

    // If none of the conditions match, return a generic error response with a 400 Bad Request status code.
    const errorMessage = "Invalid request";
    return new Response(JSON.stringify({ error: errorMessage }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
    });
}
