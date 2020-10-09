import React, { ForwardRefRenderFunction } from 'react';
import MuiLink from '@material-ui/core/ListItem';
import { Link as GatsbyLink } from 'gatsby';

const LinkBase: ForwardRefRenderFunction<any, any> = (props, ref) => <MuiLink button component={GatsbyLink} ref={ref} {...props} />

export const ListItemLink = React.forwardRef(LinkBase);
