import Link from "next/link";

export default function registerConfirmation() {
  return (
    <>
      <h1>A confirmation email has been sent to your email</h1>
      <Link href="/login">Login page</Link>
    </>
  );
}
