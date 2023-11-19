function ProfilePic({ user }) {
    // const color = getRandomColor();

    return (
        <div
            className='w-16 h-16 bg-sky-200 rounded-full flex items-center justify-center drop-shadow'
            style={{
                background: user ? `url(${user.avatar_url})` : "lavender",
                backgroundSize: "cover",
            }}
        >
            {user && !user.avatar_url && user.full_name ? (
                <span className='text-white text-2xl'>{user.full_name[0]}</span>
            ) : null}
        </div>
    );
}
export default ProfilePic;

// function getRandomColor() {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }
