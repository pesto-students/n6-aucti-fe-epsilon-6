import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  CartIcon,
  EditIcon,
  MoneyIcon,
  TrashIcon,
} from '../../../../assets/icons';
import {
  cancelAuctionAction,
  loadSellerAction,
  loadSellerInsightAction,
  updateBidAction,
  updateProductAction,
} from '../../../../redux/actions/sellerActions';
import ConfirmModal from '../../../Shared/ConfirmModal';
import LargeModal from '../../../Shared/LargeModal';
import Loader from '../../../Shared/Loader';

import Pagination from '../../../Shared/Pagination/Pagination';

import SellerProductsBids from './SellerProductsBids';

let PageSize = 5;

const SellerHome = props => {
  // const [bidAmount, setBidAmount] = useState("");
  const { sellerProducts, user, sellerInsights } = props;

  const sellerProductsFiltered = sellerProducts?.data;
  // const [sellerProductsFiltered, setSellerProductsFiltered] =
  // 	useState(sellerProducts);

  const [showModal, setShowModal] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalBids, setShowModalBids] = useState(false);
  const [showModalStatus, setShowModalStatus] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedProductForOverride, setSelectedProductForOverride] =
    useState('');
  const [selectedProductForCancel, setSelectedProductForCancel] = useState('');
  const [productForBids, setProductForBids] = useState('');
  const [selectedProductForStatus, setSelectedProductForStatus] = useState('');
  const [selectedBidForDelete, setSelectedBidForDelete] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [product_picture, setProduct_picture] = useState('');
  const [checked, setChecked] = useState([]);

  const handleCheck = product => {
    setSelectedProductForStatus(product);
    setShowModalStatus(true);
  };
  const handleStatusChange = () => {
    if (
      selectedProductForStatus['auction_status'] === 'draft' ||
      selectedProductForStatus['auction_status'] === 'hold'
    ) {
      selectedProductForStatus['auction_status'] = 'live';
      setSelectedProductForStatus(selectedProductForStatus);
    } else {
      selectedProductForStatus['auction_status'] = 'hold';
      setSelectedProductForStatus(selectedProductForStatus);
    }

    props.updateProduct(selectedProductForStatus, product_picture);
    setSelectedProductForStatus('');
    setShowModalStatus(false);
  };
  const handleBids = n => {
    setProductForBids(n.product.id);

    setShowModalBids(true);
  };

  useEffect(() => {
    const { firstPageIndex, lastPageIndex } = currentTableData;
    props.loadSellerProducts(user.uid, firstPageIndex, lastPageIndex);
    props.loadSellerInsights(user.uid);
  }, [currentPage]);

  const handleEdit = product => {
    setSelectedProductForOverride(product);
    setShowModal(true);
  };

  const handleCancel = product => {
    setSelectedProductForCancel(product);
    setShowModalCancel(true);
  };

  const handleCancelConfirm = () => {
    props.cancelAuction(selectedProductForCancel.id);
    setSelectedProductForCancel('');
    setShowModalCancel(false);
  };

  const handleChange = e => {
    setSelectedProductForOverride({
      ...selectedProductForOverride,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = n => {
    setSelectedBidForDelete(n);
    setShowModalDelete(true);
  };

  // const handlePrice = (e) => {
  // 	setBidAmount(e.target.value);
  // };

  const handleSelectBid = id => {
    if (checked.indexOf(id) !== -1) {
      setChecked(checked.filter(checkBox => checkBox !== id));
    } else {
      setChecked([...checked, id]);
    }
  };

  const selectHighestBidder = () => {
    const found = checked.find(n => n);
    props.selectBidder(found);
    setShowModalBids(false);
  };

  const handleProductOverride = e => {
    e.preventDefault();

    props.updateProduct(selectedProductForOverride, product_picture);
    setSelectedProductForOverride('');
    setProduct_picture('');
    setShowModal(false);
  };

  const handleDeleteBid = () => {
    props.deleteBid(selectedBidForDelete.id);
    setSelectedBidForDelete('');
    setShowModalDelete(false);
  };

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handlePageSelect = page => {
    setCurrentPage(page);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return { firstPageIndex, lastPageIndex };
  }, [currentPage]);

  const fileData = () => {
    if (product_picture) {
      return (
        <div>
          <h4 className="text-xs text-gray-500">File Details:</h4>

          <p className="text-xs text-gray-500">
            File Name: {product_picture.name}
          </p>

          <p className="text-xs text-gray-500">
            File Type: {product_picture.type}
          </p>

          <p className="text-xs text-gray-500">
            Last Modified: {product_picture.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4 className="text-xs text-gray-500">
            Choose before Pressing the Upload button
          </h4>
        </div>
      );
    }
  };

  if (!sellerProducts.data) {
    return <Loader></Loader>;
  }

  return (
    <>
      <div className="pb-16">
        <h1
          data-testid="heading"
          className="my-6 xl:text-2xl xs:text-lg font-semibold text-gray-700 dark:text-gray-200 xl:px-5 xs:px-0 xl:pb-4">
          {'Welcome, ' + user?.displayName}
        </h1>

        <div className="xl:px-4 md:px-4 xs:p-0 xl:mx-auto xs:m-0 w-full xl:pb-12">
          <div>
            <div className="flex flex-wrap xl:flex-row xs:flex-col">
              <div className="w-full xl:w-1/4 xs:w-5/12 mr-8">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        {sellerInsights !== null &&
                        sellerInsights?.total_products === null ? (
                          ''
                        ) : (
                          <span
                            data-testid="seller_total_products"
                            className="font-bold text-xl text-gray-900">
                            {sellerInsights?.total_products}
                          </span>
                        )}

                        <div className="text-sm font-medium text-gray-900">
                          Products
                        </div>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500 bg-opacity-75">
                          <MoneyIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full xl:w-1/4  xs:w-5/12 xl:mr-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        {sellerInsights !== null &&
                        sellerInsights?.total_sales == null ? (
                          ''
                        ) : (
                          <span className="font-bold text-xl text-gray-900">
                            {'₹ ' + sellerInsights?.total_sales}
                          </span>
                        )}
                        <div className="text-sm font-medium text-gray-900">
                          Total sales
                        </div>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial ">
                        <div className="text-blue-500 dark:text-blue-100 p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500 bg-blue-100 dark:bg-blue-500">
                          <CartIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex-col xl:px-4 xl:w-full lg:px-4 lg:w-full md:px-4 md:w-10/12  pb-4 xs:px-0 xs:w-5/12">
          <div className="overflow-x-auto  sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg xs:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-900">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                        PRODUCT ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                        Product
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                        Base Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                        Highest Bid
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                        Auction Status
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sellerProductsFiltered != null &&
                      sellerProductsFiltered?.map((n, index) => {
                        return (
                          <tr key={n.product?.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-bold text-gray-900">
                              {(currentPage - 1) * PageSize + index + 1}
                            </td>
                            <td
                              data-testid="product_title"
                              className="px-6 py-4  text-sm text-gray-500">
                              {n.product?.title}
                            </td>
                            <td
                              data-testid="base_price"
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                              {n.product?.base_price}
                            </td>
                            <td
                              data-testid="highest_bid"
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                              {n.product?.highest_bid}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex justify-center items-center space-x-4">
                                <span
                                  data-testid="auction_status"
                                  className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {n.product?.auction_status}
                                </span>

                                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                  <input
                                    type="checkbox"
                                    name="toggle"
                                    id="Green"
                                    className="checked:bg-green-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                    checked={
                                      n.product?.auction_status === 'live'
                                    }
                                    onChange={() => handleCheck(n.product)}
                                  />
                                  <label
                                    htmlFor="Green"
                                    className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                                </div>
                                <span className="text-gray-400 font-medium">
                                  Live
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center space-x-4">
                                <button
                                  className="hover:text-aucti"
                                  layout="link"
                                  size="icon"
                                  aria-label="Edit"
                                  onClick={() => handleEdit(n.product)}>
                                  <EditIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </button>
                                {n.product?.auction_status !== 'draft' && (
                                  <>
                                    <Link to={'/home/product/' + n.product?.id}>
                                      <button
                                        className="hover:text-aucti"
                                        layout="link"
                                        size="icon"
                                        aria-label="Edit">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-6 w-6"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor">
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                          />
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                          />
                                        </svg>
                                      </button>
                                    </Link>
                                    <button
                                      layout="link"
                                      size="icon"
                                      aria-label="stop auction"
                                      className="hover:text-aucti"
                                      onClick={() => handleCancel(n.product)}>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                                        />
                                      </svg>
                                    </button>
                                  </>
                                )}

                                {n.product?.auction_status === 'draft' ? (
                                  <button
                                    layout="link"
                                    size="icon"
                                    aria-label="Delete">
                                    <TrashIcon
                                      className="hover:text-aucti w-5 h-5"
                                      aria-hidden="true"
                                      onClick={() => handleDelete(n)}
                                    />
                                  </button>
                                ) : (
                                  <button
                                    layout="link"
                                    size="icon"
                                    aria-label="bids"
                                    className="hover:text-aucti"
                                    onClick={() => handleBids(n)}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                      />
                                    </svg>
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {sellerProductsFiltered !== null &&
                  sellerProductsFiltered?.length === 0 && (
                    <div className="w=full flex justify-center items-center p-8">
                      No products available!
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid justify-items-end px-8 pt-8 pb-8">
          <Pagination
            currentPage={currentPage}
            totalCount={sellerProducts?.length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
            onNext={onNext}
            onPrevious={onPrevious}
            handlePageSelect={handlePageSelect}
          />
        </div>

        <LargeModal
          showModal={showModal}
          title={'Update Product'}
          setShowModal={setShowModal}>
          <form>
            <div className="overflow-hidden sm:rounded-md border-gray-400 border rounded ">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="col-span-10">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={selectedProductForOverride.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-span-12">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700">
                      About
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={selectedProductForOverride.description}
                        onChange={handleChange}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description about your product
                    </p>
                  </div>

                  <div className="col-span-8">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium text-gray-700">
                      Base Price
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">₹</span>
                      </div>
                      <input
                        type="number"
                        name="base_price"
                        id="base_price"
                        className="mt-1 block w-full pl-7 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="0.00"
                        value={selectedProductForOverride.base_price}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-span-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Product picture
                    </label>
                    <img
                      className="mx-auto my-auto object-cover h-40 "
                      src={selectedProductForOverride.product_picture}
                      alt="product_picture"
                    />
                  </div>
                  <div className="col-span-6 mt-4">
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true">
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={e =>
                                setProduct_picture(e.target.files[0])
                              }
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                        {fileData()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 ">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-900 bg-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedProductForOverride('');
                    setProduct_picture('');
                  }}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-900 bg-aucti hover:bg-auctiHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleProductOverride}>
                  Update Product
                </button>
              </div>
            </div>
          </form>
        </LargeModal>
        <LargeModal
          showModal={showModalBids}
          title={'Bids'}
          setShowModal={setShowModalBids}>
          <SellerProductsBids
            checked={checked}
            setChecked={setChecked}
            productId={productForBids}
            handleSelectBid={id => handleSelectBid(id)}></SellerProductsBids>
          <div className="flex justify-center pb-10">
            <p className="text-md text-red-500">
              Please confirm to select the highest bidder!
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 w-full">
            <button
              type="button"
              className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
              onClick={() => {
                setShowModalBids(false);
                setChecked([]);
              }}>
              Cancel
            </button>
            <button
              type="button"
              className="py-2 px-4  bg-aucti hover:bg-auctiHover focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
              onClick={selectHighestBidder}>
              Confirm
            </button>
          </div>
        </LargeModal>
        <ConfirmModal
          showModal={showModalDelete}
          setShowModal={setShowModalDelete}>
          <div className="">
            <div className="w-full h-full text-center">
              <div className="flex h-full flex-col justify-between">
                <svg
                  width="40"
                  height="40"
                  className="mt-4 w-12 h-12 m-auto text-red-500"
                  fill="currentColor"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"></path>
                </svg>
                <p className="text-gray-800 dark:text-gray-200 text-xl font-bold mt-4">
                  Remove Bid
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs py-2 px-6">
                  Are you sure you want to delete this bid ?
                </p>
                <div className="flex items-center justify-between gap-4 w-full mt-8">
                  <button
                    type="button"
                    className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded"
                    onClick={() => {
                      setShowModalDelete(false);
                      setSelectedBidForDelete('');
                    }}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="py-2 px-4  bg-red-500 hover:bg-red-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
                    onClick={handleDeleteBid}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ConfirmModal>
        <ConfirmModal
          showModal={showModalStatus}
          setShowModal={setShowModalStatus}>
          <div className="">
            <div className="w-full h-full text-center">
              <div className="flex h-full flex-col justify-between">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {/* <p className="text-gray-800 dark:text-gray-200 text-xl font-bold mt-4">
									Remove Bid
								</p> */}
                <p className="text-gray-600 dark:text-gray-400 text-xs py-2 px-6">
                  Are you sure you want to change the product status ?
                </p>
                <div className="flex items-center justify-between gap-4 w-full mt-8">
                  <button
                    type="button"
                    className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded"
                    onClick={() => {
                      setSelectedProductForStatus('');
                      setShowModalStatus(false);
                    }}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="py-2 px-4  bg-aucti hover:bg-auctiHover focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
                    onClick={handleStatusChange}>
                    Change status
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ConfirmModal>
        <ConfirmModal
          showModal={showModalCancel}
          setShowModal={setShowModalCancel}>
          <div className="">
            <div className="w-full h-full text-center">
              <div className="flex h-full flex-col justify-between">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {/* <p className="text-gray-800 dark:text-gray-200 text-xl font-bold mt-4">
									Remove Bid
								</p> */}
                <p className="text-gray-600 dark:text-gray-400 text-xs py-2 px-6">
                  Please confirm to cancel the auction?
                </p>
                <div className="flex items-center justify-between gap-4 w-full mt-8">
                  <button
                    type="button"
                    className="py-2 px-2  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-900 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded"
                    onClick={() => {
                      setSelectedProductForCancel('');
                      setShowModalCancel(false);
                    }}>
                    back
                  </button>
                  <button
                    type="button"
                    className="py-2 px-2  bg-red-500 hover:bg-red-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
                    onClick={handleCancelConfirm}>
                    Confirm cancellation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ConfirmModal>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    sellerProducts: state.sellerProducts,
    sellerInsights: state.sellerInsights,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSellerProducts: (id, firstPageIndex, lastPageIndex) =>
      dispatch(loadSellerAction(id, firstPageIndex, lastPageIndex)),
    loadSellerInsights: userId => dispatch(loadSellerInsightAction(userId)),
    updateProduct: (product, product_picture) =>
      dispatch(updateProductAction(product, product_picture)),
    selectBidder: bid_id => dispatch(updateBidAction(bid_id)),
    cancelAuction: id => dispatch(cancelAuctionAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerHome);
