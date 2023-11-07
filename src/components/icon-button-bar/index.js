import React, { useCallback } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import GitHubIcon from '@mui/icons-material/GitHub';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';

import './style.scss';

function IconButtonBar({ links = {} }) {
  const IconPicker = useCallback((icon) => {
    const props = { className: 'icon' };
    switch (icon) {
      case 'post':
        return <DescriptionIcon {...props} />;
      case 'demo':
        return <LanguageIcon {...props} />;
      case 'github':
        return <GitHubIcon {...props} />;
      case 'googlePlay':
        return <AndroidIcon {...props} />;
      case 'appStore':
        return <AppleIcon {...props} />;
      case 'email':
        return <EmailIcon {...props} />;
      case 'linkedIn':
        return <LinkedInIcon {...props} />;
      case 'website':
        return <LanguageIcon {...props} />;
      case 'instagram':
        return <InstagramIcon {...props} />;
      case 'x':
        return <TwitterIcon {...props} />;
      default:
        return <></>;
    }
  }, []);

  return (
    <>
      {Object.keys(links).map((link, index) => {
        return (
          links[link] && (
            <Tooltip key={index} title={link} arrow className="icon-tooltip">
              <IconButton
                size="small"
                href={`${link === 'email' ? `mailto:` : ``}${links[link]}`}
                target="_blank"
              >
                {IconPicker(link)}
              </IconButton>
            </Tooltip>
          )
        );
      })}
    </>
  );
}

export default IconButtonBar;
