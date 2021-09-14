import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { TrashIcon } from '../../../../assets/icons';
import {
  deleteUserAddressAction,
  loadUserAddressAction,
  saveUserAddressAction,
} from '../../../../redux/actions/buyerActions';

const BuyerProfile = props => {
  const { user, addresses } = props;
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [error, setError] = useState('');

  const handleChangeAddress = e => {
    setAddress(e.target.value);
  };

  const handleCity = e => {
    setCity(e.target.value);
  };

  const handleState = e => {
    setState(e.target.value);
  };

  const handleZip = e => {
    setZip(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let valid = true;
    if (!address) {
      setError('Address cannot be blank');
      valid = false;
    } else if (!city) {
      setError('City cannot be blank');
      valid = false;
    } else if (!state) {
      setError('State  cannot be blank');
      valid = false;
    } else if (!zip) {
      setError('Zip category cannot be blank');
      valid = false;
    } else if (isNaN(zip)) {
      setError('Zip cannot be text');
      valid = false;
    } else if (valid) {
      props.saveUserAddress({ user_id: user.uid, address, city, state, zip });
      setAddress('');
      setCity('');
      setState('');
      setZip('');
    }
  };

  const handleDelete = id => {
    props.deleteUserAddress(id);
  };

  useEffect(() => {
    props.loadUserAddress(user.uid);
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <header className="w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16 my-4 border-gray-400 border rounded">
        <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
          <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
            <div className="container relative left-0 z-50 flex w-3/4 h-auto">
              <div className="relative flex items-center w-full lg:w-64 h-full group">
                <p className="my-6 text-xl font-semibold text-gray-900 dark:text-gray-200 px-5 ">
                  {user?.displayName}
                </p>
              </div>
            </div>
            <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
              <a href="#" className="block relative">
                <img
                  alt="profil"
                  src={user.photoURL}
                  className="mx-auto object-cover rounded-full h-10 w-10 "
                />
              </a>
            </div>
          </div>
        </div>
      </header>
      <div className="mt-10 sm:mt-0 py-8">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2 flex xl:flex-row xs:flex-col justify-center">
            <form>
              <div className="overflow-hidden sm:rounded-md border-gray-400 border rounded">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={user.email}
                        readOnly={true}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700">
                        Country / Region
                      </label>
                      {/* <select
												id="country"
												name="country"
												autoComplete="country"
												className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											>
												<option>India</option>
											</select> */}
                      <input
                        type="text"
                        name="country"
                        id="country"
                        autoComplete="email"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={'India'}
                        readOnly={true}
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700">
                        Street address
                      </label>
                      <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChangeAddress}
                        value={address}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleCity}
                        value={city}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700">
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="state"
                        id="state"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleState}
                        value={state}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium text-gray-700">
                        ZIP / Postal
                      </label>
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleZip}
                        value={zip}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-900 bg-aucti hover:bg-auctiHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleSubmit}>
                    Save
                  </button>
                </div>
                <div className="text-right sm:px-6">
                  <span
                    data-testid="titleErr"
                    id="titleErr"
                    style={{ color: 'red', fontSize: '12px' }}>
                    {error}
                  </span>
                </div>
              </div>
            </form>
            <div className="mx-10 xl:my-0 md:my-10 xs:my-10 overflow-auto xl:h-96 xs:h-32">
              <div className="container flex flex-col mx-auto    items-center justify-center">
                <ul className="flex flex-col">
                  {addresses !== null &&
                    addresses.map(n => {
                      return (
                        <li
                          key={n.id}
                          className="border-gray-400 flex flex-row mb-2">
                          <div className="border-gray-400 border rounded select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 justify-between items-center p-4 ">
                            <div className="flex flex-col text-xs">
                              <p className="break-words">{n.address}</p>
                              <p>{n.city}</p>
                              <p>{n.state}</p>
                              <p>{n.country}</p>
                              <p>{n.zip}</p>
                            </div>

                            <div className="w-12 text-right flex justify-end hover:text-aucti">
                              {/* <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													<div className="flex items-center space-x-4"> */}

                              <button
                                layout="link"
                                size="icon"
                                aria-label="Delete"
                                onClick={() => handleDelete(n.id)}>
                                <TrashIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                  // onClick={() => handleDelete(n)}
                                />
                              </button>
                              {/* </div>
												</div> */}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
                {addresses !== null && addresses.length === 0 && (
                  <div className="w=full flex justify-center items-center p-8">
                    No address available!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/** */}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    addresses: state.addresses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserAddress: id => dispatch(loadUserAddressAction(id)),
    saveUserAddress: address => dispatch(saveUserAddressAction(address)),
    deleteUserAddress: id => dispatch(deleteUserAddressAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyerProfile);
