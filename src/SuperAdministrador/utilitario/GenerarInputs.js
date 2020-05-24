
import React from 'react';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import WarningIcon from '@material-ui/icons/Warning';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import Select from 'react-select';

export const generarSelect = ({ input, label, type, meta: { touched, error }, children }) => (
  <div>
    <div>
      <select {...input} className="form-control letra" style={{ height: "32px", fontSize: "13px" }}>
        {children}
      </select>
      {touched && ((error && <span className="text-danger form-group" style={{ fontSize: '12px', fontFamily: 'sans-serif' }}>{error}</span>))}
    </div>
  </div>
)

// export const generarInput = ({ input, disabled, label, type, meta: { touched, error, warning } }) => (
//   <div>
//     <div>
//       <input {...input} disabled={disabled} placeholder={label} type={type} style={{ height: "35px", fontSize: "13px", fontFamily: 'sans-serif' }} className="form-control placeholder-no-fix" />
//       {touched && ((error && <span className="text-danger form-group" style={{ fontSize: '12px', fontFamily: 'sans-serif' }}>{error}</span>) || (warning && <span>{warning}</span>))}
//     </div>
//   </div>
// )

export default function RenderPasword({
  input,
  label,
  meta: { touched, error },
  ...custom
}) {
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <>
      <OutlinedInput
        type={values.showPassword ? 'text' : 'password'}
        onChange={handleChange('password')}
        placeholder={label}
        {...input}
        {...custom}
        error={(touched && error) ? true : false}
        aria-describedby={(touched && error) ? '' : error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        style={{ height: "35px", width: "100%" }}
      />
      <FormHelperText id="outlined-weight-helper-text" error={(touched && error) ? true : false} >{(touched && error) ? error : ''}</FormHelperText>
    </>
  );
}

export const campo = value => {

  if (value !== null && value !== undefined) {
    var arrayDeCadenas = value.substr(0, 24);
    switch (arrayDeCadenas) {
      case 'data:image/jpeg;base64,/':
        return value;
      case 'data:image/png;base64,iV':
        return value;
      case 'dataimage/jpegbase64/9j/':
        var nuevaCadena = value.replace('dataimage/jpegbase64', 'data:image/jpeg;base64,');
        return nuevaCadena;
      default:
        let nuevaCadenadOs = value.replace('dataimage/pngbase64', 'data:image/png;base64,');
        return nuevaCadenadOs + 'g==';
    }
  }
};

// export const generarTextArea = ({ input, label, meta: { touched, error, warning } }) => (
//   <div>
//     <div>
//       <textarea {...input} placeholder={label} style={{ fontSize: "13px" }} className="form-control letra form-control-solid placeholder-no-fix" />
//       {touched && ((error && <span className="text-danger form-group" style={{ fontSize: '12px', fontFamily: 'sans-serif' }}>{error}</span>) || (warning && <span>{warning}</span>))}
//     </div>
//   </div>
// );


export const generarTextArea = ({
  input,
  label, filas,
  meta: { touched, error },
  ...custom
}) => (
    <CssTextField
      fullWidth
      helperText={touched && error}
      label={label}
      error={(touched && error) ? true : false}
      {...input}
      {...custom}
      required={true}
      rows={filas}
      multiline={true}
      variant='outlined'
      size='small'
    />

  )

// export const generarInput = ({
//   input,
//   label,
//   meta: { touched, error },
//   ...custom
// }) => (
//     <CssTextField
//       fullWidth
//       helperText={touched && error}
//       label={label}
//       error={(touched && error) ? true : false}
//       {...input}
//       {...custom}
//       required={true}
//       // InputLabelProps={
//       //   {
//       //     style: {
//       //     fontSize:'13px'
//       // }}
//       // }
//       variant='outlined'
//     />

//   )

// export const generarDate = ({
//   input,
//   label,
//   meta: { touched, error },
//   ...custom
// }) => (
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//       <KeyboardDatePicker
//         disableToolbar
//         {...input}
//         variant="inline"
//         label="Fecha de nacimiento"
//         margin="normal"
//         format="MM/dd/yyyy"
//         KeyboardButtonProps={{
//           'aria-label': 'change date',
//           'size': 'small'
//         }}
//         disableFuture={true}
//         autoOk={true}
//         error={(touched && error) ? true : false}
//         style={{ width: "100%" }}
//         helperText={touched && error}
//       />
//     </MuiPickersUtilsProvider>

//   )


export const ReduxFormSelect = props => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: 13
    }),
    control: styles => ({ ...styles, backgroundColor: 'white', fontSize: 13, fontFamily: 'sans-serif' }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    }
  }
  const { input, options } = props;
  const { touched, error } = props.meta;
  return (
    <>
      <Select
        {...input}

        styles={customStyles}
        isSearchable={false}
        placeholder='Seleccione un modulo'
        onChange={value => input.onChange(value)}
        onBlur={() => input.onBlur(input.value)}
        noOptionsMessage={() => 'Aun no hay ningun modulo registrado'}
        options={options}
      />
      {touched && ((error && <span className="text-danger form-group" style={{ fontSize: '12px', fontFamily: 'sans-serif' }}>{error}</span>))}
    </>
  )
}

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'gray',
        fontSize: '13px'
      }
    },
  },
})(TextField);


