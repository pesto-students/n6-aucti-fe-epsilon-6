import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  // GoogleIcon,
  ActiIcon,
} from '../../../../assets/icons';
import { loginUserAction } from '../../../../redux/actions/userActions';
import history from '../../../../routes/history';
import Alert from '../../../Shared/Alert';
// import Loader from '../../../Shared/Loader';

const Login = props => {
  const { user } = props;
  //   const [role, SetRole] = useState('');
  const [roleErr, SetRoleErr] = useState('');
  const [email, setEmail] = useState('');
  const [password, SetPassword] = useState('');
  //   const [loading, setLoding] = useState(false);

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, []);

  //   const handleUser = role => {
  //     SetRole(role);
  //   };

  const handleSignIn = e => {
    e.preventDefault();
    if (!email) {
      SetRoleErr('Email cannot be blank');
    } else if (!password) {
      SetRoleErr('Password cannot be blank');
    } else {
      props.login(email, password);

      SetRoleErr('');
      setEmail('');
      SetPassword('');
    }
  };
  const refPlaceholder = React.useRef();

  const removePlaceholder = () => {
    refPlaceholder.current.remove();
  };

  //   if (loading) {
  //     return <Loader></Loader>;
  //   }

  return (
    <>
      <Alert />
      <div className="flex items-center justify-center min-h-screen bg-aucti dark:bg-binance-900">
        <div className="flex flex-col">
          <div className="flex flex-row m-4 w-full">
            <Link
              className="text-sm font-medium text-gray-600 dark:text-purple-400 hover:underline"
              to="/">
              {'Back to Aucti'}
            </Link>
          </div>
          <div className="flex flex-row justify-center justify-items-center">
            <div className="flex-1  h-full max-w-4xl mx-auto overflow-hidden bg-white xl:rounded-lg shadow-xl dark:bg-gray-800">
              <div className="flex flex-col overflow-y-auto md:flex-row">
                <div
                  ref={refPlaceholder}
                  className="md:h-auto w-screen bg-gray-200 rounded-tl animate-pulse"></div>
                <div className="h-32 md:h-auto md:w-1/2">
                  <img
                    aria-hidden="true"
                    className="object-cover w-full h-full"
                    src={'https://picsum.photos/600/400'}
                    alt="Office"
                    onLoad={removePlaceholder}
                    onError={removePlaceholder}
                  />
                </div>
                <main className="flex items-center p-6 sm:p-12 md:w-1/2">
                  <div className="w-full flex flex-col">
                    <div className="w-full flex flex-col items-center">
                      <ActiIcon className="fill-current h-full m-4"></ActiIcon>
                      <h1 className="text-xl font-semibold align-middle text-gray-700 dark:text-gray-200 m-4">
                        Welcome to Aucti!
                      </h1>

                      <form
                        className="w-72 space-y-6"
                        action="#"
                        method="POST"
                        onSubmit={handleSignIn}>
                        <input
                          type="hidden"
                          name="remember"
                          defaultValue="true"
                        />
                        <div className="rounded-md shadow-sm -space-y-px">
                          <div>
                            <label htmlFor="email-address" className="sr-only">
                              Email address
                            </label>
                            <input
                              id="email-address"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              placeholder="Email address"
                              value={email}
                              onChange={event => setEmail(event.target.value)}
                            />
                          </div>
                          <div>
                            <label htmlFor="password" className="sr-only">
                              Password
                            </label>
                            <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              required
                              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              placeholder="Password"
                              onChange={event =>
                                SetPassword(event.target.value)
                              }
                              value={password}
                            />
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-aucti bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                              {/* <LockClosedIcon
                                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                  aria-hidden="true"
                                /> */}
                            </span>
                            Sign in
                          </button>
                        </div>
                      </form>

                      <span
                        id="descriptionErr"
                        className="text-red-400"
                        role="alert">
                        {roleErr}
                      </span>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => {
      dispatch(loginUserAction(email, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
