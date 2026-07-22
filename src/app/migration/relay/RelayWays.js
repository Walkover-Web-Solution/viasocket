import RelayRescueDeal from './RelayRescueDeal';

export default function RelayWays() {
    return (
        <div className="bg-white px-4 lg:px-12 py-12 lg:py-16 border-y">
            <div className="container flex flex-col gap-8">
                <h2 className="h2 text-center lg:text-left">Two ways to continue your automation journey</h2>
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center border">
                    <div className="py-6 px-6 lg:py-8 lg:px-12 flex flex-col gap-4 border-b lg:border-b-0 lg:border-r">
                        <h3 className="h3">Export from Relay</h3>
                        <p>
                            Settings Export in your Relay workspace. Takes 30 seconds. Do it today even if you
                            decide later: Relay deletes everything on Sep 14.
                        </p>
                    </div>
                    <div className="py-6 px-6 lg:py-8 lg:px-12 flex flex-col gap-4 border-b lg:border-b-0 lg:border-r">
                        <h3 className="h3">Export from Relay</h3>
                        <p>
                            Settings Export in your Relay workspace. Takes 30 seconds. Do it today even if you
                            decide later: Relay deletes everything on Sep 14.
                        </p>
                    </div>
                    <div className="py-6 px-6 lg:py-8 lg:px-12 flex flex-col gap-4">
                        <h3 className="h3">Export from Relay</h3>
                        <p>
                            Settings Export in your Relay workspace. Takes 30 seconds. Do it today even if you
                            decide later: Relay deletes everything on Sep 14.
                        </p>
                    </div>
                </div>
            </div>

            <RelayRescueDeal />
        </div>
    );
}
