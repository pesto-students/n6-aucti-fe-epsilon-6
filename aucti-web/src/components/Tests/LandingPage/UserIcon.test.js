import React from 'react';
import { render, screen } from '@testing-library/react';
import {toBeInTheDocument,toContainElement} from '@testing-library/jest-dom'
import UserEvent from '@testing-library/user-event';

import UserIcon from '../../Shared/usericon'
import Person from '../../Shared/Person'

test( "usericon  contains Person",()=>{
     render(<UserIcon/>)
     screen.debug()
     const UI = screen.getByTestId("usericon")
     const PER = screen.getByTestId("person")

     UserEvent.click(UI)

     expect(PER).toBeInTheDocument()


})