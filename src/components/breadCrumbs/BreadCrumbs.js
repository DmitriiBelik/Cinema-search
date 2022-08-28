/* eslint-disable react/prop-types */
import {Breadcrumbs, Link as TLink} from '@mui/material';
import { Link} from "react-router-dom"


export default function BreadCrumbs({category, title}) {
  return (
    <div role="presentation" style={{marginBottom:"20px"}}>
        <Breadcrumbs aria-label="breadcrumb">
            <Link style={{textDecoration:"none"}} to={`/`}>
                <TLink component={'div'} underline="hover" color="primary">
                    Главная
                </TLink>
            </Link>
            <Link style={{textDecoration:"none"}} to={`/`}>
                <TLink component={'div'}
                underline="hover"
                color="primary"
                >
                    {category}
                </TLink>
            </Link>
            <TLink component={'div'}
                underline="hover"
                color="text.primary"
                aria-current="page"
                >
                {title}
            </TLink>
      </Breadcrumbs>
    </div>
  );
}