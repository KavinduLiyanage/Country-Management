export const inputStylesDefault = {
    container: base => ({
        ...base,
        padding: '0 !important',
    }),
    control: (provided, state) => ({
        ...provided,
        padding: '25px 0 0 0',
        border: 'none !important',
        boxShadow: 'none !important',
    }),
    placeholder: base => ({
        ...base,
        opacity: '0',
    }),
    valueContainer: base => ({
        ...base,
        maxHeight: '20px',
        padding: '0',
    }),
    singleValue: base => ({
        ...base,
        padding: '0',
    }),
    option: (provided, state) => ({
        ...provided,
        color: '#333333',
        backgroundColor: state.isSelected ? '#cfb87c' : '#ffffff',
    }),
    indicatorsContainer: base => ({
        ...base,
        display: 'none',
    }),
};

// TODO :  adding this to avoid lint need to update when creating multiple input component
export const multipleInputStyles = {
    container: base => ({
        ...base,
        padding: '0 !important',
    }),
    placeholder: base => ({
        ...base,
        opacity: '0',
    }),
};
