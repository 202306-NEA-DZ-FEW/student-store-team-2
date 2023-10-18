const Hiw = () => {
    return (
        <div className='text-center'>
            <h1 className='text-2xl md:text-4xl'>How It Works ?</h1>
            <div className='flex flex-col pt-12 items-center space-y-0 md:flex-row md:space-y-0 md:space-x-0'>
                <div className='bg-accent2 p-4 pt-12 sm:h-64 md:flex-1 '>
                    <p>
                        Welcome to our Mini store! Wondering how it all works?
                        It&apos;s simple. Explore our selection of items
                        available for both borrowing and buying. Just follow
                        these three easy steps: browse, choose, and enjoy.
                        Browse our collection of essentials, choose what you
                        need, and complete your order.
                    </p>
                </div>
                <div className='bg-accent p-4 pt-12 sm:h-64 md:flex-1 '>
                    <p>
                        {" "}
                        It&apos;s that easy! Whether you&apos;re a student
                        looking for books, electronics, furniture, gaming, or
                        everyday necessities, we&apos;ve got you covered. Start
                        exploring the convenience of our student store today.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Hiw;
