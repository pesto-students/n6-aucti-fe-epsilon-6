import React from 'react';

const RegisterForm = () => {
  return (
    <div>
      <form className="space-y-4 text-gray-700">
        <div className="flex flex-wrap">
          <div className="w-full">
            <label className="block mb-1" htmlFor="formGridCode_card">
              Card number
            </label>
            <input
              className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="text"
              id="formGridCode_card"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
          <div className="w-full px-2 md:w-1/2">
            <label className="block mb-1" htmlFor="formGridCode_name">
              First name
            </label>
            <input
              className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="text"
              id="formGridCode_name"
            />
          </div>
          <div className="w-full px-2 md:w-1/2">
            <label className="block mb-1" htmlFor="formGridCode_last">
              Last name
            </label>
            <input
              className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="text"
              id="formGridCode_last"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
          <div className="w-full px-2 md:w-1/3">
            <label className="block mb-1" htmlFor="formGridCode_month">
              Month
            </label>
            <input
              className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="text"
              id="formGridCode_month"
            />
          </div>
          <div className="w-full px-2 md:w-1/3">
            <label className="block mb-1" htmlFor="formGridCode_year">
              Year
            </label>
            <input
              className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="text"
              id="formGridCode_year"
            />
          </div>
          <div className="w-full px-2 md:w-1/3">
            <label className="block mb-1" htmlFor="formGridCode_cvc">
              CVC
            </label>
            <input
              className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="text"
              id="formGridCode_cvc"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
