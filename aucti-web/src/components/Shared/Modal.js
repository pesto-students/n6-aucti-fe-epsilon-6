import React from "react";

const Modal = (props) => {
   
  return (
    <>
      {props.showModal ? (
        <>
          <div className="border justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-1/2 p-3">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
                <div className="flex items-start justify-between px-4 border-b border-solid border-blueGray-200 rounded-t">
                  <div className="flex justify-center text-2xl">Place Bid</div>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-gray-500 hover:text-black float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.setShowModal(!props.showModal)}
                  >
                    <span className="bg-transparent text-gray-500 hover:text-black h-10 w-10 text-xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-cols justify-center my-4">
                  {props.children}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
