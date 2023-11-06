import AuthFooter from "@/components/authPage/authFooter/AuthFooter";
import AuthHeader from "@/components/authPage/authHeader/AuthHeader";
import CustomForm from "@/components/form/Form";
import GoogleLoginButton from "@/components/googleLoginButton/GoogleButton";
const page = () => {
    return (
        <div className=' flex flex-wrap justify-center items-center'>
            <div className='mt-20 flex bg-[rgb(237,241,243)] flex-col'>
                <AuthHeader
                    title='Sign Up'
                    imageSrc='https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&q=80&w=1185&h=385&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                />

                {/*Buttons*/}

                <CustomForm formType='registration' />
                <AuthFooter type='Sign Up' />
                <div className='flex justify-center items-center  m-2 text-content font-lato'>
                    <GoogleLoginButton
                        googleText='Sign Up With Google'
                        styling='flex text-sm m-1 px-3 border border-accent2/80 shadow-md p-1 rounded-xl bg-white hover:scale-105'
                    />
                </div>
            </div>
        </div>
    );
};

export default page;
