import React from 'react';
import {
  render,
  render as rtlRender,
  screen,
  fireEvent,
  within,
} from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { productReducer } from '../../../redux/reducers/productReducer';
import ProductPage from '../../Pages/ProductPage/ProductPage';
import { BrowserRouter, Route } from 'react-router-dom';

const initialState = {
  user: {
    uid: 'Y5GKMqOHnoSEmEpwtCJBLXcN2sB3',
    displayName: 'Anurag Kumar',
  },
  productReducer: {
    title: 'The Madonna and Child',
    createdAt: {
      _seconds: 1630607302,
      _nanoseconds: 642000000,
    },
    product_category: 'digital_art',
    product_transaction_status: 'pending',
    seller_id: 'sYSInLGYvIVdFAot052DbNaZFQJ3',
    base_price: '18000',
    product_picture:
      'https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2F763e75fb99254817a9618c04533df4ac.png?alt=media&token=aaf5e256-c083-4afd-beb9-fa0b2a99762f',
    auction_status: 'draft',
    picture: '763e75fb99254817a9618c04533df4ac.png',
    description:
      'Leonardo da Vinci, The Madonna and Child\nDigital copy 2/2\nThe other copy and original artwork are stored in the Hermitage.\nBuyer will get an airdrop of NFT video with Mikhail Piotrovsky, General Director of the State Hermitage Museum showing how he certifies copies of the artworks by signing them and indicating the exact time of each signature.\nThe owner can demonstrate NFT in digital for any purposes .(commercial / non commercial)',
    id: '00pGEQquaj22cOCRBMP0',
    seller: 'Kirushan Balakrishnan',
    highest_bid: 19000,
    bids: 1,
  },
  match: {
    params: { id: '00pGEQquaj22cOCRBMP0' },
  },
};

const store = createStore(productReducer, initialState);

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('product page component', () => {
  render(
    <BrowserRouter>
      <Route path="/products/:id">
        <ProductPage />
      </Route>
    </BrowserRouter>,
    { wrapper: Wrapper },
    { route: '/products/00pGEQquaj22cOCRBMP0' },
  );
  test('renders product image', () => {
    const img = screen.queryByRole('img');
    expect(img).toBeInTheDocument;
  });
  test('renders product title', () => {
    const header = screen.queryByText('The Madonna and Child');
    expect(header).toBeInTheDocument;
  });
  test('renders Base Price', () => {
    const header = screen.queryByText('Base Price');
    expect(header).toBeInTheDocument;
  });
  test('renders Highest Bid', () => {
    const header = screen.queryByText('Highest Bid');
    expect(header).toBeInTheDocument;
  });
  test('number of Bids Registered', () => {
    const highest_bid = screen.queryByText('Number of bids registered');
    expect(highest_bid).toBeInTheDocument;
  });

  test('renders Bid Now Button', () => {
    const bidnowmodal = screen.findByRole('form');
    const bidnow = screen.queryByRole('Button', {
      name: 'Bid Now',
    });
    expect(bidnow).toBeInTheDocument;
  });

  test('renders Wishlist Button', () => {
    const wishlist = screen.queryByRole('Button', {
      name: 'Add To Wishlist',
    });
    expect(wishlist).toBeInTheDocument;
  });

  test('renders product description', () => {
    const productdes = screen.queryByRole('paragraph', {
      name: 'productspecificdescription',
    });
    expect(productdes).toBeInTheDocument;
  });
});
