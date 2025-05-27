import Link from 'next/link';

const AlphabeticalComponent = () => {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div className="border custom-border p-12 border-b-0 bg-white flex items-center flex-wrap xl:gap-8 gap-4 w-full ">
            <h4 className="h4 text-xl font-semibold ">Browse apps by name: </h4>

            <div className="flex flex-row flex-wrap items-end gap-4 justify-between flex-grow">
                {alphabets.map((letter) => (
                    <Link
                        key={letter}
                        href={`/find-apps/${letter.toLowerCase()}`}
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
