import AuthFooter from "@/components/authPage/authFooter/AuthFooter";
import AuthHeader from "@/components/authPage/authHeader/AuthHeader";
import FacebookLoginButton from "@/components/facebookLoginButton/FacebookLoginButton";
import CustomForm from "@/components/form/Form";
import GoogleLoginButton from "@/components/googleLoginButton/GoogleButton";

export const revalidate = 3600;

const page = () => {
    return (
        <div className=' flex flex-wrap justify-center items-center '>
            <div className='mt-20 flex flex-col bg-[rgb(237,241,243)] rounded-xl '>
                <AuthHeader
                    title='LOGIN'
                    imageSrc='https://images.unsplash.com/photo-1593425546383-260c8b86730b?auto=format&fit=crop&q=80&w=1185&h=385&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                />

                <CustomForm formType='login' />
                <AuthFooter type='LOGIN' />
                <div className='flex justify-center items-center mb-8 '>
                    <FacebookLoginButton styling='mx-2 hover:scale-105' />
                    <GoogleLoginButton styling='mx-2 hover:scale-105' />
                </div>
            </div>
        </div>
    );
};

export default page;
