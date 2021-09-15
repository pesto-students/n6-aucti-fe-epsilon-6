import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { getProductsAction } from '../../../redux/actions/productActions';
import { Banner } from '../../Shared/Banner';
import Pagination from '../../Shared/Pagination/Pagination';

import ProductCard from '../../Shared/ProductCard';
import LandingPageSkelton from './LandingPageSkelton';

let PageSize = 8;
function LandingPage(props) {
  const { products } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [productsFiltered, setProductsFiltered] = useState(products.data);
  useEffect(() => {
    const { firstPageIndex, lastPageIndex } = currentTableData;

    props.getProducts(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  useEffect(() => {
    if (products && products?.data !== productsFiltered) {
      setProductsFiltered(products.data);
      setLoading(false);
    }
  }, [products]);

  const onNext = () => {
    setLoading(true);
    setCurrentPage(currentPage + 1);
  };
  const onPrevious = () => {
    setLoading(true);
    setCurrentPage(currentPage - 1);
  };

  const handlePageSelect = page => {
    setLoading(true);
    setCurrentPage(page);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return { firstPageIndex, lastPageIndex };
  }, [currentPage]);

  if (loading) {
    return <LandingPageSkelton />;
  }

  return (
    <>
      <div
        id="main"
        className="grid items-start xl:grid-cols-3 md:grid-cols-2 gap-1  xs:grid-cols-1">
        <Banner></Banner>

        {productsFiltered !== null &&
          productsFiltered.map(item => (
            <ProductCard key={item.id} bidproduct={item}></ProductCard>
          ))}
      </div>
      <div className="grid justify-items-end p-4">
        <Pagination
          currentPage={currentPage}
          totalCount={products.length}
          pageSize={PageSize}
          onPageChange={page => setCurrentPage(page)}
          onNext={onNext}
          onPrevious={onPrevious}
          handlePageSelect={handlePageSelect}
        />
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    products: state.productsReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProducts: (firstPageIndex, lastPageIndex) =>
      dispatch(getProductsAction(firstPageIndex, lastPageIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
