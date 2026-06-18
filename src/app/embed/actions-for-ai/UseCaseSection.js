import AnimatedFlowCard from "./AnimatedFlowCard";

export default function UseCaseSection() {
  return (
    <section id="use-case" className="container">
      <div className="grid md:grid-cols-[40%_40%] grid-cols-1 items-center justify-center gap-14 md:gap-20 items-start bg-white border p-6 md:p-10 lg:py-12 lg:px-20">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-1.5 text-accent text-base font-bold py-1 rounded-full mb-4 tracking-wider uppercase">
            See it in action
          </div>
          <h2 className="h2">
            Context in. Action out.
          </h2>
          <p className="text-[14.5px] leading-[1.75] mb-[18px] font-normal">
            Other platforms require you to define every step upfront. With Actions for AI ,{" "}
            <strong>your agent understands the context and chooses the right actions automatically</strong>
            <br /> No rigid workflows. No manual tool routing.
          </p>
          <p className="text-[14.5px] leading-[1.75] mb-[18px] font-normal">
            Here&apos;s a real example: a new lead submits a form. The agent analyzes the information,
            selects the required actions, and executes them across multiple apps in seconds
          </p>
          <a href="https://viasocket.com/signup?utm_source=/embed/actions-for-ai" className="btn btn-accent">
            Start building
          </a>
        </div>

        {/* Right Panel - Animated flow card */}
        <AnimatedFlowCard />
      </div>
    </section>
  );
}
