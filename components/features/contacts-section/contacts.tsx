import Image from "next/image"

export default function Contacts() {
    return (
        <>
        <div className="relative w-screen h-screen">
            <Image
                src="/hero-banner.svg" 
                alt="Hero Banner"
                fill
                className="object-cover" 
                priority
                quality={100}
              />
        </div></>       
    );
}