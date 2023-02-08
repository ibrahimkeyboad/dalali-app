export const filterData = [
  {
    name: 'minPrice',
    placeholder: 'Inter price',
    isMulti: false,
  },
  {
    name: 'maxPrice',
    placeholder: 'Inter price',
    isMulti: false,
  },

  {
    name: 'duration',
    isMulti: false,
    placeholder: 'Duration',
    options: [
      { value: 'day', label: 'day' },
      { value: 'night', label: 'night' },
      { value: 'month', label: 'month' },
    ],
  },
  {
    name: 'location',
    isMulti: false,
    placeholder: 'type a city',
  },
  {
    name: 'property',
    isMulti: false,
    placeholder: 'Type of property',
    options: [
      { value: 'apartment', label: 'apartment' },
      { value: 'house', label: 'house' },
      { value: 'hostel', label: 'hostel' },
    ],
  },
  {
    name: 'bed',
    isMulti: false,
    placeholder: 'Select num of beds',
    options: [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '6', label: '6' },
      { value: '7', label: '7' },
      { value: '8', label: '8' },
    ],
  },
  {
    name: 'bath',
    isMulti: false,
    placeholder: 'Select num of baths',

    options: [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '6', label: '6' },
      { value: '7', label: '7' },
      { value: '8', label: '8' },
    ],
  },
];
