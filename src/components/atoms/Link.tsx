import React, { ForwardRefRenderFunction } from 'react';
import MuiLink from '@material-ui/core/Link';
import { Link as GatsbyLink } from 'gatsby';

const LinkBase: ForwardRefRenderFunction<any, any> = (props, ref) => <MuiLink component={GatsbyLink} ref={ref} {...props} />

export const Link = React.forwardRef(LinkBase);
