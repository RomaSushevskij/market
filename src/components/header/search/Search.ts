import { alpha, InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  // eslint-disable-next-line no-magic-numbers
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    // eslint-disable-next-line no-magic-numbers
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  // eslint-disable-next-line no-magic-numbers
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    // eslint-disable-next-line no-magic-numbers
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  // eslint-disable-next-line no-magic-numbers
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // eslint-disable-next-line no-magic-numbers
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
