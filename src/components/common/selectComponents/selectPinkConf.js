    export const selectCustomStyles = {
        control: styles => ({
          ...styles,
          flexWrap: 'nowrap',
          maxHeight: '30px',
          border: '0',
          boxShadow: 'none',
          backgroundColor: '#9E9E9E',
         }),
         singleValue: (provided, state) => ({
          ...provided,
          color:'#fff'
         }),
         menuList: (provided, state) => ({
           ...provided,
           color:'#fff'

         }),
         menu: base => ({
           ...base, 
           color: '#fff',
           backgroundColor: '#9E9E9E',
         }),
         placeholder: base => ({
            ...base, 
            color:'#eee'
         }), 
         input: base => ({
            ...base, 
            color:'#fff'
         }),
         option: (styles, {data, isDisabled, isFocused, isSelected}) => ({
             ...styles,
             backgroundColor: isFocused ? '#68274e':'#9E9E9E',
             color: '#fff',
           })
      };