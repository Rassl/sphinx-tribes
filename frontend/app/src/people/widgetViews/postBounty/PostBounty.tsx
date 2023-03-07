import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../../config/colors';
import { useIsMobile } from '../../../hooks';
import IconButton from '../../../components/common/icon_button';
import { useStores } from '../../../store';
import StartUpModal from '../../utils/start_up_modal';
import { PostModal, PostModalProps } from './PostModal';

interface Props extends Omit<PostModalProps, 'onClose'| 'isOpen'> {
  title?: string;
  buttonProps?: {
    endingIcon?:string;
    leadingIcon?: string;
    color?: 'primary' | 'secondary';
  }
} 

const color = colors['light'];

const mapBtnColorProps = {
  primary: {
    color: 'success',
    hoverColor: color.button_primary.hover,
    activeColor: color.button_primary.active,
    shadowColor: color.button_primary.shadow,
  },
  secondary: {
    color: 'primary',
    hoverColor: color.button_secondary.hover,
    activeColor: color.button_secondary.active,
    shadowColor: color.button_secondary.shadow,
  }
}

export const PostBounty: FC<Props> = ( { title= 'Post a Bounty', buttonProps = {
  color: 'primary'
}, ...modalProps } ) => {

  const { ui } = useStores();
  const [isOpenPostModal, setIsOpenPostModal] = useState(false);
  const [isOpenStartUpModel, setIsOpenStartupModal] = useState(false);

  const isMobile = useIsMobile();
  const showSignIn = () => {
    if(isMobile) {
      ui.setShowSignIn(true); 
      return;
    }
    setIsOpenStartupModal(true)
  }

  const clickHandler = () => {
    if (ui.meInfo && ui.meInfo?.owner_alias) {
      setIsOpenPostModal(true);
    } else {
      showSignIn()
    }
  }

  const icon = (() => {
    if(buttonProps.endingIcon && buttonProps.leadingIcon) {
      return {leadingIcon: buttonProps.leadingIcon};
    }
    if(buttonProps.leadingIcon) {
      return {leadingIcon: buttonProps.leadingIcon};
    }
    if(buttonProps.endingIcon) {
      return {endingIcon: buttonProps.endingIcon};
    }
    return {endingIcon: 'add'};
  })()


  return ( 
  <>
    <StyledIconButton
      {...icon}
      {...mapBtnColorProps[buttonProps.color || 'primary']}
      text={title}
      width={204}
      height={isMobile ? 36 : 48}
      iconStyle={iconStyle}
      onClick={clickHandler}
    />
    <PostModal isOpen={isOpenPostModal} onClose={() => setIsOpenPostModal(false)} {...modalProps} /> 
    {isOpenStartUpModel && (
        <StartUpModal closeModal={() => setIsOpenStartupModal(false)} dataObject={'createWork'} buttonColor={'success'} />
      )}
  </>
  )
}

const StyledIconButton = styled(IconButton)`
  color: ${color.pureWhite};
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
`;

const iconStyle = {
  fontSize: '16px',
  fontWeight: 400,
};