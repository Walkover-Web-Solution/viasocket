export default function FeatureContentComp({ featureData }) {
    if (featureData && featureData.length > 0)
        return (
            <div className="container cont justify-center items-center pt-20">
                <div className="cont gap-8">
                    {featureData?.map((faq, index) => {
                        return (
                            <div className="cont gap-2">
                                <h2 className="h2">{faq?.question}</h2>
                                <p className="sub__h1">{faq?.answer}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
}
