/**
 * This code was generated by Builder.io.
 */
import React from 'react';
import SignInButton from './SignInButton';
import EmailSignIn from './EmailSignIn';
import Footer from './Footer';

const signInOptions = [
  {
    provider: 'Apple',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0910d32533cfca6719341e1a854146eb251e8be31ded53f17ab0f3d4c9ee9fc8?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197',
  },
  {
    provider: 'Google',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a9c7b9e9135f884186d23b82627b02ba7e66130a4f544925ebcf8379f1471cbf?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197',
  },
];

const SignInPage: React.FC = () => {
  return (
    <main className="flex flex-col pt-36 pb-36 mx-auto w-full max-w-[480px] max-md:py-24">
      <header className="flex flex-col items-center px-36 w-full min-h-[156px] max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col pb-7 w-14 min-h-[114px]">
          <div className="flex items-center py-4 w-full min-h-[88px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c9cd3a332a6c8a0ede98ebe7ae781bad6bb4c974104bb8ccdb8d7b04de5c905?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197"
              alt="Clay logo"
              className="object-contain self-stretch my-auto w-14 aspect-square"
            />
          </div>
        </div>
        <h1 className="flex flex-col max-w-full text-3xl leading-none text-center text-white w-[196px]">
          Sign in to Clay
        </h1>
      </header>
      <section className="flex flex-col justify-center py-8 mt-6 w-full text-sm min-h-[378px] max-md:max-w-full">
        <div className="flex flex-col px-20 w-full max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col">
            <div className="flex flex-col items-center w-full text-white">
              {signInOptions.map((option) => (
                <SignInButton
                  key={option.provider}
                  provider={option.provider}
                  icon={option.icon}
                />
              ))}
            </div>
            <div className="flex flex-col justify-center py-8 w-full text-xs tracking-wider leading-none uppercase whitespace-nowrap text-white text-opacity-60">
              <div className="flex gap-4 items-center max-w-full w-[280px]">
                <div className="flex shrink-0 self-stretch my-auto h-px bg-white bg-opacity-10 w-[114px]" />
                <div className="self-stretch my-auto">or</div>
                <div className="flex shrink-0 self-stretch my-auto h-px bg-white bg-opacity-10 w-[114px]" />
              </div>
            </div>
            <EmailSignIn />
            <div className="flex flex-col self-center pt-7 text-xs">
              <div className="flex items-center">
                <p className="self-stretch my-auto leading-5 text-white text-opacity-60">
                  Don't have a Clay account?
                </p>
                <a
                  href="#"
                  className="self-stretch my-auto leading-none text-center text-white underline"
                >
                  Create account
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default SignInPage;