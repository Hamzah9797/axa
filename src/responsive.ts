/* eslint-disable */

import { css } from "styled-components";

export const mobile = (props: any) => {
  return css`
    @media only screen and (max-width: 1595px) {
      ${props}
    }
  `;
};

export const smaller = (props: any) => {
  return css`
    @media only screen and (max-width: 1489px) {
      ${props}
    }
  `;
};

export const smallerHeight = (props: any) => {
  return css`
    @media only screen and (max-height: 1000px) {
      ${props}
    }
  `;
};

export const smallestHeight = (props: any) => {
  return css`
    @media only screen and (max-height: 900px) {
      ${props}
    }
  `;
};
