import styled from 'styled-components';
import { colors } from '@styles/colors';
import { pmHelpers } from '@styles/marginLayout';
import { Text, Button } from "native-base";
import is, { isNot } from 'styled-is';

interface ButtonTextProps {
  color?: string;
}

export const MainContainer = styled.View`
  margin-top: ${pmHelpers.XL};
`;

export const BottomContainer = styled.View`
  margin-top: ${pmHelpers.S};
  margin-bottom: ${pmHelpers.XS};
  padding-horizontal: ${pmHelpers.N};
  background-color: ${colors.white};
`;

export const Title = styled.Text`
  align-self: center;
  font-weight: bold;
  font-size: 20px;
  color: ${colors.brandPrimary};
  margin-bottom: 20px;
`;

export const BaseButton = styled(Button)`
  margin-top: ${pmHelpers.XS};
  margin-bottom: ${pmHelpers.XS};
  ${is('bordered')`
    border-bottom-width: 2px;
    border-top-width: 2px;
    border-right-width: 2px;
    border-left-width: 2px;
    border-color: ${colors.brandPrimary};
    background-color: ${colors.white};
  `};
  ${isNot('bordered')`
    border-bottom-width: 0px;
    border-top-width: 0px;
    border-right-width: 0px;
    border-left-width: 0px;
    background-color: ${colors.brandPrimary};
  `};
  height: 48px;
  border-radius: 3px;
`;

export const ButtonText = styled(Text)`
  color: ${(props: ButtonTextProps) => props.color || colors.white};
  font-weight: bold;
  font-size: 14px;
`;

export const SpinnerContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
