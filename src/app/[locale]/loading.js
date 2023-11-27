function loading() {
    return (
        <div className='flex justify-center items-center w-screen h-screen z-20 bg-white'>
            <div className='relative inline-flex'>
                <div className='w-8 h-8 bg-accent rounded-full'></div>
                <div className='w-8 h-8 bg-accent rounded-full absolute top-0 left-0 animate-ping'></div>
                <div className='w-8 h-8 bg-accent rounded-full absolute top-0 left-0 animate-pulse'></div>
            </div>
        </div>
    );
}

export default loading;
