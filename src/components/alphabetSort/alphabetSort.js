import Link from 'next/link';

const AlphabeticalComponent = ({ alphabet, appDetails, step }) => {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div className=" flex flex-col gap-2 w-full ">
            {step === 0 && <h3 className="h3 font-semibold text-center">Browse Apps by Name</h3>}
            {step === 2 && <h3 className="h3 font-semibold text-center">Select an app to integrate with</h3>}

            <div className="flex flex-row flex-wrap justify-center gap-2">
                {/* <Link
                    key={9}
                    className="text-lg py-1 px-2 hover-bg-grey-100-text-black transition-all duration-150 "
                    href={`/find-apps/0-9`}
                    aria-label="alphabet"
                >
                    0-9
                </Link> */}
                {alphabets.map((letter) => (
                    <Link
                        className={`text-sm py-1 px-2 hover-bg-grey-100-text-black transition-all  duration-150 ${letter === alphabet ? 'font-bold' : ''}`}
                        key={letter}
                        href={
                            step === 2 || step === 3
                                ? `/find-apps/${alphabet}/${appDetails?.appslugname}/${letter.toLowerCase()}`
                                : `/find-apps/${letter.toLowerCase()}`
                        }
                        aria-label="alphabet"
                    >
                        {letter}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AlphabeticalComponent;
