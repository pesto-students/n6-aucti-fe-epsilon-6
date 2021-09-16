import React from 'react';

import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { productsReducer } from '../../../redux/reducers/productsReducer';
import LandingPage from '../../Pages/LandingPage/LandingPage';
import { Banner } from '../../Shared/Banner';
import { BrowserRouter, Route, useLocation } from 'react-router-dom';

const initialState = {
  products: {
    data: [
      {
        id: '8F9ZJuTFjH4eEwH9QcS9',
        product_picture:
          'https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2F458229112f4048e69d2a31afc5b3a36d.jpeg?alt=media&token=54c4e124-2dcf-48f8-99a9-29f9d5f29b89',
        title: 'Ironman Digital Art',
        picture: '458229112f4048e69d2a31afc5b3a36d.jpeg',
        product_category: 'digital_art',
        selected_bid: 'xrkmLhIWGRJaM0rZJzxN',
        description: 'Ironman',
        highest_bid: 0,
        base_price: '15000',
        product_transaction_status: 'dispute',
        seller_id: 'sYSInLGYvIVdFAot052DbNaZFQJ3',
        auction_status: 'completed',
        createdAt: {
          _nanoseconds: 395000000,
          _seconds: 1630610254,
        },
        highest_price: 19000,
        bids: 1,
      },
      {
        description: 'Signed jersey',
        id: 'EbUpixFq1jfRqJ45N5wr',
        highest_bid: 46000,
        base_price: '44997',
        bids: 2,
        selected_bid: 'gs0po4Gkf69B1vqCjhJc',
        seller_id: 'sYSInLGYvIVdFAot052DbNaZFQJ3',
        product_transaction_status: 'paid',
        seller: 'Kirushan Balakrishnan',
        picture: 'b1a1fb27fbf345bdbe871c88f129c914.png',
        product_category: 'autographed',
        title: '1925 Signed Jersey',
        auction_status: 'completed',
        createdAt: {
          _seconds: 1630610208,
          _nanoseconds: 300000000,
        },
        product_picture:
          'https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2Fb1a1fb27fbf345bdbe871c88f129c914.png?alt=media&token=373604e2-5115-4808-a35a-7dd7b245690d',
        highest_price: 46000,
      },
      {
        createdAt: {
          _nanoseconds: 875000000,
          _seconds: 1630610106,
        },
        auction_status: 'completed',
        product_category: 'antiques_vintages',
        selected_bid: 'M5HTKfguFC2oc9co14K6',
        title: 'Handmade Gramophone',
        base_price: '23000',
        seller_id: 'sYSInLGYvIVdFAot052DbNaZFQJ3',
        picture: '71fYj+YHEaL._AC_SL1500_.jpg',
        description:
          'Antique Style Handmade Brass Gramophone.\nSizing Detals : Height-8.5" and Base-4" Inch Approx.\nPackage Contents : 1 Decorative Gramophone\nCare Instructions: Wipe the dust with a dry cloth when needed\nPefect gift for your love ones for any special occasion.',
        id: 'LbLZ8mhRBAcWHna8p5Ln',
        highest_bid: 0,
        product_transaction_status: 'settled',
        product_picture:
          'https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2F71fYj%2BYHEaL._AC_SL1500_.jpg?alt=media&token=504dbeb5-c59c-4d27-b75a-35aef503c85b',
        highest_price: 41000,
        bids: 2,
      },
    ],
  },
};

const store = createStore(productsReducer, initialState);

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('landing component', () => {
  render(
    <BrowserRouter>
      <Route path="/products/all/:pg1,:pg2">
        <LandingPage />
      </Route>
    </BrowserRouter>,
    { wrapper: Wrapper },
    { route: 'products/all/1,4' },
  );

  test('Product cards render', () => {
    const card_component = screen.queryAllByTestId('landing_product_card');
    expect(card_component).toBeInTheDocument;
  });

  test('landing_page_pagination', () => {
    const pagination = screen.queryByTestId('landing_page_pagination');
    expect(pagination).toBeInTheDocument;
  });
});

describe('banner component', () => {
  render(
    <BrowserRouter>
      <Banner />
    </BrowserRouter>,
  );

  test('banner component renders', () => {
    const banner_component = screen.findByTestId('banner_copmonent');
    expect(banner_component).toBeInTheDocument;
  });
});
