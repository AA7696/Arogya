
export default function Hero() {
    return (
        <>
            <section  className=" p-20">
                <div className="container flex flex-col items-center justify-start mt-16">
                    <div className=" flex">
                        <div className=" rounded-full inline-flex border-2 border-[#1FBCF9]/34 gap-2 px-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400">
                            <span>&#10038;</span>
                            <span className=" text-sm">Introducing Arogya</span>
                        </div>

                    </div>
                    <div className=" text-xl md:text-3xl text-center font-medium mt-7">
                        <h1>Your Personal <span className=" text-[#1FBCF9]">Healthcare</span> Assistant</h1>
                        <p className=" text-lg text-gray-500 font-medium mt-3">Instantly get right medication for your symptoms with AI {" "}
                            powered recommendations</p>
                    </div>
                    <div className=" flex items-start">
                    <button className=" text-white bg-transparent border-2 border-white rounded-full p-2.5  hover:text-white mt-3">Sign Up</button>
                </div>

                </div>
            </section>
        </>
    )
}
