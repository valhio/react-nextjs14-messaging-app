"use client";

import ReactSelect from "react-select";
import Image from "next/image";

interface SelectProps {
  disabled?: boolean;
  label: string;
  value?: Record<string, any>; // Record<string, any> is a type that represents an object with string keys and any values.
  onChange: (value: Record<string, any>) => void; // (value: Record<string, any>) => void is a function that takes a value of type Record<string, any> and returns nothing. Record<string, any> is a type that represents an object with string keys and any values.
  //   options: Record<string, any>[]; // Record<string, any>[] is a type that represents an array of objects with string keys and any values.
  options: { label: any; value: any; image?: any }[];
}

const Select: React.FC<SelectProps> = ({
  disabled,
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti={true}
          options={options}
          menuPortalTarget={document.body} // menuPortalTarget is a prop that allows the menu to be rendered outside of the DOM hierarchy of the parent component. Because the select is rendered inside a modal, it causes problems with z-index and overflowing.
          styles={{ // styles is a prop that allows us to customize the select's styles.
            menuPortal: (base) => ({ ...base, zIndex: 9999 }), // menuPortal is a style that allows us to customize the menuPortal's styles. We set the z-index to 9999 to make sure that the menuPortal is rendered on top of everything else. Base is the default style object.
          }}
          classNames={{ // classNames is a prop that allows us to customize the select's class names.
            control: () => "text-sm", // control is a class name that is applied to the control element.
            // menu: () => "text-sm", // menu is a class name that is applied to the menu element.
            // menuList: () => "text-sm", // menuList is a class name that is applied to the menuList element.
            // option: () => "text-sm", // option is a class name that is applied to the option element.
            }}
          formatOptionLabel={(option) => ( // formatOptionLabel is a prop that allows us to customize the select's option labels. Without this prop, the select's option labels would be rendered as plain text. This particular prop allows us to render the option as image + text. 
            <div className="flex items-center">
              {option.image && (
                <div className="relative inline-block rounded-full overflow-hidden h-6 w-6 mr-2">
                  <Image
                    alt={option.label}
                    src={option.image}
                    fill
                  />
                </div>
              )}
              <div className="truncate">{option.label}</div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default Select;
