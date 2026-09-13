import { CheckIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';
import React from 'react';

import { useTranslation } from '~/i18n/TranslationProvider';

interface InputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label: any;
  name: string;
  type?: 'text' | 'tel' | 'email' | 'password' | 'textarea' | 'date';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  valid?: boolean; // New property to indicate validity
  wrapperStyle?: string;
  className?: string;
  labelStyle?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  register,
  required = false,
  minLength,
  maxLength,
  pattern,
  errors,
  valid = false,
  wrapperStyle,
  className,
  labelStyle,
  ...props
}) => {
  const isTel = type === 'tel';
  const { translate } = useTranslation();

  return (
    <div className={cn('flex flex-col items-start relative', wrapperStyle)}>
      <label
        htmlFor={name}
        className={cn(
          'block text-lg uppercase mb-0.5 text-start relative w-full',
          labelStyle,
        )}
      >
        {label}
        {valid && (
          <CheckIcon className='w-4 h-4 text-green-500 absolute right-0 top-11 z-10 ' />
        )}
      </label>
      {type !== 'textarea' ? (
        <input
          type={type}
          id={name}
          {...register(name, {
            required: required && `${label} is required`,
            minLength: minLength && {
              value: minLength,
              message: `${label} is too short`,
            },
            maxLength: maxLength && {
              value: maxLength,
              message: `${label} is too long`,
            },
            pattern: isTel
              ? {
                  value: /^(\+\d{1,3})?\d{7,20}$/,
                  message: 'Invalid phone number format',
                }
              : pattern && { value: pattern, message: 'Invalid pattern' },
          })}
          className={cn(
            'w-full py-2 border-b border-primary rounded-none focus:border-secondary focus:outline-none bg-transparent',
            errors[name] && '!border-red-500 focus:!border-red-500',
            valid && '!border-green-500 focus:!border-green-500 pr-5',
            className,
          )}
          {...props}
        />
      ) : (
        <textarea
          type={type}
          id={name}
          {...register(name, {
            required: required && translate('required field'),
            minLength: minLength && {
              value: minLength,
              message: `${label} is too short`,
            },
            maxLength: maxLength && {
              value: maxLength,
              message: `${label} is too long`,
            },
            pattern: isTel
              ? {
                  value: /^\d{7,20}$/, // Adjust the pattern for phone numbers
                  message: 'Invalid phone number format',
                }
              : pattern && { value: pattern, message: 'Invalid pattern' },
          })}
          className={cn(
            'w-full py-2 border-b border-primary rounded-none focus:border-secondary focus:outline-none bg-transparent',
            errors[name] && '!border-red-500 focus:!border-red-500',
            valid && '!border-green-500 focus:!border-green-500 pr-5',
            className,
          )}
          {...props}
        />
      )}
      {errors[name] && (
        <p className='text-red-500 text-xs mt-1'>{errors[name].message}</p>
      )}
    </div>
  );
};
