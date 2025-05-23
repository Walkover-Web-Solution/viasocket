export default function FeatureContentComp({ featureData }) {
    if (featureData && featureData.length > 0)
        return (
            <div className="container cont justify-center items-center p-12 border custom-border bg-white">
                <div className="cont gap-8">
                    {featureData?.map((faq, index) => {
                        return (
                            <div className="cont gap-1">
                                <h2 className="h3">{faq?.question}</h2>
                                <p className="h6">{faq?.answer}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
}