const styles = {
  inputRoot: {
    fontSize: 13
  },
  labelRoot: {
    fontSize: 13,
    color: "gray",
    heigth: '3px',
    "&$labelFocused": {
      color: "#3F51B5",
      fontSize: 16
    }
  },
  labelFocused: {}
};

const stylesLogin = {
  inputRoot: {
    fontSize: 15
  },
  labelRoot: {
    fontSize: 15,
    color: "gray",
    heigth: '3px',
    "&$labelFocused": {
      color: "#3F51B5",
      fontSize: 16
    }
  },
  labelFocused: {}
};


const stylesDate = {
  inputRoot: {
    fontSize: 14
  },
  labelRoot: {
    fontSize: 15,
    color: "gray",
    heigth: '3px',
    "&$labelFocused": {
      color: "#3F51B5",
      fontSize: 10
    }
  },
  labelFocused: {}
};

const stylesArea = {
  inputRoot: {
    fontSize: 14
  },
  labelRoot: {
    fontSize: 14,
    color: "gray",
    heigth: '3px',
    "&$labelFocused": {
      color: "#3F51B5",
      fontSize: 14
    }
  },
  labelFocused: {}
};

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
    width: "180px"
  },
  typography: {
    fontSize: "13px",
    display:'block',
    textAlign:"justify",
    fontFamily: 'sans-serif'
  },
}));

function RenderAlgoCorreo({
  input,
  label, classes, filas,
  meta: { touched, error },
  ...custom
}) {
  const classesP = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);


  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Popover
        id="mouse-over-popover"
        className={classesP.popover}
        classes={{
          paper: classesP.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography className={classesP.typography}>Si se modifica el correo,el usuario para poder acceder tendra que recuperar la contraseña desde el formulario de iniciar sesion</Typography>
      </Popover>
      <TextField
        fullWidth
        label={label}
        InputProps={{
          classes: { root: classes.inputRoot },
          endAdornment:
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              >
                <WarningIcon fontSize='small' />
              </IconButton>
            </InputAdornment>
        }}
        InputLabelProps={{
          classes: {
            root: classes.labelRoot,
            focused: classes.labelFocused
          }
        }}
        error={(touched && error) ? true : false}
        helperText={touched && error}
        required={true}
        {...input}
        {...custom}
        variant='outlined'
        margin="normal"
        size='small'
      />
    </>
  );
}

function renderAlgo({
  input,
  label, classes, filas,
  meta: { touched, error },
  ...custom
}) {
  return (
    <TextField
      fullWidth
      label={label}
      InputProps={{ classes: { root: classes.inputRoot } }}
      InputLabelProps={{
        classes: {
          root: classes.labelRoot,
          focused: classes.labelFocused
        }
      }}
      error={(touched && error) ? true : false}
      helperText={touched && error}
      required={true}
      {...input}
      {...custom}
      variant='outlined'
      margin="normal"
      size='small'
    />
  )
}

function renderAlgoStart({
  input,
  label, classes, filas,
  meta: { touched, error },
  ...custom
}) {
  return (
    <TextField
      fullWidth
      label={label}
      InputProps={{
        classes: { root: classes.inputRoot },
        startAdornment: <InputAdornment position="start" style={{ fontSize: '14px', color: 'black' }}>/</InputAdornment>
      }}
      InputLabelProps={{
        classes: {
          root: classes.labelRoot,
          focused: classes.labelFocused
        }
      }}
      error={(touched && error) ? true : false}
      helperText={touched && error}
      required={true}

      {...input}
      {...custom}
      variant='outlined'
      margin="normal"
      size='small'
    />
  )
}



function renderDate({
  input,
  label, classes,
  meta: { touched, error },
  ...custom
}) {
  return (
    <TextField
      fullWidth
      label={label}
      InputProps={{ classes: { root: classes.inputRoot } }}
      InputLabelProps={{
        classes: {
          root: classes.labelRoot,
          focused: classes.labelFocused
        },
        shrink: true,
      }}
      error={(touched && error) ? true : false}
      helperText={touched && error}
      required={true}
      {...input}
      {...custom}
      variant='outlined'
      margin="normal"
      size='small'
    />
  )
}

function renderArea({
  input, filas,
  label, classes,
  meta: { touched, error },
  ...custom
}) {
  return (
    <TextField
      fullWidth
      label={label}
      InputProps={{ classes: { root: classes.inputRoot } }}
      InputLabelProps={{
        classes: {
          root: classes.labelRoot,
          focused: classes.labelFocused
        }
      }}
      error={(touched && error) ? true : false}
      helperText={touched && error}
      required={true}
      {...input}
      {...custom}
      multiline={true}
      rows={filas}
      variant='outlined'
      margin="normal"
      size='small'
    />
  )
}

export const generarInputStart = withStyles(styles)(renderAlgoStart);
export const generarInput = withStyles(styles)(renderAlgo);
export const generarInputCorreo = withStyles(styles)(RenderAlgoCorreo);
export const generarInputLogin = withStyles(stylesLogin)(renderAlgo);
export const generarDate = withStyles(stylesDate)(renderDate);
export const generarArea = withStyles(stylesArea)(renderArea);