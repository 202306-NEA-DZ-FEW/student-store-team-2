import { doc, setDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function Home() {
    setDoc(doc(db, "categories", "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA",
    });

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'></main>
    );
}
