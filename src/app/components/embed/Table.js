const Table = ({ data }) => {
    return (
        <div className="w-full h-full cont gap-12 p-2 sm:p-20 border custom-border bg-white">
            <div className="flex flex-col gap-0">
                <h2 className="h2">viaSocket Embed vs Custom Development:</h2>
                <h2 className="h2">A Quick Overview</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-200">
                    <thead className="p-4">
                        <tr>
                            <th className="p-4 text-left text-xl w-1/3">Feature</th>
                            <th className="p-4 text-left text-xl border-l w-1/3">viaSocket Embed</th>
                            <th className="p-4 text-left text-xl border-l w-1/3">Custom Automation Development</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => (
                            <tr key={index} className="border border-gray-200 hover:bg-gray-100">
                                <td className="p-4 text-lg border-l">{user.Feature}</td>
                                <td className="p-4 text-lg font-semibold border-l">{user.embed}</td>
                                <td className="p-4 text-lg border-l">{user.development}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
