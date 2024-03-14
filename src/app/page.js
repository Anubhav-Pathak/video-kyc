import Link from "next/link"
import Image from "next/image"
export default function Home() {
  return (
    <main className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image src="/KYC.png" width="500" height="400" alt="KYC" />
        <div>
          <h1 className="text-5xl font-bold">Know Your Customer (KYC)</h1>
          <p className="py-6">Unlocking Inclusive Identity Verification Through Conversational Video KYC.</p>
          <Link href="/register" className="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </main>
  )
}