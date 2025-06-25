import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import { Activity } from "lucide-react";

function MultiStepForm() {
    const [step, setStep] = useState(1);

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);


    return (
        <div className=" w-full  rounded-lg  ">
            <div className=" flex flex-row justify-center mt-9  items-center gap-1.5">
                <Activity size={54} color='#1FBCF9' className=' font-bold' />
                <h3 className=" text-3xl md:text-4xl font-semibold text-white">Arogya</h3>
            </div>

            <form
                className=" max-w-5xl mx-auto p-8 space-y-6  rounded-lg shadow-md ">

                {/* Step Content */}
                {step === 1 && (
                    <Step1 />
                )}

                {step === 2 && (
                    <Step2 />
                )}

                {step === 3 && (
                    <Step3 />
                )}

                {step === 4 && (
                    <Step4 />
                )}

                {step === 5 && (
                    <Step5 />
                )}
                {/* Buttons */}
                <div className=" flex ">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={handleBack}
                            className="px-4 py-2 bg-[#1FBCF9] rounded "
                        >
                            Back
                        </button>
                    )}
                    {step < 4 && (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="ml-auto px-4 py-2 bg-[#1FBCF9] text-white rounded "
                        >
                            Next
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default MultiStepForm;
