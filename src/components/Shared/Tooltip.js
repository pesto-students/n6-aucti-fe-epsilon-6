import React from 'react';
import { createPopper } from '@popperjs/core';

const Tooltip = props => {
  const [tooltipShow, setTooltipShow] = React.useState(false);
  const btnRef = React.createRef();
  const tooltipRef = React.createRef();
  const openLeftTooltip = () => {
    createPopper(btnRef.current, tooltipRef.current, {
      placement: 'top',
    });
    setTooltipShow(true);
  };
  const closeLeftTooltip = () => {
    setTooltipShow(false);
  };
  return (
    <>
      <div className="flex flex-wrap">
        <div className="text-center ">
          <div
            // className={
            // 	"bg-" +
            // 	this.state.color +
            // 	"-500 text-white active:bg-" +
            // 	this.state.color +
            // 	"-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            // }
            type="button"
            onMouseEnter={openLeftTooltip}
            onMouseLeave={closeLeftTooltip}
            ref={btnRef}>
            {props.children}
          </div>
          <div
            className={
              (tooltipShow ? '' : 'hidden ') +
              'bg-auctiHover border-0 mb-3  z-50  text-xs text-left no-underline  rounded-lg w-auto'
            }
            ref={tooltipRef}>
            <div className="flex flex-col justify-center items-center p-3">
              <p className="text-gray-900">
                {/* Please click the button to confirm */}
                {props.msg1}
              </p>
              <p className="text-gray-900">
                {/* after shipping the product to user */}
                {props.msg2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tooltip;
