import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { MenuItem, Select } from '@mui/material';

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
  isDisableSelect,
  isDisableInput,
  ...props
}) => {
  const handleChangeInput = (event) => {
    onChangeInput(event);
  };

  const handleChangeSelectField = (event) => {
    onChangeSelect(event);
  };

  return (
    <OutlinedInput
      id={inputId}
      name={inputName}
      value={inputValue}
      onChange={handleChangeInput}
      disabled={isDisableInput}
      endAdornment={
        <InputAdornment position='end'>
          <Select
            id={selectId}
            name={selectName}
            value={selectValue}
            disabled={isDisableSelect}
            onChange={handleChangeSelectField}>
            {currencyOption?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </InputAdornment>
      }
      label='Password'
      {...props}
    />
  );
};

export default InputField;
