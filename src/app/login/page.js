export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-deep-forest-green hover:bg-moss-green text-white font-bold py-2 px-4 rounded w-full"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
