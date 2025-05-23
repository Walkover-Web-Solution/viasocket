import Link from 'next/link';

const AlphabeticalComponent = () => {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div className="border custom-border p-12 border-b-0 bg-white flex  gap-4 w-full ">
            <h3 className="h3 font-semibold ">Browse apps by name: </h3>

            <div className="flex flex-row flex-wrap items-end gap-4">
                {alphabets.map((letter) => (
                    <Link
                        className={`h3`}
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
