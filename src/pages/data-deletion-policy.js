export async function getServerSideProps(context) {
    return {
        redirect: {
            destination: '/data-retention-deletion',
            permanent: true,
        },
    };
}

export default function DataDeletionPolicy() {
    return null;
}
