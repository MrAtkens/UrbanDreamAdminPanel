import React, { useCallback } from 'react';
import { styled } from 'baseui';
import Drawer from 'components/Drawer';
import { CloseIcon } from 'assets/icons/CloseIcon';
import { useDrawerState, useDrawerDispatch } from 'context/DrawerContext';

/** Drawer Components */
import ModeratorsForm from '../ModeratorsForm/ModeratorsForm';
import ModeratorsUpdateForm from '../ModeratorsForm/ModeratorsUpdateForm'
import CategoriesForm from '../CategoriesForm/CategoriesForm'
import CategoriesUpdateForm from '../CategoriesForm/CategoriesUpdateForm'
import VendorUpdateForm from "../VendorsForm/VendorUpdateForm";
import CustomerUpdateForm from "../CustomersForm/CustomerUpdateForm";
import Sidebar from '../Layout/Sidebar/Sidebar';

/** Components Name Constants */
const DRAWER_COMPONENTS = {
  MODERATOR_FORM: ModeratorsForm,
  MODERATOR_UPDATE_FORM: ModeratorsUpdateForm,
  CATEGORY_FORM: CategoriesForm,
  CATEGORY_FORM_UPDATE: CategoriesUpdateForm,
  VENDOR_UPDATE_FORM: VendorUpdateForm,
  CUSTOMER_UPDATE_FORM: CustomerUpdateForm,
  SIDEBAR: Sidebar,
};

const CloseButton = styled('button', ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  color: $theme.colors.textNormal,
  lineHeight: 1.2,
  outline: '0',
  border: 'none',
  padding: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '10px',
  left: '-30px',
  right: 'auto',
  cursor: 'pointer',
  backgroundColor: '#ffffff',
  width: '20px',
  height: '20px',
  borderRadius: '50%',

  '@media only screen and (max-width: 767px)': {
    left: 'auto',
    right: '30px',
    top: '29px',
  },
}));

export default function DrawerItems() {
  const isOpen = useDrawerState('isOpen');
  const drawerComponent = useDrawerState('drawerComponent');
  const data = useDrawerState('data');
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  if (!drawerComponent) {
    return null;
  }
  const SpecificContent = DRAWER_COMPONENTS[drawerComponent];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeDrawer}
      overrides={{
        Root: {
          style: {
            zIndex: 100
          },
        },
        DrawerBody: {
          style: {
            marginTop: '80px',
            marginLeft: '60px',
            marginRight: '60px',
            marginBottom: '30px',
            '@media only screen and (max-width: 767px)': {
              marginTop: '80px',
              marginLeft: '30px',
              marginRight: '30px',
              marginBottom: '30px',
            },
          },
        },
        DrawerContainer: {
          style: {
            width: '70vw',
            backgroundColor: '#f7f7f7',
            '@media only screen and (max-width: 767px)': {
              width: '100%',
            },
          },
        },
        Close: {
          component: () => (
            <CloseButton onClick={closeDrawer}>
              <CloseIcon width="6px" height="6px" />
            </CloseButton>
          ),
        },
      }}
    >
      <SpecificContent onClose={closeDrawer} data={data} />
    </Drawer>
  );
}
