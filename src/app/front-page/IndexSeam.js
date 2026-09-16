/**
 * The blend between two adjacent sections. A section's own background stays a
 * flat colour — this strip is the one thing on the page allowed to be a
 * gradient, and only because it reads the two sections' own colours rather
 * than inventing one: `from` and `to` are the same values those sections
 * paint themselves in, so the seam fades between what is actually on either
 * side of it instead of stepping.
 */
export default function IndexSeam({ from, to }) {
    return (
        <div
            aria-hidden="true"
            className="h-16 min-[900px]:h-24"
            style={{ background: `linear-gradient(to bottom, ${from}, ${to})` }}
        />
    );
}
