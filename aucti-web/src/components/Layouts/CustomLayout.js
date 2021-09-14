import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Sidebar from '../Layouts/Sidebar/MainSidebar';
import Header from '../Pages/Dashboards/Header';
import Main from '../Pages/Dashboards/Main';

function CustomLayout(props) {
  // const { user } = props;
  const [isSidebarOpen, closeSidebar] = useState(false);
  let location = useLocation();

  useEffect(() => {
    closeSidebar(true);
  }, [location]);

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900
				${isSidebarOpen && 'overflow-hidden'}`}>
      <div className="flex flex-col  w-screen">
        <Header />

        <div className="flex flex-row ">
          <Sidebar />
          <Main>{props.children}</Main>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomLayout);
