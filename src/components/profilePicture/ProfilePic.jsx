function ProfilePic({ user }) {
    const color = getRandomColor();
    return (
        <div
            className='w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center'
            style={{ backgroundColor: color }}
        >
            <span className='text-white text-2xl'>
                {user ? user.name[0] : null}
            </span>
        </div>
    );
}
export default ProfilePic;

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
