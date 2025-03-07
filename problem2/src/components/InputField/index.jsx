import { FormControl, MenuItem, Select } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { makeStyles } from '@mui/styles';
import './styles.scss';

const useStyles = makeStyles(() => ({
  inputRoot: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px',
  },
  select: {
    display: 'flex',
    alignItems: 'center',
    border: 'none',
  },
}));

const InputField = ({
  onChangeInput,
  inputId,
  inputName,
  inputValue,
  currencyOption,
  selectName,
  selectId,
  selectValue,
  onChangeSelect,
  isDisableInput,
  isDisableSelect,
}) => {
  const classes = useStyles();

  const handleChangeInput = (event) => {
    onChangeInput(event);
  };

  const handleChangeSelectField = (event) => {
    onChangeSelect(event);
  };

  return (
    <FormControl className='form-input'>
      <OutlinedInput
        classes={{ root: classes.inputRoot }}
        id={inputId}
        name={inputName}
        value={inputValue}
        onChange={handleChangeInput}
        disabled={isDisableInput}
        inputProps={{
          autoComplete: 'off',
        }}
        sx={{
          '& .MuiInputBase-root': {
            fontSize: '1.5rem',
            fontWeight: 600,
          },

          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: '#0000004d', // Change this to the color you prefer
          },

          fontSize: '1.5rem',
          fontWeight: 600,
          borderRadius: '10px',
        }}
        endAdornment={
          <InputAdornment position='end'>
            <Select
              id={selectId}
              name={selectName}
              value={selectValue}
              className={classes.select}
              disabled={isDisableSelect}
              onChange={handleChangeSelectField}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                },
              }}>
              {currencyOption?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <img
                    className='currency-image'
                    src={`/assets/images/${option.value}.svg`}
                    alt={option.value}
                  />
                  <span className='currency-title'>{option.label}</span>
                </MenuItem>
              ))}
            </Select>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default InputField;
