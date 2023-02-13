import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { useTheme } from 'next-themes';

export const styleControl = {
  option: (styles) => ({
    ...styles,
    backgroundColor: '#112240',
    '&:hover': {
      backgroundColor: '#64ffda',
      color: '#112240',
    },
  }),
  control: (base, state) => ({
    ...base,
    background: '#112240',
    borderColor: state.isFocused ? 'white' : 'gray',
    '&:hover': {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? 'white' : 'gray',
      backgroundColor: state.isFocused ? '#112240' : '#0A192F',
    },
  }),
};

export function SelectTags({ onChange, style }) {
  const options = [
    { value: 'Packing', label: 'Packing' },
    { value: 'kitchen', label: 'kitchen' },
    { value: 'Tv', label: 'Tv' },
    { value: 'furniture', label: 'furniture' },
    { value: 'store', label: 'store' },
    { value: 'electricity', label: 'electricity' },
    { value: 'water', label: 'water' },
    { value: 'Gate', label: 'Gate' },
    { value: 'Air condition', label: 'Air condition' },
    { value: 'fan', label: 'fan' },
    { value: 'cupboard', label: 'cupboard' },
    { value: 'wi-fi', label: 'wi-fi' },
    { value: 'sockfine', label: 'sockfine' },
    { value: 'Laundry facility', label: 'Laundry facility' },
    { value: 'CCTV Security', label: 'CCTV Security' },
  ];
  return (
    <div className={`grid gap-1 dark:bg-[#112240] ${style.container}`}>
      <label>Write or select things that contains in your property</label>
      <CreatableSelect
        className='bg-black'
        styles={styleControl}
        required
        onChange={onChange}
        isMulti
        instanceId='long-value-select'
        options={options}
      />
    </div>
  );
}

export function SelectPer({ onChange }) {
  const options = [
    { value: 'night', label: 'per-night' },
    { value: 'day', label: 'per-day' },
    { value: 'month', label: 'per-month' },
  ];

  return (
    <div>
      <CreatableSelect
        styles={styleControl}
        options={options}
        required
        onChange={onChange}
        instanceId='long-value-select'
        placeholder='select duration'
      />
    </div>
  );
}

export function CustomSelect({ onChange, options, label, multi, placeholder }) {
  return (
    <div className='grid gap-1'>
      <label className='capitalize'>{label}</label>
      <CreatableSelect
        options={options}
        onChange={onChange}
        instanceId='long-value-select'
        placeholder={placeholder}
        isMulti={multi}
      />
    </div>
  );
}
