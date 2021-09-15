import React from 'react';
import {
  getAllByRole,
  getByRole,
  getByTestId,
  getByText,
  render,
  render as rtlRender,
  screen,
  within,
} from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../redux/reducers/rootReducer';
import SellerHome from '../../components/Pages/Dashboards/Seller/SellerHome';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../../components/Pages/LandingPage/LandingPage';

describe('Landing Page', () => {
  const renderWithState = (ui, { initialState, ...renderOptions } = {}) => {
    const store = createStore(reducer, initialState);
    const Wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    return render(ui, { wrapper: Wrapper, ...renderOptions });
  };
  const initialState = {
    // user: {
    // 	uid: "sYSInLGYvIVdFAot052DbNaZFQJ3",
    // 	displayName: "Kirushan Balakrishnan",
    // },
    productsReducer: {
      data: [
        {
          auction_status: 'live',
          title: 'The Madonna and Child',
          id: '00pGEQquaj22cOCRBMP0',
          description:
            'Leonardo da Vinci, The Madonna and Child\nDigital copy 2/2\nThe other copy and original artwork are stored in the Hermitage.\nBuyer will get an airdrop of NFT video with Mikhail Piotrovsky, General Director of the State Hermitage Museum showing how he certifies copies of the artworks by signing them and indicating the exact time of each signature.\nThe owner can demonstrate NFT in digital for any purposes .(commercial / non commercial)',
          seller_id: 'sYSInLGYvIVdFAot052DbNaZFQJ3',
          createdAt: {
            _nanoseconds: 642000000,
            _seconds: 1630607302,
          },
          highest_bid: 19000,
          product_picture:
            'https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2F763e75fb99254817a9618c04533df4ac.png?alt=media&token=aaf5e256-c083-4afd-beb9-fa0b2a99762f',
          product_transaction_status: 'pending',
          base_price: '18000',
          product_category: 'digital_art',
          picture: '763e75fb99254817a9618c04533df4ac.png',
          highest_price: 20000,
          bids: 2,
        },
        {
          product_picture:
            'https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2F458229112f4048e69d2a31afc5b3a36d.jpeg?alt=media&token=54c4e124-2dcf-48f8-99a9-29f9d5f29b89',
          selected_bid: 'xrkmLhIWGRJaM0rZJzxN',
          description: 'Ironman',
          auction_status: 'completed',
          id: '8F9ZJuTFjH4eEwH9QcS9',
          createdAt: {
            _nanoseconds: 395000000,
            _seconds: 1630610254,
          },
          highest_bid: 0,
          product_category: 'digital_art',
          picture: '458229112f4048e69d2a31afc5b3a36d.jpeg',
          seller_id: 'sYSInLGYvIVdFAot052DbNaZFQJ3',
          base_price: '15000',
          product_transaction_status: 'dispute',
          title: 'Ironman Digital Art',
          highest_price: 19000,
          bids: 1,
        },
        {
          createdAt: {
            _seconds: 1630610208,
            _nanoseconds: 300000000,
          },
          product_category: 'autographed',
          highest_bid: 46000,
          bids: 2,
          seller: 'Kirushan Balakrishnan',
          base_price: '44997',
          auction_status: 'completed',
          description: 'Signed jersey',
          title: '1925 Signed Jersey',
          id: 'EbUpixFq1jfRqJ45N5wr',
          product_transaction_status: 'sent',
          selected_bid: 'gs0po4Gkf69B1vqCjhJc',
          product_picture:
            'https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2Fb1a1fb27fbf345bdbe871c88f129c914.png?alt=media&token=373604e2-5115-4808-a35a-7dd7b245690d',
          seller_id: 'sYSInLGYvIVdFAot052DbNaZFQJ3',
          picture: 'b1a1fb27fbf345bdbe871c88f129c914.png',
          highest_price: 46000,
        },
        {
          seller_id: 'sYSInLGYvIVdFAot052DbNaZFQJ3',
          base_price: '23000',
          title: 'Handmade Gramophone',
          product_transaction_status: 'settled',
          description:
            'Antique Style Handmade Brass Gramophone.\nSizing Detals : Height-8.5" and Base-4" Inch Approx.\nPackage Contents : 1 Decorative Gramophone\nCare Instructions: Wipe the dust with a dry cloth when needed\nPefect gift for your love ones for any special occasion.',
          createdAt: {
            _seconds: 1630610106,
            _nanoseconds: 875000000,
          },
          auction_status: 'completed',
          selected_bid: 'M5HTKfguFC2oc9co14K6',
          id: 'LbLZ8mhRBAcWHna8p5Ln',
          product_category: 'antiques_vintages',
          product_picture:
            'https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2F71fYj%2BYHEaL._AC_SL1500_.jpg?alt=media&token=504dbeb5-c59c-4d27-b75a-35aef503c85b',
          picture: '71fYj+YHEaL._AC_SL1500_.jpg',
          highest_bid: 0,
          highest_price: 41000,
          bids: 2,
        },
        {
          id: 'MAhlE9NdlYznl0jS83t1',
          seller_id: 'sYSInLGYvIVdFAot052DbNaZFQJ3',
          auction_status: 'live',
          highest_bid: 0,
          product_category: 'digital_art',
          createdAt: {
            _seconds: 1630609809,
            _nanoseconds: 175000000,
          },
          picture: '9e3c3dd653c447328120993578f234bf.jpeg',
          product_picture:
            'https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2F9e3c3dd653c447328120993578f234bf.jpeg?alt=media&token=825fca78-27ca-4c8e-b9f2-74545eaf998a',
          description:
            'Travel Money Club (“TMC”) is acollection of 300 cool and stylish monkey NFTs. Thesemonkeys love comics and movies so much that they dream of travelling to these worldsevery day. Each monkey is unique and has different traits. Travel Monkey owners are privileged to enter the TMCmetaverse and participate in various exclusive activities.\n\nTraits:\nBackground: Slate Grey\nExpression: Smile\nFur Color: Green\nHair Color: Beige\nPower Level: 82',
          title: 'Travel Monkey Club #19',
          product_transaction_status: 'pending',
          base_price: '15000',
          highest_price: 17000,
          bids: 1,
        },
        {
          base_price: '56000',
          product_category: 'digital_art',
          title: 'Modern Art Piccaso',
          product_transaction_status: 'pending',
          seller_id: 'sYSInLGYvIVdFAot052DbNaZFQJ3',
          product_picture:
            'https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2F15ae0408fbb54809a4e70ca2f1c6183c.png?alt=media&token=5f1b4d29-294c-4124-a6ea-c4639a546ed5',
          highest_bid: 0,
          picture: '15ae0408fbb54809a4e70ca2f1c6183c.png',
          auction_status: 'cancelled',
          createdAt: {
            _seconds: 1630610333,
            _nanoseconds: 92000000,
          },
          id: 'SsB7qLUIHBqyDLIzUAZw',
          description: 'New age art',
          highest_price: 57000,
          bids: 1,
        },
        {
          auction_status: 'completed',
          seller_id: 'sYSInLGYvIVdFAot052DbNaZFQJ3',
          selected_bid: 'x9hMX4gQY7k5vZDnAQDB',
          product_category: 'digital_art',
          product_picture:
            'https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2Fnft_auction_reuters.jpg?alt=media&token=2bf95bab-bae2-49fe-b6cb-0a6dea9aff00',
          description: 'Modern Art',
          id: 'TBQ1CBI4L21Uj31sSDQ7',
          base_price: '25000',
          highest_bid: 0,
          createdAt: {
            _nanoseconds: 649000000,
            _seconds: 1630610157,
          },
          title: 'Digital art color eye',
          product_transaction_status: 'dispute',
          picture: 'nft_auction_reuters.jpg',
          highest_price: 36000,
          bids: 2,
        },
        {
          createdAt: {
            _nanoseconds: 100000000,
            _seconds: 1630610051,
          },
          product_picture:
            'https://firebasestorage.googleapis.com/v0/b/auctiweb.appspot.com/o/images%2F91UpTY6zyDL._AC_SL1500_.jpg?alt=media&token=d690e4fa-b2c3-49ad-95dc-38edf55d58ef',
          seller: 'Kirushan Balakrishnan',
          seller_id: 'sYSInLGYvIVdFAot052DbNaZFQJ3',
          highest_bid: 10008,
          description:
            'Magnification : 15X , Tube Length : 9" inches , Height : 18"inches , Diameter : 8"inches , Weight : 1.85 Kg\nColor : Brass and red leather , Material Used : Brass & wooden box ,\nUsage : Trekking, Bird Watching, Navy gift, Collectible etc\nPacking:Packed in single parcels, corrugated export packing',
          product_category: 'antiques_vintages',
          picture: '91UpTY6zyDL._AC_SL1500_.jpg',
          bids: 2,
          auction_status: 'completed',
          title: 'A Table Décor',
          base_price: '58997',
          id: 'dJMUEZwfmPLCIPAN9nMU',
          selected_bid: 'QM2xzrXT0J9OjL7WtRdy',
          product_transaction_status: 'sent',
          highest_price: 10008,
        },
      ],
      length: 10,
    },
  };

  beforeEach(() => {
    renderWithState(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
      { initialState },
    );
  });

  test('Landing page render and view product cards', async () => {
    // const heading = screen.getByTestId("heading");
    // expect(heading.textContent).toBe("Welcome, Kirushan Balakrishnan");
    // const seller_total_products = screen.getByTestId("seller_total_products");
    // expect(seller_total_products.textContent).toBe("10");
    // screen.debug();
  });
});
