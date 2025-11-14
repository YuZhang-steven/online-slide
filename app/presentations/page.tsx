
export default async function PresetationPage() {
    const res = await fetch(`${process.env.BASE_URL}/api/presentations`, {
        method: 'GET',
        // headers: {
        //     'Content-Type': 'application/json',
        // },
    });
    const data = await res.text()


    return (
        <div>{data} </div>
    )
}
