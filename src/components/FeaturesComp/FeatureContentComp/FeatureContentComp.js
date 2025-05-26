export default function FeatureContentComp({ featureData }) {
    if (featureData && featureData.length > 0)
        return (
            <div className="container border custom-border p-12 bg-white flex flex-col gap-6">
                {featureData?.map((faq, index) => {
                    return (
                        <ul className="flex flex-col gap-1" key={index} style={{listStyleType: 'square'}}>
                            <li className="font-semibold text-lg">{faq?.question}</li>
                            <li className="list-none">{faq?.answer}</li>
                        </ul>
                    );
                })}
            </div>
        );
}
