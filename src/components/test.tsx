"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function TestComponent() {
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/",
        redirect: false,
      });

      if (signInResult?.error) {
        // Handle Error on client side
        console.log("signInResult error");
        return;
      } else {
        //window.location.href = signInResult?.url;
        return;
      }
    } catch (e) {
      console.error(e);
    }

    return;
  };
  return (
    <>
      {/* <button onClick={() => signOut()}>Sign out</button>
      <button onClick={() => signIn("Credentials")}>Sign in</button> */}

      <form className="group mt-3 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="">
            email
          </label>
          <div className="mt-2">
            <input
              id="email"
              type="text"
              name="email"
              defaultValue="test@example.com"
              placeholder="email"
              className="text-black"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="">
              password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              type="text"
              name="password"
              defaultValue="test"
              placeholder="password"
              className="text-black"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-black"
          >
            Login
          </button>

          <button
            type="button"
            className="mt-4 flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-black"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      </form>
    </>
  );
}
