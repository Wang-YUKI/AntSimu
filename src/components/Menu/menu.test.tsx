import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import subMenu from './subMenu'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'right'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        2
      </MenuItem>
    </Menu>
  )
}

let wrapp: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

describe('test Menu and MenuItem', () => {

  beforeEach(() => {
    wrapp = render(generateMenu(testProps));
    menuElement = wrapp.getByTestId('test-menu');
    activeElement = wrapp.getByText('active');
    disabledElement = wrapp.getByText('disabled');
  })
  it('should render correct Menu and MenuItem base on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('menu menu-left');
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  })
  it('click item should change active and call the right callback', () => {
    const thirdItem = wrapp.getByText('2');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })

  it('render the correct mode', () => {
    cleanup();
    wrapp = render(generateMenu(testVerProps));
    menuElement = wrapp.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-right');
  })

  it('should show dropdown submenu', () => {
    expect(wrapp).toMatchSnapshot();
  })
}) 