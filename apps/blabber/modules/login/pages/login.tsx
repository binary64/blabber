import styled from '@emotion/styled';

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export function Login() {
  return (
    <StyledPage>
      <div className="w-full p-6 border-t-4 border-gray-600 rounded-md shadow-md border-top md:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          Login
        </h1>
        <form className="space-y-4">
          <label className="flex flex-wrap">
            <span className="text-base label label-text">Email</span>
            <input
              type="text"
              placeholder="Email Address"
              className="w-full input input-bordered"
            />
          </label>
          <label className="flex flex-wrap">
            <span className="text-base label label-text">
              Password
            </span>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered"
            />
          </label>
          <a
            href="#"
            className="text-xs text-gray-600 hover:underline hover:text-blue-600"
          >
            Forget Password?
          </a>
          <div>
            <button className="btn btn-block">Login</button>
          </div>
        </form>
      </div>
    </StyledPage>
  );
}

export default Login;
